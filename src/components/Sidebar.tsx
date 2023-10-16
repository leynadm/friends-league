import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import SidebarInterface from "../interfaces/SidebarInterface";
import { getAuth,signOut } from "firebase/auth";
function Sidebar({ sidebarStatus, setSidebarStatus }: SidebarInterface) {
  function toggleBtnActive() {
    setSidebarStatus(!sidebarStatus);
  }

  const navigate = useNavigate();

  function handleClickCreateLeague() {
    navigate("create-league");
  }

  function handleClickMyLeagues() {
    navigate("my-leagues");
  }

  function handleClickStats() {
    navigate("statistics");
  }

  function handleLogOut(){

    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }

  return (
    <>
      <div className={sidebarStatus ? "sidebar active" : "sidebar"}>
        <div className="top">
          <div className="logo">
            <i className="bx bxl-codepen"></i>
            <span>Friends League</span>
          </div>
          <i className="bx bx-menu" id="btn" onClick={toggleBtnActive}></i>
        </div>
        <div className="user">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/friends-league-51148.appspot.com/o/la_liga_logos%2Fbarcelona.png?alt=media&token=bbb0adcc-1524-44a1-a3d7-a6c361488c36&_gl=1*1fe4097*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5NjUwNjQ0MS4xNS4xLjE2OTY1MDY0NTcuNDQuMC4w"
            alt=""
            className="user-img"
          ></img>
          <div>
            <p className="bold">Daniel M.</p>
            <p className="bold">Creator</p>
          </div>
        </div>

        <ul>
          <li>
            <a onClick={handleClickCreateLeague}>
              <i className="bx bx-add-to-queue"></i>
              <span className="nav-item">New</span>
            </a>
            {/* 
            <span className="tooltip">New</span>
           */}
          </li>

          <li>
            <a onClick={handleClickMyLeagues}>
              <i className="bx bx-football"></i>
              <span className="nav-item">Leagues</span>
            </a>
            {/* 
            <span className="tooltip">Leagues</span>
           */}
          </li>
          <li>
            <a  onClick={handleClickStats}>
              <i className="bx bx-stats"></i>
              <span className="nav-item">Statistics</span>
            </a>
            {/* 
            <span className="tooltip">Statistics</span>
           */}
          </li>
          <li>
            <a>
              <i className="bx bxs-trophy"></i>
              <span className="nav-item">Trophy</span>
            </a>
            {/* 
            <span className="tooltip">Trophy</span>
           */}
          </li>
          <li>
            <a>
              <i className="bx bxs-group"></i>
              <span className="nav-item">Friends</span>
            </a>
            {/* 
            <span className="tooltip">Friends</span>
           */}
          </li>

          <li>
            <a>
              <i className="bx bx-user-circle"></i>
              <span className="nav-item">Profile</span>
            </a>
            {/* 
            <span className="tooltip">Profile</span>
           */}
          </li>

          <li>
            <a>
              <i className="bx bx-log-out" onClick={handleLogOut}></i>
              <span className="nav-item">Logout</span>
            </a>
            {/* 
            <span className="tooltip">Logout</span>
           */}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
