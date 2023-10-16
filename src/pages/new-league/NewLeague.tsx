import "../../styles/new-league-wrapper.css";
import LeagueSelection from "./LeaguesSelection";
import Button from "../../components/Button/StandardButton";
import { useState } from "react";
import NewLeagueIntroduction from "./NewLeagueIntroduction";
import TeamSelection from "./TeamSelection";
import NewLeagueProgress from "./NewLeagueProgress";
import NewLeagueRules from "./NewLeagueRules";
import CreateLeague from "./CreateLeague";
import ChosenTeamInterface from "../../interfaces/ChosenTeamInterface";
import ChosenLeagueInterface from "../../interfaces/ChosenLeagueInterface";
import { initialChosenLeague } from "../../interfaces/ChosenLeagueInterface";
import { initialChosenTeam } from "../../interfaces/ChosenTeamInterface";


function NewLeague() { 

  const [currentStep, setCurrentStep] = useState(1);
  const [chosenLeague, setChosenLeague] = useState<ChosenLeagueInterface>(initialChosenLeague);
  const [chosenTeam, setChosenTeam] =
    useState<ChosenTeamInterface>(initialChosenTeam);
  const [leagueName, setLeagueName] = useState("");
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  const [matchLength, setMatchLength] = useState(8);
  const [leagueStartDate, setLeagueStartDate] = useState<string>("");
  const [leagueEndDate, setLeagueEndDate] = useState<string>("");
  const [inGameDifficultyLevel, setInGameDifficultyLevel] =
    useState("topPlayer");
  const [weatherAndGrassSettings, setWeatherAndGrassSettings] = useState(
    "Home Player Chooses"
  );
  const [tieBreaker, setTieBreaker] = useState("GD/GF/H2HR/H2HGF");

  const newLeagueSettings = {
    chosenLeague,
    setChosenLeague,
    chosenTeam,
    setChosenTeam,
    leagueName,
    setLeagueName,
    numberOfParticipants,
    setNumberOfParticipants,
    matchLength,
    setMatchLength,
    leagueStartDate,
    setLeagueStartDate,
    leagueEndDate,
    setLeagueEndDate,
    inGameDifficultyLevel,
    setInGameDifficultyLevel,
    weatherAndGrassSettings,
    setWeatherAndGrassSettings,
    tieBreaker,
    setTieBreaker,
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const createLeague = () => {
    console.log("yes");
  };

  return (
    <>
      <div className="new-league-wrapper">
        <NewLeagueProgress currentStep={currentStep} />

        {currentStep === 1 && <NewLeagueIntroduction />}

        {currentStep === 2 && <LeagueSelection setChosenLeague={setChosenLeague} />}

        {currentStep === 3 && <TeamSelection setChosenTeam={setChosenTeam} />}

        {currentStep === 4 && (
          <NewLeagueRules newLeagueSettings={newLeagueSettings} />
        )}

        {currentStep === 5 && (
          <CreateLeague newLeagueSettings={newLeagueSettings} />
        )}
        <div className="new-league-steps-buttons">
          {currentStep > 1 && (
            <Button buttonText="Back" onClick={handlePrevious} />
          )}

          {currentStep === 5 ? (
            <Button buttonText="Done" onClick={createLeague} />
          ) : (
            <Button buttonText="Next" onClick={handleNext} />
          )}
        </div>
      </div>
    </>
  );
}

export default NewLeague;
