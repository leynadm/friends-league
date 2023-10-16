import ChosenTeamInterface from "./ChosenTeamInterface";
import ChosenLeagueInterface from "./ChosenLeagueInterface";
interface NewLeagueSettingsInterface {
  newLeagueSettings: {
    chosenLeague: ChosenLeagueInterface;
    setChosenLeague: (status: ChosenLeagueInterface) => void;
    chosenTeam: ChosenTeamInterface;
    setChosenTeam: (status: ChosenTeamInterface) => void;
    leagueName: string;
    setLeagueName: (status: string) => void;
    numberOfParticipants: number;
    setNumberOfParticipants: (status: number) => void;
    matchLength: number;
    setMatchLength: (status: number) => void;
    leagueStartDate:  string;
    setLeagueStartDate: (status:  string) => void;
    leagueEndDate:  string;
    setLeagueEndDate: (status: string) => void;
    inGameDifficultyLevel: string;
    setInGameDifficultyLevel: (status: string) => void;
    weatherAndGrassSettings: string;
    setWeatherAndGrassSettings: (status: string) => void;
    tieBreaker: string;
    setTieBreaker: (status: string) => void;
  };
}

export default NewLeagueSettingsInterface;

export interface LeagueDataSettingsInterface{
  chosenLeague: ChosenLeagueInterface;
  chosenTeam: ChosenTeamInterface;
  leagueName: string;
  numberOfParticipants: number;
  matchLength: number;
  leagueStartDate:  string;
  leagueEndDate:  string;
  inGameDifficultyLevel: string;
  weatherAndGrassSettings: string;
  tieBreaker: string;
  fixtureCompletion: {
    [key: string]: boolean;
  };

}