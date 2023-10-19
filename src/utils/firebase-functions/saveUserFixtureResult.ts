import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { fullSeasonFixturesInterface } from "../../interfaces/fixtureInterface";
export async function saveUserFixtureResult(
  documentId: string,
  fixtureResults: fullSeasonFixturesInterface,
  fixtureNumber: string
) {
  const leagueDocId = doc(db, "leagues", documentId);

  for (const [key, value] of Object.entries(fixtureResults)) {
    if (fixtureNumber === key) {
      for (let index = 0; index < value.length; index++) {
        const matchFixture = value[index];
        console.log(matchFixture)
        
        if (

          matchFixture.playerHome.isPlayer === true ||
          matchFixture.playerAway.isPlayer === true ||
          matchFixture.isPlayer === true
        ) {
          if (
            matchFixture.awayGoals !== null &&
            matchFixture.homeGoals !== null
          ) {
            matchFixture.simulated = true;
          }

          if((matchFixture.homeGoals!==null && matchFixture.awayGoals===null) || matchFixture.awayGoals!==null && matchFixture.homeGoals===null){
            console.log('invalid score added')
            return
          }
        }
      }
    }
  }
  console.log("logging fixture results after ammendmants:");

  console.log(fixtureResults);

  // Create an object to update
  const updatedData = {
    fullSeasonFixtures: fixtureResults,
  };

  // Update the document directly
  try {
    await updateDoc(leagueDocId, updatedData);
    //console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
