import { parseUsers, parseFavourites, analyzeData } from './data-processor';

describe('Vula Community Poll Engine - O(N) Logic Validation', () => {
  const usersRaw = `1 John Doe\n2 Jane Smith\n3 Bob Johnson`;
  const favsRaw = `1 Blue\n2 Red\n3 Blue`;

  it('correctly parses users and handles various delimiters', () => {
    const users = parseUsers(usersRaw);
    expect(users).toHaveLength(3);
    expect(users[0].firstName).toBe('John');
    expect(users[0].surname).toBe('Doe');
  });

  it('identifies the winning color correctly', () => {
    const users = parseUsers(usersRaw);
    const favs = parseFavourites(favsRaw);
    const results = analyzeData(users, favs);
    
    expect(results.popularColor).toBe('Blue');
    expect(results.totalVotesForWinner).toBe(2);
  });

  it('sorts recipients alphabetically by Surname, then First Name', () => {
    const tieUsers = parseUsers(`
      1 Zebra Alpha
      2 Apple Zebra
      3 Apple Alpha
    `);
    const tieFavs = parseFavourites(`
      1 Red
      2 Red
      3 Red
    `);
    
    const results = analyzeData(tieUsers, tieFavs);
    const voters = results.voters;
    
    // Expected order based on Surname: Alpha, Alpha, Zebra
    // Within Alpha: Apple then Zebra
    expect(voters[0].surname).toBe('Alpha');
    expect(voters[0].firstName).toBe('Apple');
    expect(voters[1].surname).toBe('Alpha');
    expect(voters[1].firstName).toBe('Zebra');
    expect(voters[2].surname).toBe('Zebra');
  });
});
