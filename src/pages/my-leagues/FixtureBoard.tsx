import { useContext, useState } from "react";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import "../../styles/fixture-board.css";
interface CreatedLeagueInterface {
  leagueData: LeagueCardInterface;
  setLeague: (leagueData: LeagueCardInterface | null) => void;
}
import { AuthContext } from "../../context/AuthContext";
import { saveUserFixtureResult } from "../../utils/firebase-functions/saveUserFixtureResult";
import { completeFixtureMatch } from "../../utils/firebase-functions/completeFixtures";

function FixtureBoard({ leagueData,setLeague }: CreatedLeagueInterface) {
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 1;
  const { currentUser } = useContext(AuthContext);

  const handleResultChange = (
    fixtureKey: string,
    index: number,
    goals: string,
    sideGoals: string
  ) => {

    const updatedResults = {...leagueData}
    
    if (sideGoals === "home") {
      // Update the specific key with the new values
      updatedResults.fullSeasonFixtures[fixtureKey][index] = {
        ...updatedResults.fullSeasonFixtures[fixtureKey][index],
        homeGoals: parseInt(goals),
      
      };
      console.log('logging homeGoals:')
      console.log(goals)
      console.log('logging parseInt homeGoals:')
      
      console.log(parseInt(goals))
    
    } else {
      updatedResults.fullSeasonFixtures[fixtureKey][index] = {
        ...updatedResults.fullSeasonFixtures[fixtureKey][index],
        awayGoals: parseInt(goals),
      };
      console.log('logging awayGoals:')
      console.log(goals)
      console.log('logging parseInt awayGoals:')
      
      console.log(parseInt(goals))
    }

    setLeague(updatedResults);
  };

  async function handleSaveUserFixtureResult() {
    if (leagueData.leagueId) {  
      console.log('saving saveuserresult:')
      await saveUserFixtureResult(leagueData.leagueId, leagueData.fullSeasonFixtures,`Fixture ${currentPage}`);
    }

  }

  // Get the keys (fixture numbers) and sort them
  const fixtureKeys = Object.keys(leagueData.fullSeasonFixtures).sort(
    (a, b) => {
      const fixtureNumberA = parseInt(a.split(" ")[1]);
      const fixtureNumberB = parseInt(b.split(" ")[1]);
      return fixtureNumberA - fixtureNumberB;
    }
  );

  const totalPages = Math.ceil(fixtureKeys.length / fixturesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * fixturesPerPage;
  const endIndex = startIndex + fixturesPerPage;

  async function handleCompleteFixture() {

    if (leagueData.leagueId) {  
      await completeFixtureMatch(
        leagueData.leagueId,
        leagueData.fullSeasonFixtures[`Fixture ${currentPage}`],
        leagueData,
        `Fixture ${currentPage}`
      );

    }
  }

const userMatchesCompleted = getUserCompletedMatches()

function getUserCompletedMatches(){

  let matchesCompleted = 0;

  const currentFixtureData = leagueData.fullSeasonFixtures[`Fixture ${currentPage}`]
  console.log({currentFixtureData})
  
  for (let index = 0; index < currentFixtureData.length; index++) {
    const matchFixture = currentFixtureData[index];
    if(matchFixture.playerHome.isPlayer===true && matchFixture.playerAway.isPlayer===true && matchFixture.simulated===true){
      matchesCompleted=matchesCompleted+2
    }else if (matchFixture.isPlayer===true && matchFixture.simulated===true){
      matchesCompleted++
    } 

  } 

  return matchesCompleted
}
  
//console.log({userMatchesCompleted})

  return (
    <>
      <div className="fixture-board-wrapper">
        <div className="fixture-board">
          {fixtureKeys.slice(startIndex, endIndex).map((fixtureKey) => (
            <div key={fixtureKey} className="fixture-board-split">
              <div className="fixture-title-wrapper">
                
                <button
                  className="fixture-board-pagination-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Back
                </button> 
                <h2 className="fixture-title">{fixtureKey}</h2>
                
                <button
                  className="fixture-board-pagination-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button> 
              </div>
              <div className="fixture-board-entries">
                {leagueData.fullSeasonFixtures[fixtureKey].map(
                  (fixture, index) => (
                    <div key={index} className="fixture-entry">
                      <div className="fixture-team-home">{fixture.home}</div>
                      <img
                        className="fixture-team-img"
                        src={fixture.homeImage}
                        alt=""
                      ></img>{" "}

                      <input
                        disabled={
                          !(
                            (leagueData.leagueCreatedBy === currentUser.uid && leagueData.fixtureCompletion[`Fixture ${currentPage}`]===false) ||
                            (((fixture.isPlayer === true &&
                              fixture.playerHome.userId === currentUser.uid) ||
                              fixture.playerAway.userId === currentUser.uid) &&
                              fixture.simulated === false)
                          )
                        }
                        onChange={(e) =>
                          handleResultChange(
                            fixtureKey,
                            index,
                            e.target.value,
                            "home"
                          )
                        }
                        type="number"
                        min={0}
                        defaultValue={
                          fixture.homeGoals !== null && fixture.simulated
                            ? fixture.homeGoals
                            : ""
                        }
                      ></input>{" "}
                      <input
                        disabled={
                          !(
                            (leagueData.leagueCreatedBy === currentUser.uid && leagueData.fixtureCompletion[`Fixture ${currentPage}`]===false) ||
                            (((fixture.isPlayer === true &&
                              fixture.playerHome.userId === currentUser.uid) ||
                              fixture.playerAway.userId === currentUser.uid) &&
                              fixture.simulated === false)
                          )
                        }
                        onChange={(e) =>
                          handleResultChange(
                            fixtureKey,
                            index,
                            e.target.value,
                            "away"
                          )
                        }
                        type="number"
                        min={0}
                        defaultValue={
                          fixture.awayGoals !== null && fixture.simulated
                            ? fixture.awayGoals
                            : ""
                        }
                      ></input>
                      <img
                        className="fixture-team-img"
                        src={fixture.awayImage}
                        alt=""
                      ></img>
                      <div className="fixture-team-away">{fixture.away}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          {leagueData.numberOfParticipants !==
          leagueData.competingUsers.length ? (
            <div>
              {leagueData.numberOfParticipants -
                leagueData.competingUsers.length}{" "}
              more user(s) have to join in order to start!
            </div>
          ) : (
            leagueData.leagueCreatedBy === currentUser.uid &&
            leagueData.numberOfParticipants === userMatchesCompleted && leagueData.fixtureCompletion[`Fixture ${currentPage}`]===false && (
              <button onClick={handleCompleteFixture}>Complete Fixture</button>
            )
          )}




          { leagueData.numberOfParticipants ===
            leagueData.competingUsers.length &&
            leagueData.fixtureCompletion[`Fixture ${currentPage}`] === false 
            
            
            ? (
            <div>
              <button onClick={() => handleSaveUserFixtureResult()} disabled={
!leagueData.fullSeasonFixtures[`Fixture ${currentPage}`].some(
  (fixture) =>
    ((fixture.playerHome.userId === currentUser.uid ||
    fixture.playerAway.userId === currentUser.uid) 
     && fixture.simulated===false
))

              }>
                Save Result
              </button>
            </div>
          ) :  (
            leagueData.fixtureCompletion[`Fixture ${currentPage}`] === true && (
              <div>This fixture has been closed.</div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default FixtureBoard;
