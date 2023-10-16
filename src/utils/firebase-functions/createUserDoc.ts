import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

async function createUserDoc(userID: string, fullname: string | null) {
  let firstName = "";
  let lastName = "";

  if (fullname) {
    if (fullname.includes(" ")) {
      const nameParts = fullname.split(" ");
      const numNameParts = nameParts.length;

      if (numNameParts === 1) {
        firstName = nameParts[0];
      } else if (numNameParts >= 2) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      }
    } else {
      firstName = fullname;
    }
  }

  try {
    const userDoc = await getDoc(doc(db, "users", userID));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", userID), {
        firstName: firstName,
        lastName: lastName,
        verified: false,
        fullname: [
          firstName.toLocaleLowerCase(),
          lastName.toLocaleLowerCase(),
          fullname?.toLocaleLowerCase(),
        ],
        profileImage: "",
        privateAccount: false,
        blocked: [],
        favoriteClub: "Free Agent",
        favoriteLeague: "",
        achievements: [],
        expertiseRating: "",
        playingExperience: 0,
        discordProfile: "",
        parsecProfile: "",
      });
    }
  } catch (error) {
    // Handle the error here
    console.error("Error creating followers feed document:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default createUserDoc;
