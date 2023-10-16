import { premier_league_teams } from "../../utils/teams-database";
import "../../styles/team-selection.css";
import ChosenTeamInterface from "../../interfaces/ChosenTeamInterface";

interface TeamSelectionInterface{
  setChosenTeam:(status:ChosenTeamInterface)=>void
}


function TeamSelection({setChosenTeam}:TeamSelectionInterface) {

  const handleTeamSelection = (chosenTeam: ChosenTeamInterface) => {
    setChosenTeam(chosenTeam); // Update the chosenTeam state with the selected team
  };

  return (
    <div className="team-selection">
      <div className="team-selection-title">Pick your team!</div>
      <div className="team-selection-wrapper">
        {premier_league_teams.map((team, index) => (
          <button
            className="team-selection-option-btn"
            key={index}
            onClick={() => handleTeamSelection(team)} // Pass the selected team to the handler
          >
            <div className="team-selection-option-name">{team.name}</div>
            <img
              className="team-selection-option-image"
              alt=""
              src={team.image}
            ></img>
          </button>
        ))}
      </div>
    </div>
  );
}


export default TeamSelection;
