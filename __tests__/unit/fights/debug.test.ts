import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import CreateFightDto from '../../../src/structure/modules/fights/debug/dto.js';
import type { ICreateFightDto, IFightStateTeam } from '../../../src/structure/modules/fights/debug/types.js';
import { IFightCharacterEntity, IStatsEntity } from '../../../src/structure/modules/npc/entity.js';
import fakeData from '../../fakeData.json';
import type { ISkillsEntityDetailed } from '../../../src/structure/modules/skills/getDetailed/types.js';

describe('Fights - debug', () => {
  const fakeStats = fakeData.stats[0] as IStatsEntity;
  const fakeCharacter = fakeData.characters[0]!;
  const fakeSkills = fakeData.skills[0] as ISkillsEntityDetailed;
  const stats = {
    _id: fakeStats._id,
    strength: fakeStats.strength,
    intelligence: fakeStats.intelligence,
  };

  const character = {
    _id: fakeCharacter._id,
    lvl: fakeCharacter.lvl,
    stats: stats,
  } as IFightCharacterEntity;

  const team: IFightStateTeam[] = [{ character }, { character }];

  const data: ICreateFightDto = {
    teams: [team, team],
    attacker: character,
    skills: fakeSkills,
  };

  describe('should throw', () => {
    describe('no data passed', () => {
      describe('teams', () => {
        it('Missing teams', () => {
          const clone = structuredClone(data);
          clone.teams = undefined!;
          try {
            new CreateFightDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.IncorrectArgTypeError('teams should be array'));
          }
        });

        it('Missing single team', () => {
          const clone = structuredClone(data);
          clone.teams[1] = undefined!;
          try {
            new CreateFightDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.IncorrectArgTypeError('team should be array'));
          }
        });
      });
      describe('attacker', () => {
        it('missing attacker', () => {
          const clone = structuredClone(data);
          clone.attacker = undefined!;
          try {
            new CreateFightDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError('attacker'));
          }
        });
      });
    });
    describe('incorrect data', () => {
      it('teams incorrect type', () => {
        const clone = structuredClone(data);
        clone.teams = 'asd' as unknown as [IFightStateTeam[], IFightStateTeam[]];
        try {
          new CreateFightDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('teams should be array'));
        }
      });

      it('attacker incorrect type', () => {
        const clone = structuredClone(data);
        clone.attacker = 'asd' as unknown as IFightCharacterEntity;
        try {
          new CreateFightDto(clone);
        } catch (err) {
          console.log('-----', err);
          expect(err).toEqual(new errors.IncorrectArgTypeError('attacker'));
        }
      });
    });
  });
  describe('should pass', () => {
    it('debug', () => {
      const clone = structuredClone(data);
      try {
        new CreateFightDto(clone);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
