import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { fullSeasonFixturesInterface } from "../../interfaces/fixtureInterface";
export async function saveUserFixtureResult(documentId: string, fixtureResults: fullSeasonFixturesInterface) {
  const leagueDocId = doc(db, "leagues", documentId);

  // Create an object to update
  const updatedData = {
    fullSeasonFixtures: fixtureResults
  };

  // Update the document directly
  try {
    await updateDoc(leagueDocId, updatedData);
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
