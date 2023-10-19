import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FixtureBoard from "./FixtureBoard";
import "../../styles/created-league.css"
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import CreatedLeagueTable from "./CreatedLeagueTable";
import CreatedLeaguePlayerData from "./CreatedLeaguePlayerData";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
function CreatedLeague(){

  const { leagueId } = useParams();

  const [league, setLeague] = useState<LeagueCardInterface | null>(null);

  useEffect(()=>{

  },[league])

  useEffect(() => {
    // Function to handle changes when the Firestore document updates
    const unsubscribe = onSnapshot(doc(db, "leagues", `${leagueId}`), (snapshot) => {
      const data = { ...snapshot.data(), leagueId } as LeagueCardInterface; 
      if (data) {
        setLeague(data);
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [leagueId]); // Listen for changes when leagueId changes


  if (!league) {
    // Data is not available yet, display a loading message or return null
    return <p>Loading...</p>;
  }

  return (
      <>
        <div className="created-league-wrapper">
 
          <div className="created-league-player">
            <CreatedLeaguePlayerData leagueData={league as LeagueCardInterface}/>
          </div>

          <div className="created-league-standings">
  
            <CreatedLeagueTable leagueData={league as LeagueCardInterface}/>
   
         </div>
            <FixtureBoard leagueData={league as LeagueCardInterface} setLeague={setLeague}/>

            </div>
   
        </>
   
      );
}

export default CreatedLeague