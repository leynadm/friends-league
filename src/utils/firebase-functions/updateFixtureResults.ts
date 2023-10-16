import { doc, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { db } from "../../config/firebase";
import fixtureInterface from "../../interfaces/fixtureInterface";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";

async function updateFixtureResults(documentId: string, fixtureResults: fixtureInterface[],fixtureNumber:string,standings:TeamTableDataInterface[]) {
  const leagueDocId = doc(db, "leagues", documentId);

  console.log('logging standings in updateFixtureResults:')
  console.log(standings)

  // Fetch the existing data
  const leagueDoc = await getDoc(leagueDocId);
  const existingData = leagueDoc.data();
  const fixtureField = fixtureNumber
  // Update the specific property within fullSeasonFixtures
  if (existingData) {
    const updatedFullSeasonFixtures = {
      ...existingData.fullSeasonFixtures,
      [fixtureField]: fixtureResults,
    };

    // Create an object to update
    const updatedData: DocumentData = {
      ...existingData,
      fullSeasonFixtures: updatedFullSeasonFixtures,
      teamTable:standings
    };

    // Update the document directly
    await updateDoc(leagueDocId, updatedData);
  }
}
export default updateFixtureResults
