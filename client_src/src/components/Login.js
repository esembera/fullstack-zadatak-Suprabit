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
                    Welcome {user.name} <br />
            </div>
        )

    }else{
        return(
            <div className="card-panel yellow darken-3 center">
                You need to login to access MoviesDB <br />
                <AuthenticationButton />
            </div>
        )
    }
}

export default Login;