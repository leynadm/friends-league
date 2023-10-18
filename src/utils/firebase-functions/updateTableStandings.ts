import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { fullSeasonFixturesInterface } from "../../interfaces/fixtureInterface";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";

export async function updateTableStandings(
  documentId: string,
  leagueData: LeagueCardInterface
) {
  const standings: TeamTableDataInterface[] = leagueData.teamTable;

   const leagueDocId = doc(db, "leagues", documentId);

  //console.log(leagueData)

  for (const [key, value] of Object.entries(leagueData.fullSeasonFixtures)) {
    //console.log(`${key}: ${value}`);

    for (let index = 0; index < value.length; index++) {
      const matchFixture = value[index];
      //console.log(matchFixture);

      if(matchFixture.homeGoals === null || matchFixture.awayGoals===null){
        return
      }
      
      if (matchFixture.simulated === true) {
        
        const homeTeamStanding = standings.find(
          (entry) => entry.name === matchFixture.home
        );
        const awayTeamStanding = standings.find(
          (entry) => entry.name === matchFixture.away
        );

        if (homeTeamStanding && awayTeamStanding) {
          console.log('inside homeTeamStandings and awayTeamStandings')
          homeTeamStanding.GF += matchFixture.homeGoals;
          console.log('logging GF and homeGoals:')
          console.log(homeTeamStanding.GF)
          console.log(matchFixture.homeGoals)
          
          homeTeamStanding.GA += matchFixture.awayGoals;
          awayTeamStanding.GF += matchFixture.awayGoals;
          awayTeamStanding.GA += matchFixture.homeGoals;

          if (matchFixture.homeGoals > matchFixture.awayGoals) {
            homeTeamStanding.W++;
            awayTeamStanding.L++;
          } else if (matchFixture.homeGoals < matchFixture.awayGoals) {
            homeTeamStanding.L++;
            awayTeamStanding.W++;
          } else {
            homeTeamStanding.D++;
            awayTeamStanding.D++;
          }

          homeTeamStanding.Pts +=
            matchFixture.homeGoals > matchFixture.awayGoals
              ? 3
              : matchFixture.homeGoals === matchFixture.awayGoals
              ? 1
              : 0;
          awayTeamStanding.Pts +=
            matchFixture.awayGoals > matchFixture.homeGoals
              ? 3
              : matchFixture.awayGoals === matchFixture.homeGoals
              ? 1
              : 0;
        }
      }
    }
  }

  console.log(standings)
  // Sort standings based on points, goal difference, etc.
  standings.sort((a, b) => {
    if (a.Pts !== b.Pts) {
      return b.Pts - a.Pts; // Sort by Pts
    } else {
      const goalDifferenceA = a.GF - a.GA;
      const goalDifferenceB = b.GF - b.GA;
      if (goalDifferenceA !== goalDifferenceB) {
        return goalDifferenceB - goalDifferenceA; // Sort by goal difference
      } else {
        return b.GF - a.GF; // Sort by goals scored
      }
    }
  });

  // Update the document directly
 
  try {
    await updateDoc(leagueDocId, {teamTable:standings});
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }

}
