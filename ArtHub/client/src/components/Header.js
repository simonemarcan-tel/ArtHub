import React from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { logout } from '../modules/authManager';
import { Navbar } from 'reactstrap';
import { Nav } from 'react';
export default function Header({ isLoggedIn }) {

    return (
        <div>
            <Navbar>
                
                <Nav className="a-navbar" navbar>
                {isLoggedIn &&
                <>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/listings">My Listings</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/search">Search</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/messages">My Messages</NavLink>
                </NavItem>
                </>
                    }
                    {isLoggedIn &&
                    <>
                    <NavItem>
                        <a aria-current="page" className="navlink"
                            style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                    </NavItem>
                    </>
                    }
                    {!isLoggedIn &&
                    <>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                        </NavItem>
                        </>
                        }
                </Nav>
                
                
            </Navbar>
        </div>
    )
}