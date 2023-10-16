import { addDoc, collection, serverTimestamp, Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LeagueDataSettingsInterface } from "../../interfaces/NewLeagueSettingsInterface";
import { fullSeasonFixturesInterface } from "../../interfaces/fixtureInterface";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";


async function createNewLeague(resultObject: fullSeasonFixturesInterface, leagueSettingsObj: LeagueDataSettingsInterface, userId: string,teamTableData:TeamTableDataInterface[]) {
  try {
    const leaguesCollectionRef = collection(db, "leagues");

    const serverTimestampObj = serverTimestamp();
    const timestamp = Timestamp.fromMillis(Date.now());
 
    const newLeagueDocRef = await addDoc(leaguesCollectionRef, {
      fullSeasonFixtures: resultObject,
      timestamp: timestamp,
      createdAt: serverTimestampObj,
      chosenLeague: leagueSettingsObj.chosenLeague,
      numberOfParticipants: leagueSettingsObj.numberOfParticipants,
      matchLength: leagueSettingsObj.matchLength,
      leagueStartDate: leagueSettingsObj.leagueStartDate,
      leagueEndDate: leagueSettingsObj.leagueEndDate,
      leagueCreatedBy:userId,
      leagueStatus:"Registrations Open",
      inGameDifficultyLevel: leagueSettingsObj.inGameDifficultyLevel,
      weatherAndGrassSettings: leagueSettingsObj.weatherAndGrassSettings,
      tieBreaker: leagueSettingsObj.tieBreaker,
      userTeams:arrayUnion(leagueSettingsObj.chosenTeam.id),
      competingTeams: [
        {
          playerTeam: leagueSettingsObj.chosenTeam,
          playerId: userId,
        },
      ],
      competingUsers: arrayUnion(userId),
      teamTable:teamTableData,
      fixtureCompletion:leagueSettingsObj.fixtureCompletion
    });

    console.log("New league document ID:", newLeagueDocRef.id);
  } catch (error) {
    // Handle the error here
    console.error("Error creating league document:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default createNewLeague;
