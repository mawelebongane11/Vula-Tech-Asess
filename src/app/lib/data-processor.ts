/**
 * Vula Community Poll Engine - Core Analytical Logic
 * Implements O(N) linear complexity for dataset processing.
 */

export type User = {
  id: string;
  firstName: string;
  surname: string;
};

export type Favourite = {
  userId: string;
  color: string;
};

export type ProcessedResults = {
  popularColor: string;
  voters: User[];
  totalVotesForWinner: number;
  totalParticipants: number;
};

/**
 * Standardized parser for user records.
 * Handles space, tab, and comma delimiters.
 */
export function parseUsers(text: string): User[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const parts = line.trim().split(/[,\t\s]+/).filter(Boolean);
      if (parts.length >= 3) {
        return {
          id: parts[0],
          firstName: parts[1],
          surname: parts[2],
        };
      }
      return null;
    })
    .filter((user): user is User => user !== null);
}

/**
 * Standardized parser for color preference records.
 */
export function parseFavourites(text: string): Favourite[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const parts = line.trim().split(/[,\t\s]+/).filter(Boolean);
      if (parts.length >= 2) {
        return {
          userId: parts[0],
          color: parts[1],
        };
      }
      return null;
    })
    .filter((fav): fav is Favourite => fav !== null);
}

/**
 * Core analytical engine.
 * Utilizes Hash Map indexing to achieve O(N) time complexity.
 */
export function analyzeData(users: User[], favourites: Favourite[]): ProcessedResults {
  if (users.length === 0 || favourites.length === 0) {
    return {
      popularColor: 'None',
      voters: [],
      totalVotesForWinner: 0,
      totalParticipants: 0,
    };
  }

  // Phase 1: O(N) Indexing
  const userMap = new Map<string, User>();
  users.forEach(u => userMap.set(u.id, u));

  // Phase 2: O(N) Tallying
  const colorCounts = new Map<string, number>();
  favourites.forEach(f => {
    const color = f.color.trim().toLowerCase();
    if (color) {
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
    }
  });

  // Phase 3: Identify Winning Consensus
  let maxVotes = 0;
  let winner = '';
  colorCounts.forEach((count, color) => {
    if (count > maxVotes) {
      maxVotes = count;
      winner = color;
    }
  });

  // Phase 4: Deterministic Sorting (Surname primary, First Name secondary)
  const winnerVoters: User[] = favourites
    .filter(f => f.color.trim().toLowerCase() === winner)
    .map(f => userMap.get(f.userId))
    .filter((u): u is User => !!u)
    .sort((a, b) => {
      const sComp = a.surname.localeCompare(b.surname, undefined, { sensitivity: 'base' });
      if (sComp !== 0) return sComp;
      return a.firstName.localeCompare(b.firstName, undefined, { sensitivity: 'base' });
    });

  return {
    popularColor: winner ? winner.charAt(0).toUpperCase() + winner.slice(1) : 'None',
    voters: winnerVoters,
    totalVotesForWinner: winnerVoters.length,
    totalParticipants: favourites.length,
  };
}
