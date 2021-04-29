import React from 'react'
import { Nav, Navbar, NavItem,Button } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import firebase from "../firebase/firebase";

const Header = () => {
    const history = useHistory();
    const handleLogout = () => {
        console.log(`click`)
        firebase.auth().signOut();
        history.push("/") 
    }
    return (
        <div>
             <div className="home">
            <h2>Welcome to firebase demo </h2>
            <Navbar dark expand="md">
                    <div className="container">
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/realtimedb'> RealtimeDB</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/firestore'> Firestore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/storage'> Storage</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={handleLogout}>
                                        <span className="fa fa-sign-out fa-lg">Logout</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                    </div>
                </Navbar>
            </div>
        </div>
    )
}

export default Header
