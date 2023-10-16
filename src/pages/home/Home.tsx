import Sidebar from "../../components/Sidebar";
import "../../styles/home.css";
import NewLeague from "../new-league/NewLeague";
import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { useInvitationIdContext } from "../../hooks/useInvitationIdContext";
function Home() {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const {invitationId} = useInvitationIdContext()

  console.log({invitationId})

  return (
    <>
      <div className="home-container">
        <Sidebar
          sidebarStatus={sidebarStatus}
          setSidebarStatus={setSidebarStatus}
        />

        <ContentWrapper
          sidebarStatus={sidebarStatus}
          setSidebarStatus={setSidebarStatus}
        />
      </div>
    </>
  );
}

export default Home;
