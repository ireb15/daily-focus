import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import axios from "axios";

/**
 * This component masks the specified route to users that are not authenticated through
 * the firebase application and redirects them to the login screen
 * The API call based authentication process is adapted from:
 * https://gist.github.com/EduVencovsky/f8f6c275f42f7352571c92a59309e31d
 * @param component The page view that the user is trying to access
 * @param rest The rest of the component props
 */
export default function PrivateRoute({ component: Component, ...rest }) {
    const [authenticated, setAuthenticated] = useState(undefined);

    const useTokenState = createPersistedState("token");
    const [token] = useTokenState();

    useEffect(() => {
        async function verifyToken() {
            const result = await axios({
                method: "post",
                url: "http://localhost:9000/verifyToken",
                headers: { authorization: token },
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    return true;
                }
                return false;
            });
            console.log("result: " + result);
            return result;
        }
        setAuthenticated(verifyToken());
    }, [token]);

    if (authenticated === undefined) {
        return <>authenticating...</>;
    }

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                authenticated ? <Component {...routeProps} /> : <Redirect to="/" />
            }
        />
    );
}
