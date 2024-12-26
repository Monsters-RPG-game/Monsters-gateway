import Log from 'simpleLogger';
import ClientModel from '../../../../connections/mongo/models/client.js';
import { InvalidRequest } from '../../../../errors/index.js';
import getConfig from '../../../../tools/configLoader.js';
import ClientsRepository from '../../../clients/repository/index.js';
import AddUser from '../../repository/add.js';
import type FinishRegisterDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/abstractions.js';
import type { IUserSession } from '../../../../types/user.js';
import type UsersRepository from '../../repository/index.js';
import type express from 'express';

export default class FinishRegisterController implements IAbstractSubController<string> {
  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  private accessor repository: UsersRepository;

  async execute(data: FinishRegisterDto, req: express.Request): Promise<string> {
    const { nonce } = req.session as IUserSession;
    const clientId = (req.session as IUserSession).client;
    if (!nonce || !clientId) throw new InvalidRequest();

    await this.validateReq(nonce);

    const newUser = new AddUser(data);
    await this.repository.add(newUser);
    const client = await new ClientsRepository(ClientModel).getByName(clientId);

    return `${client!.redirectUri}/?register/success`;
  }

  private async validateReq(nonce: string): Promise<void> {
    const params = new URLSearchParams({
      nonce,
    });

    const res = await fetch(
      `${getConfig().authorizationAddress}/interaction/register/verify/${nonce}?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': getConfig().myAddress,
        },
      },
    );

    if (!res.ok) {
      Log.error('Finish register', 'Server responded with invalid register validation', nonce);
      throw new InvalidRequest();
    }
  }
}
