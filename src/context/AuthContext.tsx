import { useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
// Create the context to hold the data and share it among all components
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>({
  currentUser: null,
  userCredential: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Set the current user in case the user is already logged in
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);
  const [currentUserData, setCurrentUserData] = useState<undefined>(
    undefined
  );
  const [loginFetchTrigger, setLoginFetchTrigger] = useState(false);
  const [refreshUserDataCounter, setRefreshUserDataCounter] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setCurrentUser(user);
        console.log(`Setting current user ${user}`)
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log('checking if user is inside Auth')

        console.log(docSnap)
        if (docSnap.exists()) {
          const userData = docSnap.data() //as User
          console.log(userData)
        } else {

            //set data
          
        }

        setLoginFetchTrigger(true);
      }
    });

    return () => {
      unsubscribe(); // Add a return function to unsubscribe the listener
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentUser,refreshUserDataCounter]);

  async function fetchData() {
    if (currentUser === null) {
      return;
    }

    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() //as User;
        console.log('docSnap for userData exists:')
        console.log(userData)
        //setCurrentUserData(userData);
      }
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  }

  const triggerDataRefresh = () => {
    setRefreshUserDataCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserData,
        setCurrentUserData,
        loginFetchTrigger,
        refreshUserDataCounter,         // Pass the counter to the context
        triggerDataRefresh,  
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
