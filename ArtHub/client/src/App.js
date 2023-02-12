import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange, getUserDetails } from "./modules/authManager";
import firebase from 'firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null),
    [role, setRole] = useState("")

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // firebase.auth().currentUser.uid grabs the firebaseUUID -- firebase has many helpers like this
      getUserDetails(firebase.auth().currentUser.uid)
        .then(userObject => {
        })
    } else {
      setRole("")
    }
  }, [isLoggedIn])

 

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} role={role} />
      <ApplicationViews isLoggedIn={isLoggedIn} role={role} />
    </Router>
  );
}

export default App;
