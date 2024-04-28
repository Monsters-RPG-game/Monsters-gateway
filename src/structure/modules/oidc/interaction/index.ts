import LoginDto from './dto.js';
import State from '../../../../state.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import Log from '../../../../tools/logger/index.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type * as types from '../../../../types/index.js';
import type express from 'express';
import type { InteractionResults } from 'oidc-provider';
import { strict as assert } from 'node:assert';

export default class UserRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { provider } = State;

    try {
      const interactionDetails = await provider.interactionDetails(req, res);
      const { prompt, params, uid } = interactionDetails;
      const client = await provider.Client.find(params?.client_id as string);

      switch (prompt.name) {
        case 'login':
          res.type('html');
          res.render('login', {
            client,
            uid,
            details: prompt.details,
            params,
            frontUrl: interactionDetails.params?.redirect_uri,
          });
          return;
        case 'consent':
          res.type('html');
          res.render('consent', {
            client,
            uid,
            details: prompt.details,
            params,
          });
          return;
        default:
          Log.error('Unsupported prompt', provider);
          next();
      }
    } catch (err) {
      Log.error('Oidc get Err', { message: (err as types.IFullError).message, stack: (err as types.IFullError).stack });
      res.type('html');
      if ((err as types.IFullError).name === 'SessionNotFound') {
        res.render('error', {
          name: (err as types.IFullError).name,
          message: (err as types.IFullError).message,
        });
      } else {
        const interactionDetails = await provider.interactionDetails(req, res);
        const { prompt, params, uid } = interactionDetails;
        const client = await provider.Client.find(params?.client_id as string);
        res.type('html');
        res.render('login', {
          error: (err as types.IFullError).message,
          client,
          uid,
          details: prompt.details,
          params,
          frontUrl: interactionDetails.params?.redirect_uri,
        });
      }
    }
  }

  async post(req: express.Request, res: express.Response): Promise<void> {
    const { provider } = State;
    const { reqHandler } = res.locals as IUsersTokens;

    try {
      const data = new LoginDto(req.body as LoginDto, req.ip as string);
      const account = await reqHandler.user.login(data, res.locals as types.IUsersTokens);

      (req.session as types.IUserSession).userId = account.payload.id;
      const details = await provider.interactionDetails(req, res);

      const result: InteractionResults = {
        login: {
          accountId: (req.session as types.IUserSession).userId,
          remember: true,
        },
        consent: {
          rejectedScopes: [],
          rejectedClaims: [],
          rememberFor: 3600,
          scope: (details.params as Record<string, unknown>).scope,
        },
      };

      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      Log.error('Oidc post Err', {
        message: (err as types.IFullError).message,
        stack: (err as types.IFullError).stack,
      });
      res.type('html');
      if ((err as types.IFullError).name === 'SessionNotFound') {
        res.render('error', {
          name: (err as types.IFullError).name,
          message: (err as types.IFullError).message,
        });
      } else {
        const interactionDetails = await provider.interactionDetails(req, res);
        const { prompt, params, uid } = interactionDetails;
        const client = await provider.Client.find(params?.client_id as string);
        res.type('html');
        res.render('login', {
          error: (err as types.IFullError).message,
          client,
          uid,
          details: prompt.details,
          params,
          frontUrl: interactionDetails.params?.redirect_uri,
        });
      }
    }
  }

  async confirm(req: express.Request, res: express.Response): Promise<void> {
    const { provider } = State;

    try {
      const interactionDetails = await provider.interactionDetails(req, res);
      const {
        prompt: { name, details },
        params,
        session,
      } = interactionDetails;
      const accountId = session?.accountId as string;
      assert.equal(name, 'consent');

      let { grantId } = interactionDetails;
      const grant = grantId
        ? await provider.Grant.find(grantId)
        : new provider.Grant({
            accountId,
            clientId: params.client_id as string,
          });

      if (details.missingOIDCScope) {
        grant!.addOIDCScope((details.missingOIDCScope as string[]).join(' '));
      }
      if (details.missingOIDCClaims) {
        grant!.addOIDCClaims(details.missingOIDCClaims as string[]);
      }
      if (details.missingResourceScopes) {
        for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
          grant!.addResourceScope(indicator, (scopes as string[]).join(' '));
        }
      }

      grantId = await grant!.save();

      const consent: Record<string, unknown> = {};
      if (!interactionDetails.grantId) {
        // we don't have to pass grantId to consent, we're just modifying existing one
        consent.grantId = grantId;
      }

      const result = { consent };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
    } catch (err) {
      res.type('html');
      res.render('error', {
        name: (err as types.IFullError).name,
        message: (err as types.IFullError).message,
      });
    }
  }

  async abort(req: express.Request, res: express.Response): Promise<void> {
    const { provider } = State;

    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      res.type('html');
      res.render('error', {
        name: (err as types.IFullError).name,
        message: (err as types.IFullError).message,
      });
    }
  }
}
