import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";

async function getLeagueInInvitation(
  leagueId: string,
  setLeague: (leagueData: LeagueCardInterface) => void
) {
  const leagueDocRef = doc(db, "leagues", leagueId); // Use the leagueId as the document ID
  console.log("get league in invitation");
  try {
    const leagueDoc = await getDoc(leagueDocRef);

    if (leagueDoc.exists()) {
      const leagueData = {
        ...leagueDoc.data(),
        leagueId: leagueDoc.id,
      } as LeagueCardInterface;
      setLeague(leagueData);
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    // Handle the error as needed
  }
}

export default getLeagueInInvitation;
