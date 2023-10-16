import "./leaguebtn.css";

interface LeagueBtnInterface {
  chosenLeague: string;
  leagueLogo: string;
  onClick: () => void; // Optional function prop 
}

function LeagueBtn({ chosenLeague, leagueLogo,onClick }: LeagueBtnInterface) {
  return (
    <>
      <button className="league-button" role="button" onClick={onClick}>
        <img className="league-button-image" src={leagueLogo} alt=""></img>
      </button>
    </>
  );
}

export default LeagueBtn;
