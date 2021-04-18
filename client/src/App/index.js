import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../components/Auth/Auth";
import "./style.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/signup" />
                    </Route>

                    <Route exact path="/signup">
                        <LandingPage />
                    </Route>

                    <Route exact path="/login">
                        <LoginPage />
                    </Route>

                    <PrivateRoute component={HomePage} path="/home" exact />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
