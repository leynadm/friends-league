import { useEffect } from "react"
import LeagueCardInterface from "../../interfaces/LeagueCardInterface"
export interface MyLeaguesInterface{
    leagueData:LeagueCardInterface
}
import "../../styles/created-league-settings-card.css"

function CreatedLeagueSettingsCard({leagueData}:MyLeaguesInterface){

    return(
        <>
    <div className="created-league-settings-card-wrapper">
          <div className="created-league-settings-card"
          >
            <h2 className="created-league-settings-title">Overview</h2>
            <div className="created-league-settings-card-image">
              <img
                src={leagueData.chosenLeague.image}
                alt="a Reuben sandwich on wax paper."
              />

              <img
                src={leagueData.chosenLeague.trophyImage}
                alt="a Reuben sandwich on wax paper."
              />
            </div>
            <div className="created-league-settings-card-content">
              <h2 className="created-league-settings-card-title">{leagueData.chosenLeague.name}</h2>

              <div className="created-league-settings-card-secondary-title">
              <h2>{leagueData.leagueStatus}</h2>
              <h3>
                {" "}
                {leagueData.leagueStartDate} - {leagueData.leagueEndDate}
              </h3>
              </div>
              <hr />
              <div className="created-league-settings-card-text">
                <p>Participants: {leagueData.numberOfParticipants}</p>
                <p>
                  Match Length: {leagueData.matchLength} minutes
                </p>
                <p>Difficulty: {leagueData.inGameDifficultyLevel}</p>
                <p>Settings: {leagueData.weatherAndGrassSettings}</p>
                <p>{leagueData.tieBreaker}</p>
                
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        </div>    
    </>
    )



}

export default CreatedLeagueSettingsCard