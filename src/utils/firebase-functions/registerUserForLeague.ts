import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ChosenTeamInterface from "../../interfaces/ChosenTeamInterface";

async function registerUserForLeague(userId:string, documentId:string, chosenTeam:ChosenTeamInterface) {

    console.log('inside regusterUserForLeague')
    const competingTeamObj ={
        playedId:userId,
        playerTeam:chosenTeam
    }

    const leagueDocId = doc(db, "leagues", documentId);

    await updateDoc(leagueDocId,{

        competingUsers:arrayUnion(userId),
        competingTeams:arrayUnion(competingTeamObj)
        
    })

}

export default registerUserForLeague