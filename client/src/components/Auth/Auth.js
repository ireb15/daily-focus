import React, { useState, useEffect } from "react";
import createPersistedState from "use-persisted-state";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const useTokenState = createPersistedState("token");
    const [token] = useTokenState();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () =>
        axios({
            method: "post",
            url: "http://localhost:9000/verifyToken",
            headers: { authorization: token },
        })
            .then((response) => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => setIsAuthenticated(false))
            .then(() => setIsLoading(false));

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
