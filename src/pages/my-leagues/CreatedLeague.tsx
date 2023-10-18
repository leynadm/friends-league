import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FixtureBoard from "./FixtureBoard";
import "../../styles/created-league.css"
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import CreatedLeagueTable from "./CreatedLeagueTable";
import CreatedLeaguePlayerData from "./CreatedLeaguePlayerData";
import getSpecificLeague from "../../utils/firebase-functions/getSpecificLeague";
function CreatedLeague(){

  const { leagueId } = useParams();


  const [league, setLeague] = useState<LeagueCardInterface | null>(null);

  const handleRefresh = async () => {
    try {
      if(leagueId){
        const data = await getSpecificLeague(leagueId);
        setLeague(data);
      }
    } catch (error) {
      console.error('Error fetching league data', error);
    }
  }

  useEffect(()=>{

  },[league])

  useEffect(()=>{
    handleRefresh()
  },[leagueId])


  if (!league) {
    // Data is not available yet, display a loading message or return null
    return <p>Loading...</p>;
  }

  return (
      <>
        <div className="created-league-wrapper">
 
          <div className="created-league-player">
            <CreatedLeaguePlayerData/>
          </div>

          <div className="created-league-standings">
  
            <CreatedLeagueTable leagueData={league as LeagueCardInterface}/>
   
         </div>
            <FixtureBoard leagueData={league as LeagueCardInterface} handleRefresh={handleRefresh} setLeague={setLeague}/>

            </div>
   
        </>
   
      );
}

export default CreatedLeague