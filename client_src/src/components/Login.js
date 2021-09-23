import React from "react";
import AuthenticationButton from './authentication-button';
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./index";

const Login = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading){
        return(<Loading />);
    }
    if(isAuthenticated){
        return(
            <div className="card-panel yellow darken-3 center">
                    Welcome {user.name}! <br />
                    Click <a href="/home"> here </a> to get info about more than 1000 movies.
            </div>
        )

    }else{
        return(
            <div>
                <h1 className="center">Welcome to MoviesDB!</h1>
                <div className="card-panel yellow darken-3 center">
                    You need to login in order to access MoviesDB <br /> <br />
                    <AuthenticationButton />
                </div>
            </div>
        )
    }
}

export default Login;