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
    onLoginStatusChange(setIsLoggedIn); },
  []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails(firebase.auth().currentUser.uid)
      .then(userObject => {

      })
    } else{
      setRole("")
    }
  }, [isLoggedIn])

  if (isLoggedIn === null) {
    return <Listings className="listings" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} role={role} />
      <ApplicationViews isLoggedIn={isLoggedIn} role={role} />
    </Router>
   /<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> 
  );
}

export default App;
