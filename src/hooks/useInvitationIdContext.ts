import { useContext } from "react";
import { InvitationIdContext } from "../context/InvitationIdContext";

export function useInvitationIdContext() {
    const context = useContext(InvitationIdContext);
    if (!context) {
      throw new Error(
        "useInvitationIdContext must be used within an InvitationIdContextProvider"
      );
    }
    return context;
  }