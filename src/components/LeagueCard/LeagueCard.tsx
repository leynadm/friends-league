import { useEffect } from "react";
import LeagueCardInterface from "../../interfaces/LeagueCardInterface";
import "./league-card.css"
export interface MyLeaguesInterface{
    league:LeagueCardInterface
    onClick: () => void; // Optional function prop 
}

function LeagueCard({league,onClick}:MyLeaguesInterface) {
  
    useEffect(()=>{
        console.log(league)
    },[])
    return (
      <>
        <li className="cards_item">
          <div className="card"
          onClick={onClick}
          >
            <div className="card_league_image">
              <img
                src={league.chosenLeague.image}
                alt="a Reuben sandwich on wax paper."
              />

              <img
                src={league.chosenLeague.trophyImage}
                alt="a Reuben sandwich on wax paper."
              />
            </div>
            <div className="card_content">
              <h2 className="card_title">{league.chosenLeague.name}</h2>

              <div className="card_secondary_title">
              <h2>{league.leagueStatus}</h2>
              <h3>
                {" "}
                {league.leagueStartDate} - {league.leagueEndDate}
              </h3>
              </div>
              <hr />
              <div className="card_text">
                <p>Participants: {league.numberOfParticipants}</p>
                <p>
                  Match Length: {league.matchLength} minutes
                </p>
                <p>Difficulty: {league.inGameDifficultyLevel}</p>
                <p>Settings: {league.weatherAndGrassSettings}</p>
                <p>{league.tieBreaker}</p>
                
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        </li>
      </>
    );
}

export default LeagueCard;
