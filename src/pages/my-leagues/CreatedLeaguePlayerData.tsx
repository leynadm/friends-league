interface CreatedLeagueInterface {
  leagueData: LeagueCardInterface;
}
import "../../styles/created-league-player-data.css"
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
function CreatedLeaguePlayerData({ leagueData }: CreatedLeagueInterface) {
  const { currentUser } = useContext(AuthContext);

  const userTeam = getPlayerTeam();
  const userResults = getPlayerResults();

  function getPlayerTeam() {
    for (let index = 0; index < leagueData.competingTeams.length; index++) {
      const competingTeam = leagueData.competingTeams[index];
      if (competingTeam.playerId === currentUser.uid) {
        return competingTeam;
      }
    }
  }

  getPlayerTeam();

  function getPlayerResults() {
    for (let index = 0; index < leagueData.teamTable.length; index++) {
      const teamStandings = leagueData.teamTable[index];

      if (teamStandings.name === userTeam?.playerTeam.name) {
        return { W: teamStandings.W, L: teamStandings.L, D: teamStandings.D,MP:teamStandings.MP,GF:teamStandings.GF,GA:teamStandings.GA };
      }
    }
  }


  function getMatchHistory(){
    
    const matchHistory = []

    for (const [key, value] of Object.entries(leagueData.fullSeasonFixtures)) {
        
          for (let index = 0; index < value.length; index++) {
            const matchFixture = value[index];
            
            if((matchFixture.home===userTeam?.playerTeam.name || matchFixture.away===userTeam?.playerTeam.name) && matchFixture.simulated===true ){
              
                if(matchFixture.playerHome.userId===currentUser.uid){

                  if(matchFixture.homeGoals===null || matchFixture.awayGoals===null ){
                    return
                  }

                  let resultValue;

                  if(matchFixture.homeGoals>matchFixture.awayGoals){
                    resultValue="W"
                  } else if(matchFixture.homeGoals<matchFixture.awayGoals){
                    resultValue="L"
                  } else {
                    resultValue="D"
                  }

                  const updatedMatchFixture ={
                    playerHome:'active',
                    playerAway:'inactive',
                    teamHome:matchFixture.home,
                    teamAway:matchFixture.away,
                    matchResult:resultValue,
                    homeGoals:matchFixture.homeGoals,
                    awayGoals:matchFixture.awayGoals,
                    fixture:key,
                    homeImage:matchFixture.homeImage,
                    awayImage:matchFixture.awayImage
                } 
                  matchHistory.push(updatedMatchFixture)
                } else if(matchFixture.playerAway.userId===currentUser.uid){
                  
                  if(matchFixture.homeGoals===null || matchFixture.awayGoals===null ){
                    return
                  }

                  let resultValue;

                  if(matchFixture.homeGoals>matchFixture.awayGoals){
                    resultValue="L"
                  } else if(matchFixture.homeGoals<matchFixture.awayGoals){
                    resultValue="W"
                  } else {
                    resultValue="D"
                  }

                  const updatedMatchFixture ={
                    playerHome:'inactive',
                    playerAway:'active',
                    teamHome:matchFixture.home,
                    teamAway:matchFixture.away,
                    matchResult:resultValue,
                    homeGoals:matchFixture.homeGoals,
                    awayGoals:matchFixture.awayGoals,
                    fixture:key,
                    homeImage:matchFixture.homeImage,
                    awayImage:matchFixture.awayImage
                } 
                  matchHistory.push(updatedMatchFixture)

                }

            }
            
        
        }

        
  }

  matchHistory.sort((a, b) => {

    // Extract the numeric part from the "fixture" property
    const fixtureNumberA = parseInt(a.fixture.match(/\d+/)[0], 10);
    const fixtureNumberB = parseInt(b.fixture.match(/\d+/)[0], 10);
  
    return fixtureNumberB - fixtureNumberA;
  });
  
  return matchHistory
  }

  const matchHistory = getMatchHistory()

  return (
    <div className="created-league-player-data-wrapper">
      <div className="created-league-player-data">
        <div className="created-league-team-presentation">
          <div className="created-league-team-name">
            {userTeam?.playerTeam.name}
          </div>

          <img
            className="created-league-team-image"
            src={userTeam?.playerTeam.image}
          />
        </div>
      </div>

      <div className="created-league-player-team-resume">
        <div>
          W:{" "}
          {userResults?.MP
            ? ((userResults.W / userResults.MP) * 100).toFixed(0)
            : ""}
          %
        </div>
        <div>
          D:{" "}
          {userResults?.MP
            ? ((userResults.D / userResults.MP) * 100).toFixed(0)
            : ""}
          %
        </div>
        <div>
          L:{" "}
          {userResults?.MP
            ? ((userResults.L / userResults.MP) * 100).toFixed(0)
            : ""}
          %
        </div>
      </div>

      <div className="created-league-player-data-fixture-history-wrapper">
        {matchHistory &&
          matchHistory?.length > 0 &&
          matchHistory !== undefined &&
          matchHistory.map((fixture, index) => (
            <div key={index}>
              <div className="created-league-player-data-fixture-history">
                <div className="created-league-player-data-fixture-history-result-wrapper">
                  <div className={`fixture-result-value ${fixture.matchResult}` }>
                    {fixture.matchResult}
                  </div>
                  <div className="created-league-player-data-fixture-history-result">
                    <img src={fixture.homeImage} alt=""></img>
                    {fixture.homeGoals}
                    <div>-</div>
                    {fixture.awayGoals}
                    <img src={fixture.awayImage} alt=""></img>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreatedLeaguePlayerData;
