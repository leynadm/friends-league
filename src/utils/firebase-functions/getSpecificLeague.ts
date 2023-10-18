import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
async function getSpecificLeague(leagueId: string) {
  const leagueDocRef = doc(db, "leagues", leagueId);

  try {
    const leagueDoc = await getDoc(leagueDocRef);

    if (leagueDoc.exists()) {
      // Extract the league data from the document
      const leagueData = { ...leagueDoc.data(), leagueId }; // Add "leagueId" with the specified ID
      console.log('Logging league data inside getSpecificLeagues:');
      console.log(leagueData);
      return leagueData as LeagueCardInterface;
    } else {
      // Handle the case where the league doesn't exist
      console.error("The specified league does not exist.");
      return null; // You can return null or handle the error as needed
    }
  } catch (error) {
    console.error("Error retrieving the league:", error);
    return null; // Handle any errors and return data accordingly
  }
}

export default getSpecificLeague;
