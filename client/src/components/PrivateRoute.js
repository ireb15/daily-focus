import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./Auth/Auth";

/**
 * This component masks the specified route to users that are not authenticated through
 * the firebase application and redirects them to the login screen
 * The API call based authentication process is adapted from:
 * https://gist.github.com/EduVencovsky/f8f6c275f42f7352571c92a59309e31d
 * @param component The page view that the user is trying to access
 * @param rest The rest of the component props
 */
export default function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !isLoading ? (
                    isAuthenticated ? (
                        <Component {...routeProps} />
                    ) : (
                        <Redirect to="/" />
                    )
                ) : (
                    <p>Loading</p>
                )
            }
        />
    );
}
