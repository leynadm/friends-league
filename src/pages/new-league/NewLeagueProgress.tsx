import "../../styles/new-league-progress.css"
interface NewLeagueProgressInterface{
    currentStep:number
}

function NewLeagueProgress({currentStep}:NewLeagueProgressInterface) {
  
return (
    <div className="new-league-progress">
      <div className="new-league-progress-item">1</div>
      <hr/>
      <div className="new-league-progress-item">2</div>
      <hr/>
      <div className="new-league-progress-item">3</div>
      <hr/>
      <div className="new-league-progress-item">4</div>
      <hr/>
      <div className="new-league-progress-item">5</div>

    </div>
  );
}

export default NewLeagueProgress;
