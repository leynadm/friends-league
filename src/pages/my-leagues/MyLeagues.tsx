import { useContext, useEffect, useState } from "react";
import getUserLeagues from "../../utils/firebase-functions/getUserLeagues";
import { AuthContext } from "../../context/AuthContext";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import { LeagueCardInterface } from "../../interfaces/LeagueCardInterface";
import { useNavigate } from "react-router";
import "../../styles/my-leagues.css";
function MyLeagues() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userLeagues, setUserLeagues] = useState<LeagueCardInterface[]>([]);


  useEffect(() => {
    getUserLeagues(currentUser.uid, setUserLeagues);
  }, []);

  return (
    <>
      <h2 className="my-leagues-title">
        Your leagues <i className="bx bxs-hourglass-top"></i>
      </h2>
      <div className="my-leagues-wrapper">
        {userLeagues.map((league: LeagueCardInterface, index: number) => (
          <LeagueCard
            key={index}
            league={league}
            onClick={() =>
              navigate(`created-league/${league.leagueId}`)}
          />
        ))}
      </div>
    </>
  );
}

export default MyLeagues;
