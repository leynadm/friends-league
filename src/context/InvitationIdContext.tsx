import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type InvitationContextType = {
  invitationId: string;
  setInvitationId: Dispatch<SetStateAction<string>>;
};

// Use an empty object with the appropriate type
export const InvitationIdContext = createContext<InvitationContextType | Record<string, never>>({});

export function InvitationIdContextProvider({ children }: { children: ReactNode }) {
  const [invitationId, setInvitationId] = useState("");

  return (
    <InvitationIdContext.Provider value={{ invitationId, setInvitationId }}>
      {children}
    </InvitationIdContext.Provider>
  );
}
