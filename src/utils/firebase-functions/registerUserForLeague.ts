import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ChosenTeamInterface from "../../interfaces/ChosenTeamInterface";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
async function registerUserForLeague(
  userId: string,
  documentId: string,
  chosenTeam: ChosenTeamInterface
) {
  const leagueDocId = doc(db, "leagues", documentId);

  // Fetch the existing data
  const leagueDoc = await getDoc(leagueDocId);
  const leagueData = leagueDoc.data() as LeagueCardInterface;

  for (const [key, value] of Object.entries(leagueData.fullSeasonFixtures)) {
    for (let index = 0; index < value.length; index++) {
      const matchFixture = value[index];

      if (matchFixture.home === chosenTeam.name) {
        matchFixture.isPlayer = true;
        matchFixture.playerHome = {
          userId: userId,
          userImage: "",
          isPlayer: true,
        };
      } else if (matchFixture.away === chosenTeam.name) {
        matchFixture.isPlayer = true;
        matchFixture.playerAway = {
          userId: userId,
          userImage: "",
          isPlayer: true,
        };
      }
    }
  }

  console.log("logging leagueData data inside registerUserForLeague:");
  console.log(leagueData);

  const competingTeamObj = {
    playerId: userId,
    playerTeam: chosenTeam,
  };

 
    await updateDoc(leagueDocId,{

        competingUsers:arrayUnion(userId),
        competingTeams:arrayUnion(competingTeamObj),
        fullSeasonFixtures:leagueData.fullSeasonFixtures
    }) 
}

export default registerUserForLeague;
