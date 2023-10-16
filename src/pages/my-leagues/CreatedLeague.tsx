import { useLocation } from "react-router-dom";
import FixtureBoard from "./FixtureBoard";
import "../../styles/created-league.css"
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import CreatedLeagueTable from "./CreatedLeagueTable";
import CreatedLeaguePlayerData from "./CreatedLeaguePlayerData";
function CreatedLeague(){
    const location = useLocation();
    const leagueData:LeagueCardInterface = location.state ? location.state.league : null;

    return (
      <>
        <div className="created-league-wrapper">
 
          <div className="created-league-player">
            <CreatedLeaguePlayerData/>
          </div>
  
          <div className="created-league-standings">

            <CreatedLeagueTable leagueData={leagueData}/>
         </div>
            <FixtureBoard leagueData={leagueData}/>
        </div>
      </>
    );
}

export default CreatedLeague