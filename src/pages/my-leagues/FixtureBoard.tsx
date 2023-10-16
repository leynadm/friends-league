import { useContext, useEffect, useState } from "react";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import "../../styles/fixture-board.css";
interface CreatedLeagueInterface {
  leagueData: LeagueCardInterface;
}
import { AuthContext } from "../../context/AuthContext";
import { saveUserFixtureResult } from "../../utils/firebase-functions/saveUserFixtureResult";
import { completeFixtureMatch } from "../../utils/firebase-functions/completeFixtures";

import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill } from 'react-icons/bs';

function FixtureBoard({ leagueData }: CreatedLeagueInterface) {
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 1;
  const {currentUser} = useContext(AuthContext)
  const [editedFixtureResults, setEditedFixtureResults] = useState(
    leagueData.fullSeasonFixtures
  );

  const handleResultChange = (
    fixtureKey: string,
    index: number,
    goals: string,
    sideGoals: string
  ) => {
    
    // Create a copy of the editedFixtureResults
    const updatedResults = { ...editedFixtureResults };

    if(updatedResults[fixtureKey][index].simulated===true){
      alert("already simulated")
    }

    // Ensure the fixtureKey exists in the updatedResults
    if (!updatedResults[fixtureKey]) {
      updatedResults[fixtureKey] = [];
    }

    if (sideGoals === "home") {
      // Update the specific key with the new values
      updatedResults[fixtureKey][index] = {
        ...updatedResults[fixtureKey][index],
        homeGoals: parseInt(goals) || null,
      };
    } else {
      updatedResults[fixtureKey][index] = {
        ...updatedResults[fixtureKey][index],
        awayGoals: parseInt(goals) || null,
      };
    }

    // Check if both homeGoals and awayGoals are not null
    
    if (
      updatedResults[fixtureKey][index].homeGoals !== null &&
      updatedResults[fixtureKey][index].awayGoals !== null
    ) {
      updatedResults[fixtureKey][index] = {
        ...updatedResults[fixtureKey][index],
        simulated: true,
      };
    } 

    console.log(updatedResults)
    // Set the state with the updated object
    setEditedFixtureResults(updatedResults);
  };

  function handleSaveUserFixtureResult() {
    if (leagueData.leagueId) {
      saveUserFixtureResult(leagueData.leagueId, editedFixtureResults);
    }
  }

  useEffect(() => {
    console.log(editedFixtureResults);
  }, [editedFixtureResults]);

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

  function handleCompleteFixture(){

    if(leagueData.leagueId){
      console.log('entering completeFixtureMatch:')
      completeFixtureMatch(
        leagueData.leagueId,
        leagueData.fullSeasonFixtures[`Fixture ${currentPage}`],
        leagueData,
        `Fixture ${currentPage}`
      )
    }
  }

  return (
    <>
      <div className="fixture-board-wrapper">
        <div className="fixture-board">
          {fixtureKeys.slice(startIndex, endIndex).map((fixtureKey) => (
            
            <div key={fixtureKey}>

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
              <div>
                {leagueData.fullSeasonFixtures[fixtureKey].map(
                  (fixture, index) => (
                    <div key={index} className="fixture-entry">
                      <div className="fixture-team-home">{fixture.home}</div>{" "}
                      <img
                        className="fixture-team-img"
                        src={fixture.homeImage}
                        alt=""
                      ></img>{" "}
                      <input
                        disabled={fixture.simulated === true}
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
                        disabled={fixture.simulated === true}
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

          {leagueData.leagueCreatedBy===currentUser.uid &&
          <button
          onClick={() =>
            handleCompleteFixture()
          }
        >
          Complete Fixture
        </button>
          }
          

          <button onClick={() => handleSaveUserFixtureResult()}>
            Save User Result
          </button>
        </div>
      </div>
    </>
  );
}

export default FixtureBoard;
