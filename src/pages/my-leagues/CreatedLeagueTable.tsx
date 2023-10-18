import { useEffect } from "react";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import "../../styles/created-league-table.css"
interface CreatedLeagueInterface {
  leagueData: LeagueCardInterface;
}

function CreatedLeagueTable({ leagueData }: CreatedLeagueInterface) {




  return (
    <>
    
      <div className="created-league-table-wrapper">
      <h2 className="created-league-table-title">League Table</h2>
          <table className="created-league-table">
            <tr className="created-table-header">
              <th>Club</th>
              <th>MP</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
            {leagueData.teamTable.map((team, index) => (
        
            <tr key={index}>            
              <td className="created-league-table-team-column"><div className="created-table-index">{index+1}</div> <img className="created-league-table-img" src={team.image} alt=""></img><div className="created-league-table-team-name"> <div className="created-league-table-team-name">{team.name}</div></div></td>
              <td>{team.MP}</td>
              <td>{team.W}</td>
              <td>{team.D}</td>
              <td>{team.L}</td>
              <td>{team.GF}</td>
              <td>{team.GA}</td>
              <td>{team.GD}</td>
              <td>{team.Pts}</td>
            </tr>
        ))}
        </table>
        
      </div>
       
    </>
  );
}

export default CreatedLeagueTable;
