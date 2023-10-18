import ChosenLeagueInterface from "./ChosenLeagueInterface";
import { fullSeasonFixturesInterface } from "./fixtureInterface";
import { Timestamp } from "firebase/firestore";
import ChosenTeamInterface from "./ChosenTeamInterface";
import TeamTableDataInterface from "./TeamTableDataInterface";
export interface LeagueCardInterface {
  fullSeasonFixtures: fullSeasonFixturesInterface;
  fixtureCompletion:{
    [key:string]:boolean
  }
  timestamp: Timestamp;
  createdAt: Timestamp;
  chosenLeague: ChosenLeagueInterface;
  numberOfParticipants: number;
  matchLength: number;
  leagueStartDate: string;
  leagueEndDate: string;
  leagueCreatedBy: string;
  leagueStatus: string;
  inGameDifficultyLevel: string;
  weatherAndGrassSettings: string;
  tieBreaker: string;
  userTeams:[];
  competingTeams: Array<{
    playerId:string;
    playerTeam:ChosenTeamInterface
  }>;
  competingUsers: string[];
  leagueId?:string
  teamTable:TeamTableDataInterface[]
}


export interface QueriedLeagueDataInterface{
  leagueData:LeagueCardInterface  
}