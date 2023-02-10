import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { getUserDetailsById } from "../../modules/userProfileManager";
import { Typography, Tabs, Tab, Grid } from "@mui/material";
import UserListing from "../listings/UserListing";

const UserDetails = () => {
  const [value, setValue] = useState(0);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setUserId(Number(userIdFromLocalStorage));
  }, []);


useEffect(() => {
  if (userId > 0) {
    getUserDetailsById(userId)
      .then((userData) => {
        setUser(userData);
      });
  }
}, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Table>
          <tbody>
            <tr>
              <th>Username</th>
              <td>{user.displayName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </Table>
      </Grid>
      <Grid item xs={8}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My Listings" />
        </Tabs>
        {value === 0 && (
          <div className="tabContainer">
            <UserCard />
          </div>
        )}
        {value === 1 && (
          <div className="tabContainer">
            <UserFavorite/>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default UserDetails