import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

/**
 * This component masks the specified route to users that are not authenticated through
 * the firebase application and redirects them to the login screen
 * @param component The page view that the user is trying to access
 * @param rest The rest of the component props
 */
export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useContext(/* token? */);

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                currentUser ? <Component {...routeProps} /> : <Redirect to="/" />
            }
        />
    );
}
