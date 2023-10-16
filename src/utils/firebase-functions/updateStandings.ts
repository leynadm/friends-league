import { doc, updateDoc} from "firebase/firestore";
import { db } from "../../config/firebase";
import TeamTableDataInterface from "../../interfaces/TeamTableDataInterface";

async function updateStandings(
  documentId: string,
  standings: TeamTableDataInterface[]
) {
  const leagueDocId = doc(db, "leagues", documentId);

  // Update the document directly
  await updateDoc(leagueDocId, { teamTable: standings });
}

export default updateStandings;
