import React, {Component} from 'react';
import AuthenticationButton from './authentication-button';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    

    const { isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
        <div>
            <nav>
            <div className="yellow darken-3 nav-wrapper">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="right"><AuthenticationButton /></li>
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/movie/add'>Add Movie</a></li>

                    {/* <li><nav>
                        <div className="yellow darken-3 nav-wrapper">
                        <form>
                            <div className="input-field">
                            <input id="search" type="search" required/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons left">search</i></label>
                            <i className="material-icons">close</i>
                            </div>
                    </form>
                    </div>
                    </nav></li> */}
                </ul>
                
                </div>
            </nav>
        </div>
        )
    )

}

export default Navbar;