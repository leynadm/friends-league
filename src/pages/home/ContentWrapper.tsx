import { Routes, Route } from "react-router-dom";
import "../../styles/content-wrapper.css";
import SidebarInterface from "../../interfaces/SidebarInterface";
import NewLeague from "../new-league/NewLeague";
import MyLeagues from "../my-leagues/MyLeagues";
import CreatedLeague from "../my-leagues/CreatedLeague";
function ContentWrapper({ sidebarStatus, setSidebarStatus }: SidebarInterface) {
  return (
    <div
      className={sidebarStatus ? "content-wrapper active" : "content-wrapper"}
    >
      <Routes>
        <Route path="/create-league/" index element={<NewLeague />} />
        <Route path="/my-leagues/" index element={<MyLeagues />} />
        <Route path="/my-leagues/created-league/:id" element={<CreatedLeague />} />
        
      </Routes>
    </div>
  );
}

export default ContentWrapper;
