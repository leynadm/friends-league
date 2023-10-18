import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import "../../styles/league-invitation.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import getLeagueInInvitation from "../../utils/firebase-functions/getLeagueInInvitation";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useInvitationIdContext } from "../../hooks/useInvitationIdContext";
import ChosenTeamInterface from "../../interfaces/ChosenTeamInterface";
import { initialChosenTeam } from "../../interfaces/ChosenTeamInterface";
import TeamSelection from "../new-league/TeamSelection";
import registerUserForLeague from "../../utils/firebase-functions/registerUserForLeague";

function LeagueInvitation() {
  const { currentUser } = useContext(AuthContext);
  const { setInvitationId } = useInvitationIdContext();

  const { id } = useParams();

  const [league, setLeague] = useState<LeagueCardInterface>();
  
  const [chosenTeam, setChosenTeam] =
    useState<ChosenTeamInterface>(initialChosenTeam);
  const navigate = useNavigate();

  function navigateLogIn() {
    if (id) {
      setInvitationId(id);
    }
    navigate("/login");
  }

  async function handleJoinLeagueClick() {
    if (id) {
      // Assuming that `registerUserForLeague` returns a promise
      try {
        await registerUserForLeague(currentUser.uid, id, chosenTeam);
        navigate("/home/my-leagues");
      } catch (error) {
        // Handle any errors that might occur during registration
        console.error("Error during registration:", error);
      }
    }
  }
  


  useEffect(() => {
    if (id) {
      getLeagueInInvitation(id, setLeague);
    }
  }, []);

  return (
    <div className="league-invitation">
      {league && (
        <div className="league-invitation-wrapper">
          <div className="league-invitation-promo">
            <div className="card">
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
                  <p>
                    Places Left:{" "}
                    {league.numberOfParticipants - league.competingUsers.length}
                  </p>
                  <p>Match Length: {league.matchLength} minutes</p>
                  <p>Difficulty: {league.inGameDifficultyLevel}</p>
                  <p>Settings: {league.weatherAndGrassSettings}</p>
                  <p>{league.tieBreaker}</p>

                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>

            <button
            className="team-selection-option-btn" // Pass the selected team to the handler
          >
            <div className="team-selection-option-name">{chosenTeam.name}</div>
            <img
              className="team-selection-option-image"
              alt=""
              src={chosenTeam.image}
            ></img>
          </button>


            {league.competingUsers.includes(currentUser?.uid) ? (
              <div>You already registered for this competition!</div>
            ) : league.numberOfParticipants===league.competingUsers.length?(
              <div>All places have been taken for this competition.</div>
            ) : currentUser ? (
              <button onClick={()=>handleJoinLeagueClick()} disabled={chosenTeam.name==="Your Team"}>Join the League!</button>
            ) : (
              <div>
              <div>You need to log in first in order to join a league.</div>
              <button onClick={()=>navigateLogIn}>Sign In!</button>
              </div>
            )}
          </div>

          <div>
            <TeamSelection setChosenTeam={setChosenTeam} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LeagueInvitation;
