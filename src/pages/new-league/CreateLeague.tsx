import NewLeagueInterface from "../../interfaces/NewLeagueSettingsInterface";
import "../../styles/create-league.css";
import NewLeagueSettingsInterface from "../../interfaces/NewLeagueSettingsInterface";
import { premier_league_teams } from "../../utils/teams-database";
import ChosenTeamInterface from "../../interfaces/ChosenTeamInterface";
import fixtureInterface from "../../interfaces/fixtureInterface";
import { fullSeasonFixturesInterface } from "../../interfaces/fixtureInterface";
import createNewLeague from "../../utils/firebase-functions/createNewLeague";
import { LeagueDataSettingsInterface } from "../../interfaces/NewLeagueSettingsInterface";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";
function CreateLeague({ newLeagueSettings }: NewLeagueSettingsInterface) {
  
  const {currentUser} = useContext(AuthContext)

  const {
    leagueName,
    chosenLeague,
    chosenTeam,
    numberOfParticipants,
    matchLength,
    leagueStartDate,
    leagueEndDate,
    inGameDifficultyLevel,
    weatherAndGrassSettings,
    tieBreaker,
  } = newLeagueSettings;

  function generateFixtures(league_teams: ChosenTeamInterface[]) {
    
    const teams = league_teams.sort((a, b) => 0.5 - Math.random());

    const numTeams = teams.length;

    const fixtures = [];
    const returnFixtures = [];
    let fullSeasonFixtures: fixtureInterface[][] = [];
    const rounds = numTeams - 1;

    const leagueTeamsTable:TeamTableDataInterface[] = []

    for (let index = 0; index < league_teams.length; index++) {
      const element = league_teams[index];
      
      const teamTableData:TeamTableDataInterface = {
        name:element.name,
        image:element.image,
        rating:element.rating,
        MP:0,
        W:0,
        D:0,
        L:0,
        GF:0,
        GA:0,
        GD:0,
        Pts:0,
        Last5:[]
      }
      leagueTeamsTable.push(teamTableData)
    }


  
    for (let round = 1; round <= rounds; round++) {
      const roundFixtures = [];
      const secondRoundFixtures = [];
      const half1 = teams.slice(0, numTeams / 2);
      const half2 = teams.slice(numTeams / 2).reverse();

      let homeAwayAssignment = "home";

      for (let i = 0; i < half1.length; i++) {
        if (half1[i] !== null && half2[i] !== null) {

          let playerHomeObj={
            userId:"NPC",
            userImage:"NPC",
            isPlayer:false
          }
      
          let playerAwayObj={
            userId:"NPC",
            userImage:"NPC",
            isPlayer:false
          }
      
          let isPlayer = false;

          if (half1[i].name === chosenTeam.name) {
            playerHomeObj = {
              userId: currentUser.uid,
              userImage: "",
              isPlayer: true,
            };
            isPlayer = true;
          } else if (half2[i].name === chosenTeam.name) {
            playerAwayObj = {
              userId: currentUser.uid,
              userImage: "",
              isPlayer: true,
            };
            isPlayer = true;
          }

          if (homeAwayAssignment === "home") {
            roundFixtures.push({
              home: half1[i].name,
              away: half2[i].name,
              homeGoals: 0,
              awayGoals: 0,
              homeCoefficient: half1[i].rating,
              awayCoefficient: half2[i].rating,
              homeImage: half1[i].image,
              awayImage: half2[i].image,
              homeAdvantage: half1[i].advantage,
              awayAdvantage: half2[i].advantage,
              simulated:false,
              playerHome:playerHomeObj,
              playerAway:playerAwayObj,
              isPlayer:isPlayer
            });
            secondRoundFixtures.push({
              home: half2[i].name,
              away: half1[i].name,
              homeGoals: 0,
              awayGoals: 0,
              homeCoefficient: half2[i].rating,
              awayCoefficient: half1[i].rating,
              homeImage: half2[i].image,
              awayImage: half1[i].image,
              homeAdvantage: half2[i].advantage,
              awayAdvantage: half1[i].advantage,
              simulated:false,
              playerHome:playerHomeObj,
              playerAway:playerAwayObj,
              isPlayer:isPlayer
            });
            homeAwayAssignment = "away";
          } else if (homeAwayAssignment === "away") {
            roundFixtures.push({
              home: half2[i].name,
              away: half1[i].name,
              homeGoals: 0,
              awayGoals: 0,
              homeCoefficient: half2[i].rating,
              awayCoefficient: half1[i].rating,
              homeImage: half2[i].image,
              awayImage: half1[i].image,
              homeAdvantage: half2[i].advantage,
              awayAdvantage: half1[i].advantage,
              simulated:false,
              playerHome:playerHomeObj,
              playerAway:playerAwayObj,
              isPlayer:isPlayer
            });
            secondRoundFixtures.push({
              home: half1[i].name,
              away: half2[i].name,
              homeGoals: 0,
              awayGoals: 0,
              homeCoefficient: half1[i].rating,
              awayCoefficient: half2[i].rating,
              homeImage: half1[i].image,
              awayImage: half2[i].image,
              homeAdvantage: half1[i].advantage,
              awayAdvantage: half2[i].advantage,
              simulated:false,
              playerHome:playerHomeObj,
              playerAway:playerAwayObj,
              isPlayer:isPlayer
            });
            homeAwayAssignment = "home";
          }
        }
      }

      fixtures.push(roundFixtures);
      returnFixtures.push(secondRoundFixtures);

      fullSeasonFixtures = fixtures.concat(returnFixtures);

      // Rotate teams for the next round
      if (teams.length > 0) {
        const lastTeam = teams.pop() as ChosenTeamInterface;
        teams.splice(1, 0, lastTeam);
      }
    }
    /*   
    // Print the fixtures
    fullSeasonFixtures.forEach((round, roundIndex) => {
      console.log(`Round ${roundIndex + 1}:`);
      round.forEach((match) => {
        console.log(`${match.home} vs. ${match.away}`);
      });
      console.log();
    }); */

    const fixtureCompletion: Record<string, boolean> = {};

    for (let index = 1; index <= (numTeams * 2) - 2; index++) {
      const fixture = `Fixture ${index}`;
      fixtureCompletion[fixture] = false;
    }
        
    const resultObject: fullSeasonFixturesInterface = {};

    // Loop through the array of arrays
    for (let i = 0; i < fullSeasonFixtures.length; i++) {
      const innerArray = fullSeasonFixtures[i];

      // Create a key for the result object based on the index
      const key = `Fixture ${i + 1}`;

      // Add a "deadline" property with a value of null to each fixture object
      const fixturesWithDeadline = innerArray.map((fixture) => ({
        ...fixture,
        deadline: null,
      }));

      // Store the modified array in the result object
      resultObject[key] = fixturesWithDeadline;
    }    

    const leagueSettingsObj: LeagueDataSettingsInterface = {
      leagueName: leagueName,
      chosenLeague: chosenLeague,
      chosenTeam: chosenTeam,
      numberOfParticipants: numberOfParticipants,
      matchLength: matchLength,
      leagueStartDate: leagueStartDate,
      leagueEndDate: leagueEndDate,
      inGameDifficultyLevel: inGameDifficultyLevel,
      weatherAndGrassSettings: weatherAndGrassSettings,
      tieBreaker: tieBreaker,
      fixtureCompletion:fixtureCompletion
    };

    createNewLeague(resultObject, leagueSettingsObj, currentUser.uid,leagueTeamsTable);
  }

  return (
    <div className="create-league-wrapper">
      <div className="create-league-title">
        Review your information and click 'Done'
      </div>

      <div className="create-league-overview">
        <div>{leagueName}</div>
        <div>
          <div>{chosenLeague.name}</div>
          <img src={chosenLeague.image} alt=""></img>
        </div>
        <div>
          <div>{chosenTeam.name}</div>
          <img src={chosenTeam.image} alt=""></img>
        </div>
        <div>Team Coefficient: [{chosenTeam.rating}]</div>
        <div>Participants: {numberOfParticipants}</div>
        <div>Match Length: {matchLength} minutes</div>
        <div>League Start: {leagueStartDate}</div>
        <div>League End: {leagueEndDate}</div>
        <div>In-Game Difficulty: {inGameDifficultyLevel}</div>
        <div>Weather & Grass: {weatherAndGrassSettings}</div>
        <div>League Tie-Breaker: {tieBreaker}</div>
      </div>
      <button onClick={() => generateFixtures(premier_league_teams)}>
        TEST
      </button>
    </div>
  );
}

export default CreateLeague;
