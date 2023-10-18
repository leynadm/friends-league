import { doc, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { db } from "../../config/firebase";
import fixtureInterface from "../../interfaces/fixtureInterface";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";

async function updateFixtureResults(documentId: string, fixtureResults: fixtureInterface[],fixtureNumber:string,standings:TeamTableDataInterface[] ,updatedFixtureCompletion:{[key:string]:boolean}) {
  const leagueDocId = doc(db, "leagues", documentId);
  
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
      teamTable:standings,
      fixtureCompletion:updatedFixtureCompletion
    };

    // Update the document directly
    await updateDoc(leagueDocId, updatedData);
    console.log('FINALLY UPDATED THE FIXTURES!')
    return Promise.resolve()

  }
}
export default updateFixtureResults
