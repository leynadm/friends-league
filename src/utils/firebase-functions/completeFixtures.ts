import { getDoc,doc } from "firebase/firestore";
import { db } from "../../config/firebase";

import fixtureInterface from "../../interfaces/fixtureInterface";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import updateFixtureResults from "./updateFixtureResults";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";
export async function completeFixtureMatch(
  leagueId:string,
  fixture: fixtureInterface[],
  clientLeagueData: LeagueCardInterface,
  fixtureNumber: string
) {

  const leagueDocId = doc(db, "leagues", leagueId);

  const leagueDoc = await getDoc(leagueDocId);
  
  const queriedLeagueData: LeagueCardInterface | undefined = leagueDoc.data() as LeagueCardInterface;

  console.log(clientLeagueData)
  console.log(clientLeagueData)
  if(!clientLeagueData){
    console.log('Returning as league data doesnt exist')
    return
  }

  const competingTeamsArr = [];

  for (let index = 0; index < clientLeagueData.competingTeams.length; index++) {
    const element = clientLeagueData.competingTeams[index];

    competingTeamsArr.push(element.playerTeam.name);
  }

  const newFixtureResults: fixtureInterface[] = [];

  for (let index = 0; index < fixture.length; index++) {
    const fixtureMatch = fixture[index];

    if (
      (competingTeamsArr.includes(fixtureMatch.home) ||
        competingTeamsArr.includes(fixtureMatch.away)) &&
      fixtureMatch.simulated===true
    ) {
      newFixtureResults.push(fixtureMatch);
      continue;
    } else if (
      competingTeamsArr.includes(fixtureMatch.home) ||
      (competingTeamsArr.includes(fixtureMatch.away) && fixtureMatch.simulated===false)
    ) {
      fixtureMatch.homeGoals = 0;
      fixtureMatch.awayGoals = 0;
      newFixtureResults.push(fixtureMatch);
      continue
    }

    const homeTeamRating = fixtureMatch.homeCoefficient;
    const awayTeamRating = fixtureMatch.awayCoefficient;
    const K = 400;
    const homeAdvantage = fixtureMatch.homeAdvantage;

    // Calculate the expected probabilities without home field advantage

    const homeTeamExponent =
      (awayTeamRating - (homeTeamRating + homeAdvantage)) / K;

    const awayTeamExponent =
      (homeTeamRating + homeAdvantage - awayTeamRating) / K;

    const E1 = 1 / (1 + Math.pow(10, homeTeamExponent));
    const E2 = 1 / (1 + Math.pow(10, awayTeamExponent));

    const matchResult = simulateMatchResult(E1, E2);

    const homeGoals = simulateGoalsScoredHome(homeTeamRating, matchResult);
    const awayGoals = simulateGoalsScoredAway(awayTeamRating, matchResult);

    const adjustedGoals = adjustGoalsScoredBasedOnResult(
      homeGoals,
      awayGoals,
      matchResult
    );

    fixtureMatch.homeGoals = adjustedGoals.homeGoals;
    fixtureMatch.awayGoals = adjustedGoals.awayGoals;
    fixtureMatch.simulated = true;

    newFixtureResults.push(fixtureMatch);
  }

  
  const standings = updateTableStandings(fixtureNumber,clientLeagueData)
  
  if (clientLeagueData.leagueId && standings) {
    updateFixtureResults(clientLeagueData.leagueId, newFixtureResults, fixtureNumber,standings);
  }
 
}

// Function to simulate a match result (0 for draw, 1 for win, -1 for loss)
export function simulateMatchResult(E1: number, E2: number) {
  // E1 & E2 represent the expected win probabilities of Team 1 and Team 2

  //randomValue is a random number between 0 and 1.
  const randomValue: number = parseFloat(Math.random().toFixed(2));
  const drawRange: number = E1 + E2 * (1 - 0.25);

  //console.log( `RANDOM VALUE:${randomValue}  DRAW RANGE:${drawRange}`)

  if (randomValue < E1) {
    console.log("TEAM 1 WINS");
    return 1; // Team 1 wins
  } else if (randomValue > drawRange) {
    console.log("IT's A DRAW");
    return 0; // Draw
  } else {
    console.log("TEAM 2 WINS");
    return -1;
  }
}

export function adjustGoalsScoredBasedOnResult(
  homeGoals: number,
  awayGoals: number,
  result: number
) {
  if (result === 1) {
    if (homeGoals <= awayGoals) {
      while (awayGoals >= homeGoals) {
        awayGoals--;
      }
    }
  } else if (result === 0) {
    if (homeGoals !== awayGoals) {
      // Adjust goals to make them equal
      awayGoals = homeGoals;
    }
  } else if (result === -1) {
    if (homeGoals >= awayGoals) {
      while (homeGoals >= awayGoals) {
        homeGoals--;
      }
    }
  }

  return { homeGoals, awayGoals };
}

export function simulateGoalsScoredHome(
  EloRating: number,
  matchResult: number
) {
  // Define the average goals per match (lambda)
  const averageGoals = 2.7;

  let lambda;
  if (matchResult === 1) {
    lambda = EloRating / 1000;
  } else if (matchResult === -1) {
    lambda = EloRating / 1800;
  } else {
    lambda = EloRating / 1400;
  }

  // Adjust lambda to allow for 0-0 draws
  if (matchResult === 0) {
    lambda = averageGoals / 2; // Lower lambda for 0-0 draws
  }

  // Generate the number of goals using the Poisson distribution
  let goals = 0;
  for (let i = 0; i < 100; i++) {
    // Limit to a reasonable number of iterations
    const L = Math.exp(-lambda);
    let p = 1.0;
    goals = 0;

    do {
      goals++;
      p *= Math.random();
    } while (p > L);

    // Add a constraint to limit goals to a reasonable range (0 to 4 goals, or 0 for 0-0 draws)
    if (goals >= 0 && goals <= 4) {
      break;
    }
  }

  return goals;
}

export function simulateGoalsScoredAway(
  EloRating: number,
  matchResult: number
) {
  // Define the average goals per match (lambda)
  const averageGoals = 2.7;

  let lambda;
  if (matchResult === 1) {
    lambda = EloRating / 1800;
  } else if (matchResult === -1) {
    lambda = EloRating / 1000;
  } else {
    lambda = EloRating / 1400;
  }

  // Adjust lambda to allow for 0-0 draws
  if (matchResult === 0) {
    lambda = averageGoals / 2; // Lower lambda for 0-0 draws
  }

  // Generate the number of goals using the Poisson distribution
  let goals = 0;
  for (let i = 0; i < 100; i++) {
    // Limit to a reasonable number of iterations
    const L = Math.exp(-lambda);
    let p = 1.0;
    goals = 0;

    do {
      goals++;
      p *= Math.random();
    } while (p > L);

    // Add a constraint to limit goals to a reasonable range (0 to 4 goals, or 0 for 0-0 draws)
    if (goals >= 0 && goals <= 4) {
      break;
    }
  }

  return goals;
}



function updateTableStandings(
  fixtureNumber: string,
  leagueData: LeagueCardInterface,
) {
  const standings: TeamTableDataInterface[] = leagueData.teamTable;

  for (const [key, value] of Object.entries(leagueData.fullSeasonFixtures)) {
    if (key !== fixtureNumber) {
      continue;
    }

    for (let index = 0; index < value.length; index++) {
      const matchFixture = value[index];
      if (matchFixture.simulated === true) {
        if (
          matchFixture.homeGoals === null ||
          matchFixture.awayGoals === null
        ) {
          return;
        }

        const homeTeamStanding = standings.find(
          (entry) => entry.name === matchFixture.home
        );
        const awayTeamStanding = standings.find(
          (entry) => entry.name === matchFixture.away
        );

        if (homeTeamStanding && awayTeamStanding) {
          
          homeTeamStanding.MP++
          awayTeamStanding.MP++

          homeTeamStanding.GF += matchFixture.homeGoals;

          homeTeamStanding.GA += matchFixture.awayGoals;
          awayTeamStanding.GF += matchFixture.awayGoals;
          awayTeamStanding.GA += matchFixture.homeGoals;

          if (matchFixture.homeGoals > matchFixture.awayGoals) {
            homeTeamStanding.W++;
            awayTeamStanding.L++;
          } else if (matchFixture.homeGoals < matchFixture.awayGoals) {
            homeTeamStanding.L++;
            awayTeamStanding.W++;
          } else {
            homeTeamStanding.D++;
            awayTeamStanding.D++;
          }

          homeTeamStanding.Pts +=
            matchFixture.homeGoals > matchFixture.awayGoals
              ? 3
              : matchFixture.homeGoals === matchFixture.awayGoals
              ? 1
              : 0;
          awayTeamStanding.Pts +=
            matchFixture.awayGoals > matchFixture.homeGoals
              ? 3
              : matchFixture.awayGoals === matchFixture.homeGoals
              ? 1
              : 0;
        }
      }
    }
  }

  // Sort standings based on points, goal difference, etc.
  standings.sort((a, b) => {
    if (a.Pts !== b.Pts) {
      return b.Pts - a.Pts; // Sort by Pts
    } else {
      const goalDifferenceA = a.GF - a.GA;
      const goalDifferenceB = b.GF - b.GA;
      if (goalDifferenceA !== goalDifferenceB) {
        return goalDifferenceB - goalDifferenceA; // Sort by goal difference
      } else {
        return b.GF - a.GF; // Sort by goals scored
      }
    }
  });

  return standings;
}
