import { Route  } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Redirect } from "react-router-dom";

const LoginProtectedRoute = ({component:Component,...rest    }) =>{
    const authCtx = useContext(AuthContext);
    
    return(
        <Route
            {...rest}
            render = {()=> !authCtx.isLoggedIn ?(
                <Component></Component>
            ) : (
                <Redirect to="/"></Redirect>
            )}
        />
    )
}

export default LoginProtectedRoute;