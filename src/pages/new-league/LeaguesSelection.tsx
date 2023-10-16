import LeagueBtn from "../../components/LeagueBtn/LeagueBtn";
import "../../styles/league-selection-wrapper.css";
import { available_leagues } from "../../utils/leagues-database";
import ChosenLeagueInterface from "../../interfaces/ChosenLeagueInterface";
interface LeagueSelection{
  setChosenLeague: (status: ChosenLeagueInterface) => void;
}

function LeagueSelection({setChosenLeague}:LeagueSelection) {

    const handleLeagueSelection = (chosenLeague: ChosenLeagueInterface) => {
      setChosenLeague(chosenLeague);
    };
  

  return (
    <>
      <div className="league-selection-wrapper">
        <div className="league-selection-title">
          Choose the league for your new season!
        </div>

        {available_leagues.map((league, index) => (
            
            <LeagueBtn key={index} chosenLeague={league.name} leagueLogo={league.image} onClick={()=>handleLeagueSelection(league)} />
    
        ))}

  
      </div>
    </>
  );
}

export default LeagueSelection;
