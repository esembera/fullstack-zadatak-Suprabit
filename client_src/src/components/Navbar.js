import React from 'react';
import AuthenticationButton from './authentication-button';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    

    const { isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
        <div>
            <nav>
            <div className="yellow darken-3 nav-wrapper">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/movie/add'>Add Movie</a></li>
                </ul>
                <ul className="right">
                    <li>
                        <AuthenticationButton />
                    </li>
                </ul>               
                </div>
            </nav>
        </div>
        )
    )

}

export default Navbar;