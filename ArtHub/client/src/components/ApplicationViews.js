import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function ApplicationViews({ isLoggedIn }) {
    return (
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={isLoggedIn ? <ArtListings /> : <Navigate to="/login" />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
  
  
  
            <Route path="users">
              <Route index
                element={isLoggedIn ? <ArtListings />
                  : <Navigate to="/login" />} />
            </Route>
            <Route path="userlistings" element={isLoggedIn ? <UserListings /> : <Navigate to="/login"/>} />
            <Route path="addlisting" element={isLoggedIn ? <ListingForm /> : <Navigate to="/login" />} />
            <Route path="edit/*" element={isLoggedIn ? <EditListing /> : <Navigate to="/login" />} />
  
            <Route path="*" element={<p>Empty!</p>} />
          </Route>
        </Routes>
      </main>
    ) }