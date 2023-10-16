import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
  } from "firebase/firestore";
  import { db } from "../../config/firebase";

  async function getUserLeagues(userId: string, setUserLeagues: (leagueData: any[]) => void) {
    const leaguesCollectionRef = collection(db, "leagues");
  
    const leaguesQuery = query(
      leaguesCollectionRef,
      orderBy("createdAt", "desc"),
      where("competingUsers", "array-contains", userId),
      limit(3)
    );
    const leaguesSnapshot = await getDocs(leaguesQuery);
  
    // Extract the post data from the query snapshot
    const leaguesData = leaguesSnapshot.docs.map((doc) => {
      const leagueData = { ...doc.data(), leagueId: doc.id }; // Add "leagueId" with the document ID
      return leagueData;
    });
  
    setUserLeagues(leaguesData);
  }
  

export default getUserLeagues