import { describe, expect, it } from 'vitest';
import { appendNumericSuffix, isCollectionFile, isTournamentFile, newTimestamp, setUpdatedAtTimestampIfDirty } from '~/helpers/file';
import { mockCollectionFile, mockTournament, mockTournamentFile } from './mocks';

describe('file', () => {
  describe('newTimestamp', () => {
    it('should return a valid ISO date string', () => {
      const result = newTimestamp();
      const parsed = new Date(result);

      expect(parsed.toISOString()).toBe(result);
    });
  });

  describe('appendNumericSuffix', () => {
    it('should return the original name with (1) when no tournaments exist', () => {
      const result = appendNumericSuffix('My Tournament', []);

      expect(result).toBe('My Tournament (1)');
    });

    it('should return the original name with (2) when one tournament with same name exists', () => {
      const tournaments = [
        { name: 'My Tournament' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament', tournaments);

      expect(result).toBe('My Tournament (2)');
    });

    it('should increment the suffix for each existing tournament', () => {
      const tournaments = [
        { name: 'My Tournament' },
        { name: 'My Tournament (2)' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament', tournaments);

      expect(result).toBe('My Tournament (3)');
    });

    it('should not affect tournaments with different names', () => {
      const tournaments = [
        { name: 'Other Tournament' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament', tournaments);

      expect(result).toBe('My Tournament (1)');
    });

    it('should strip existing numeric suffix from the input name', () => {
      const tournaments = [
        { name: 'My Tournament' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament (1)', tournaments);

      expect(result).toBe('My Tournament (2)');
    });

    it('should handle names with multiple words correctly', () => {
      const tournaments = [
        { name: 'Champions League' },
        { name: 'Champions League (2)' },
        { name: 'Champions League (3)' },
      ] as Tournament[];

      const result = appendNumericSuffix('Champions League', tournaments);

      expect(result).toBe('Champions League (4)');
    });
  });

  describe('isTournamentFile', () => {
    it('should return true for a tournament file', () => {
      expect(isTournamentFile(mockTournamentFile())).toBe(true);
      expect(isTournamentFile(mockCollectionFile())).toBe(false);
    });
  });

  describe('isCollectionFile', () => {
    it('should return true for a collection file', () => {
      expect(isCollectionFile(mockCollectionFile())).toBe(true);
      expect(isCollectionFile(mockTournamentFile())).toBe(false);
    });
  });

  describe('setUpdatedAtTimestampIfDirty', () => {
    it('should update the TournamentFile updatedAt timestamp if it is dirty', () => {
      const tournamentFile = mockTournamentFile({ name: 'Tournament' });
      const tournamentFileSnapshot = clone(tournamentFile);

      tournamentFile.data.name = 'New tournament name';

      setUpdatedAtTimestampIfDirty(tournamentFile, tournamentFileSnapshot);

      expect(tournamentFile.updatedAt).not.toBeNull();
      expect(tournamentFile.updatedAt).toBe(tournamentFile.data.updatedAt);
    });

    it('should update the CollectionFile updatedAt timestamp if it is dirty', () => {
      const collectionFile = mockCollectionFile({ name: 'Collection' });
      const collectionFileSnapshot = clone(collectionFile);

      collectionFile.data.name = 'New collection name';

      setUpdatedAtTimestampIfDirty(collectionFile, collectionFileSnapshot);

      expect(collectionFile.updatedAt).not.toBeNull();
    });

    it('should not change the timestamp if the file is not dirty', () => {
      const file = mockTournamentFile({ name: 'Tournament' });
      const snapshot = clone(file);

      setUpdatedAtTimestampIfDirty(file, snapshot);

      expect(file.updatedAt).toBeNull();
    });

    it('should update the CollectionFile tournaments updatedAt timestamp if the tournament is dirty', () => {
      const collectionFile = mockCollectionFile({ name: 'Collection' });
      const tournament = mockTournament();
      const { id } = tournament;

      collectionFile.data.tournaments[id] = tournament;

      const collectionFileSnapshot = clone(collectionFile);

      collectionFile.data.tournaments[id].name = 'New tournament name';

      setUpdatedAtTimestampIfDirty(collectionFile, collectionFileSnapshot);

      expect(collectionFile.data.tournaments[id].updatedAt).not.toBeNull();
      expect(collectionFile.data.tournaments[id].updatedAt).toBe(collectionFile.data.tournaments[id].updatedAt);
    });
  });
});
