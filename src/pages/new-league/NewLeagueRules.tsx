import "../../styles/new-league-rules.css";
import { ChangeEvent } from "react";
import NewLeagueSettingsInterface from "../../interfaces/NewLeagueSettingsInterface";

function NewLeagueRules({ newLeagueSettings }: NewLeagueSettingsInterface) {
  const {
    leagueName,
    setLeagueName,
    leagueType,
    setLeagueType,
    chosenTeam,
    setChosenTeam,
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
  } = newLeagueSettings;

  // Function to update the leagueName state variable
  function handleLeagueNameChange(e: ChangeEvent<HTMLInputElement>) {
    // Call the setLeagueName function from props to update the state
    console.log(leagueName);
    setLeagueName(e.target.value);
  }

  function handleNumberOfParticipants(e: ChangeEvent<HTMLInputElement>) {
    // Call the setLeagueName function from props to update the state
    console.log(numberOfParticipants);
    setNumberOfParticipants(parseInt(e.target.value));
  }

  function handleMatchLength(e: ChangeEvent<HTMLInputElement>) {
    // Call the setLeagueName function from props to update the state
    console.log(typeof matchLength);
    setMatchLength(parseInt(e.target.value));
  }

  function handleLeagueStartDate(e: ChangeEvent<HTMLInputElement>) {
    // Get the date value from the input field as a string
    const dateValueString = e.target.value;

    // Convert the string to a Date object
    const dateValue = new Date(dateValueString);

    // Check if the conversion was successful and it's a valid date
    if (!isNaN(dateValue.getTime())) {
      // Call the setLeagueStartDate function from props to update the state
      setLeagueStartDate(dateValueString);
    } else {
      // Handle the case where the input value is not a valid date
      console.error("Invalid date input:", dateValueString);
    }
  }

  function handleLeagueEndDate(e: ChangeEvent<HTMLInputElement>) {
    // Get the date value from the input field as a string
    const dateValueString = e.target.value;

    // Convert the string to a Date object
    const dateValue = new Date(dateValueString);

    // Check if the conversion was successful and it's a valid date
    if (!isNaN(dateValue.getTime())) {
      // Call the setLeagueStartDate function from props to update the state
      setLeagueEndDate(dateValueString);
    } else {
      // Handle the case where the input value is not a valid date
      console.error("Invalid date input:", dateValueString);
    }
  }

  function handleInGameDifficultyLevel(e: ChangeEvent<HTMLSelectElement>) {
    console.log(inGameDifficultyLevel);
    setInGameDifficultyLevel(e.target.value);
  }

  function handleWeatherAndGrassSettings(e: ChangeEvent<HTMLSelectElement>) {
    console.log(weatherAndGrassSettings);
    setWeatherAndGrassSettings(e.target.value);
  }

  const handleTieBreakerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(tieBreaker);
    setTieBreaker(e.target.value);
  };

  return (
    <div className="new-league-rules-wrapper">
      <div className="new-leagure-rules-title">Set up League settings</div>

      <form className="new-league-rules-form">
        <fieldset className="new-league-rules-fieldset-info">
          <legend>League Info</legend>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input">League Name*</label>
            <input
              required
              type="text"
              value={leagueName}
              id="standard-input"
              className="standard-input"
              onChange={handleLeagueNameChange}
            ></input>
          </div>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input">Number of Participants</label>
            <input
              type="number"
              id="standard-input"
              className="standard-input"
              min={0}
              value={numberOfParticipants}
              onChange={handleNumberOfParticipants}
            ></input>
          </div>
        </fieldset>

        <fieldset className="new-league-rules-fieldset-structure">
          <legend>League Structure</legend>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input">Match Length (minutes)</label>
            <input
              type="number"
              id="standard-input"
              className="standard-input"
              min={0}
              value={matchLength}
              onChange={handleMatchLength}
            ></input>
          </div>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input">League Start Date</label>
            <input
              type="date"
              id="standard-input"
              className="standard-input"
              min={0}
              value={leagueStartDate}
              onChange={handleLeagueStartDate}
            ></input>
          </div>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input">League End Date</label>
            <input
              type="date"
              id="standard-input"
              className="standard-input"
              min={0}
              value={leagueEndDate}
              onChange={handleLeagueEndDate}
            ></input>
          </div>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input-difficulty">
              In-Game Difficulty Level
            </label>

            <select
              name="standard-input"
              id="standard-input-difficulty"
              className="standard-input"
              onChange={handleInGameDifficultyLevel}
              value={inGameDifficultyLevel}
            >
              <option value="Beginner">Beginner</option>
              <option value="Amateur">Amateur</option>
              <option value="Regular">Regular</option>
              <option value="Professional">Professional</option>
              <option value="Top Player">Top Player</option>
              <option value="Superstar">Superstar</option>
              <option value="Legend">Legend</option>
            </select>
          </div>

          <div className="standard-input-wrapper">
            <label htmlFor="standard-input-weather">
              Weather & Grass Settings
            </label>

            <select
              value={weatherAndGrassSettings}
              name="standard-input"
              id="standard-input-weather"
              className="standard-input"
              onChange={handleWeatherAndGrassSettings}
            >
              <option value="default">Default</option>
              <option value="homePlayerChooses">Home Player Chooses</option>
              <option value="normal">Always Normal</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="new-league-rules-fieldset-tie-braker">
          <legend>Tie-Breaker</legend>

          <div>
            <input
              type="radio"
              id="type1"
              name="type1"
              value="GD/GF/H2HR/H2HGF"
              checked={tieBreaker === "GD/GF/H2HR/H2HGF"}
              onChange={handleTieBreakerChange}
            />
            <label htmlFor="type1">GD/GF/H2HR/H2HGF</label>
          </div>

          <div>
            <input
              type="radio"
              id="type2"
              name="type2"
              value="H2HR/H2HGD/GD/GF"
              checked={tieBreaker === "H2HR/H2HGD/GD/GF"}
              onChange={handleTieBreakerChange}
            />
            <label htmlFor="type2">H2HR/H2HGD/GD/GF</label>
          </div>

          <div>
            <input
              type="radio"
              id="type3"
              name="drone"
              value="GD/H2HR/GF/H2HGD"
              checked={tieBreaker === "GD/H2HR/GF/H2HGD"}
              onChange={handleTieBreakerChange}
            />
            <label htmlFor="type3">GD/H2HR/GF/H2HGD</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default NewLeagueRules;
