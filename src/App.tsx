import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home/LandingPage";
import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import { AuthProvider } from "./context/AuthContext";
import AuthRoute from "./context/AuthRoute";
import LeagueInvitation from "./pages/league-invitation/LeagueInvitation";
import { InvitationIdContextProvider } from "./context/InvitationIdContext";
import SignUp from "./pages/authentication/SignUp";
function App() {
  return (
    <div className="app">
      <AuthProvider>
        <InvitationIdContextProvider>
          <Router>
            <Routes>
              {/* If the user isn't signed him, reroute him to login */}
              <Route element={<AuthRoute type="signup" />}>
                <Route element={<SignUp />} path="/signup" />
              </Route>

              {/* If the user isn't signed him, reroute him to login */}
              <Route element={<AuthRoute type="login" />}>
                <Route element={<Login />} path="/login" />
              </Route>

              {/* If the user is signed in and tries to access login, reroute him to home */}
              <Route element={<AuthRoute type="home" />}>
                <Route path="/home/*" element={<Home />} />
              </Route>

              <Route element={<AuthRoute type="/" />}>
                <Route index path="/" element={<LandingPage />} />
              </Route>

              <Route
                path="/league-invitation/:id"
                element={<LeagueInvitation />}
              />
            </Routes>
          </Router>
        </InvitationIdContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

/* 
import { useState } from "react";
import "./App.css";
import { premier_league_teams } from "./utils/teams-database";

interface Team {
  id: string;
  name: string;
  rating: number;
  image: string;
  homeAdvantage:number;
}

interface TeamResults {
  team: string;
  points: number;
  goalsFor:number
  goalsAgainst:number
}

function App() {
  const [teamAWins, setTeamAWins] = useState(0);
  const [teamBWins, setTeamBWins] = useState(0);
  const [teamDraws, setTeamDraws] = useState(0);
  const [seasonResults, setSeasonResults] = useState<TeamResults[]>([]);


  function generateFixtures(teams) {
    const numTeams = teams.length;
    
    // Ensure the number of teams is even
    if (numTeams % 2 !== 0) {
      teams.push(null);
    }
  
    const fixtures = [];
    const rounds = numTeams - 1;
  
    for (let round = 1; round <= rounds; round++) {
      const roundFixtures = [];
      const half1 = teams.slice(0, numTeams / 2);
      const half2 = teams.slice(numTeams / 2).reverse();
  
      for (let i = 0; i < half1.length; i++) {
        if (half1[i] !== null && half2[i] !== null) {
          roundFixtures.push({ home: half1[i], away: half2[i] });
        }
      }
  
      fixtures.push(roundFixtures);
  
      // Rotate teams for the next round
      teams.splice(1, 0, teams.pop());
    }
  
    return fixtures;
  }
  
  // Example usage:
  const teams = [
    "Team1", "Team2", "Team3", "Team4", "Team5", "Team6", "Team7", "Team8",
    "Team9", "Team10", "Team11", "Team12", "Team13", "Team14", "Team15",
    "Team16", "Team17", "Team18", "Team19", "Team20"
  ];
  
  const fixtures = generateFixtures(teams);
  
  // Print the fixtures
  fixtures.forEach((round, roundIndex) => {
    console.log(`Round ${roundIndex + 1}:`);
    round.forEach((match) => {
      console.log(`${match.home} vs. ${match.away}`);
    });
    console.log();
  });
  



  function simulateSeason() {
    const teamResultArr: TeamResults[] = [];

    for (let index = 0; index < premier_league_teams.length; index++) {
      const homeTeam = premier_league_teams[index].id;

      for (
        let indexOpponent = 0;
        indexOpponent < premier_league_teams.length;
        indexOpponent++
      ) {
        const awayTeam = premier_league_teams[indexOpponent].id;

        if (homeTeam !== awayTeam) {
          simulateMatchWithRandomness(
            premier_league_teams[index],
            premier_league_teams[indexOpponent],
            1.5,
            teamResultArr
          );
        }
      }
    }

    for (let index = 0; index < premier_league_teams.length; index++) {
      const homeTeam = premier_league_teams[index].id;

      for (
        let indexOpponent = 0;
        indexOpponent < premier_league_teams.length;
        indexOpponent++
      ) {
        const awayTeam = premier_league_teams[indexOpponent].id;

        if (homeTeam !== awayTeam) {
          simulateMatchWithRandomness(
            premier_league_teams[index],
            premier_league_teams[indexOpponent],
            1.5,
            teamResultArr
          );
        }
      }
    }

    // Create an empty object to store the grouped data
    const groupedData = {};

    console.log(teamResultArr)

    // Use forEach to group and sum
    teamResultArr.forEach((item) => {
      if (!groupedData[item.team]) {
        // If the group doesn't exist, create it
        groupedData[item.team] = { team: item.team, points: 0,goalsFor:0,goalsAgainst:0,wins:0,defeats:0,draws:0 };
      }

      // Add the points to the existing group
      groupedData[item.team].points += item.points;
      groupedData[item.team].goalsFor += item.goalsFor;
      groupedData[item.team].goalsAgainst += item.goalsAgainst;
      groupedData[item.team].wins += item.wins;
      groupedData[item.team].draws += item.draws;
      groupedData[item.team].defeats += item.defeats;
    });

    // Convert the grouped data object to an array of objects
    const result = Object.values(groupedData);

    result.sort((a, b) => b.points - a.points);

    console.log(result);

    setSeasonResults(result);
    
  
  }


  function simulateMatchWithRandomness(
    teamA: Team,
    teamB: Team,
    randomnessFactor: number,
    teamResultArr: Array<TeamResults>
  ) {
    const homeTeamRating = teamA.rating;
    const awayTeamRating = teamB.rating;
    const K = 400;
    const homeAdvantage = teamA.homeAdvantage;

    // Calculate the expected probabilities without home field advantage
    const homeTeamExponent =
      (awayTeamRating - (homeTeamRating + homeAdvantage)) / K;
    const awayTeamExponent =
      (homeTeamRating + homeAdvantage - awayTeamRating) / K;

    const E1 = 1 / (1 + Math.pow(10, homeTeamExponent));
    const E2 = 1 / (1 + Math.pow(10, awayTeamExponent));

    console.log(`E1:${E1.toFixed(2)}% - E2:${E2.toFixed(2)}%`)
    const matchResult = simulateMatchResult(E1, E2);

    // Adjust Elo ratings based on the match result
    const updatedRatings = updateEloRatings(
      homeTeamRating,
      awayTeamRating,
      matchResult
    );

    console.log(`${teamA.name} Elo Rating: ${updatedRatings[0].toFixed(2)}`);
    console.log(`${teamB.name} Elo Rating: ${updatedRatings[1].toFixed(2)}`);

    let numberOfPoints = 0;
    let wins=0;
    let draws=0;
    let defeats=0
    if (matchResult === 1) {
      console.log(`${teamA.name} wins`);
      numberOfPoints = 3;
      wins=1
    } else if (matchResult === -1) {
      console.log(`${teamB.name} wins`);
      numberOfPoints = 0;
      defeats = 1
    } else {
      console.log("It's a draw");
      numberOfPoints = 1;
      draws=1
    }

    const teamResult = {
      team: teamA.name,
      points: numberOfPoints,
      goalsFor: 0,
      goalsAgainst: 0,
      wins:wins,
      draws:draws,
      defeats:defeats
    };

    teamResultArr.push(teamResult);
  }

  // Function to simulate a match result (0 for draw, 1 for win, -1 for loss)
  function simulateMatchResult(E1, E2) {
    const randomValue = Math.random().toFixed(2);
    console.log({ randomValue });
    
     // Calculate the range for a draw
    const drawRange = E1 + E2 * (1 - 0.1);

    if (randomValue < E1) {
      console.log(`${randomValue} < ${E1.toFixed(2)}}%`)
      return 1; // Team 1 wins
    } else if (randomValue < drawRange) {
      console.log(`${randomValue} < drawRange ${(drawRange).toFixed(2)}%`)
      return 0; // Draw
    } else {
      console.log('Team 2 wins')

    }
  }

  // Function to update Elo ratings based on the match result
  function updateEloRatings(homeTeamRating, awayTeamRating, matchResult) {
    const K = 32; // You can adjust the K factor as needed

    const R1 = homeTeamRating;
    const R2 = awayTeamRating;

    const expectedOutcome1 = 1 / (1 + Math.pow(10, (R2 - R1) / K));
    const expectedOutcome2 = 1 / (1 + Math.pow(10, (R1 - R2) / K));

    const actualOutcome1 = matchResult === 1 ? 1 : 0.5; // 1 for win or 0.5 for draw
    const actualOutcome2 = matchResult === -1 ? 1 : 0.5; // 1 for win or 0.5 for draw

    const newR1 = R1 + K * (actualOutcome1 - expectedOutcome1);
    const newR2 = R2 + K * (actualOutcome2 - expectedOutcome2);

    console.log(newR1)
    console.log(newR2)
    return [newR1, newR2];
  }
  
  return (
    <>
      <div>{teamAWins}</div>
      <div>{teamDraws}</div>
      <div>{teamBWins}</div>
      <button onClick={simulateSeason}>Test</button>

      {seasonResults.map((team: TeamResults, index: number) => (
        <div className="user" key={index}>
          {`${team.team} - P${team.points} W${team.wins} D${team.draws} L${team.defeats}`}
        </div>
      ))}
    </>
  );
}

export default App;
 */
