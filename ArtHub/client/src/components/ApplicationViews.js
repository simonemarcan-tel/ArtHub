import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserArtList from "./listings/UserListing";
import EditListing from "./listings/EditListing";
//import ListingForm from "./listings/ListingForm";
import ArtAddListing  from "./listings/ListingForm";
export default function ApplicationViews({ isLoggedIn }) {
    return (
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={isLoggedIn ? <Login /> : <Navigate to="/login" />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
  
  
  
            <Route path="users">
              <Route index
                element={isLoggedIn ? <Login />
                  : <Navigate to="/login" />} />
            </Route>
            <Route path="userlistings" element={isLoggedIn ? <UserArtList /> : <Navigate to="/login"/>} />
            <Route path="addlisting" element={isLoggedIn ? <ArtAddListing /> : <Navigate to="/listingform" />} />
            <Route path="edit/*" element={isLoggedIn ? <EditListing /> : <Navigate to="/login" />} />
  
            <Route path="*" element={<p>Empty!</p>} />
          </Route>
        </Routes>
      </main>
    ) }