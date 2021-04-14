import React, { useState, Fragment } from "react";
import { Button, makeStyles, Snackbar, TextField } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

import FocusLogo from "../../images/focus-logo.svg";
import styles from "./style.module.scss";

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 15,
        },
        "& .MuiInputLabel-root": {
            fontSize: "1.25rem",
            color: "#7D7D7D",
            fontFamily: "'Ropa Sans', sans-serif",
        },
    },
    buttonRoot: {
        background: "#30A0F5",
        borderRadius: 50,
        padding: "4px 25px",
        width: "100%",
    },
    label: {
        textTransform: "capitalize",
        fontFamily: "'Ropa Sans', sans-serif",
        fontSize: "1.75rem",
    },
});

export default function LandingPage() {
    const classes = useStyles();
    const history = useHistory();
    const [signupMsgboxOpen, setSignupMsgboxOpen] = useState(false);
    const [signupMsg, setSignupMsg] = useState("Sign up failed, please try again later");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fetchSignup = (username, password) => {
        console.log(username);
        console.log(password);
        let signupSuccess = true;
        fetch("http://localhost:9000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
            referrerPolicy: "no-referrer",
        })
            .then((response) => {
                if (!response.ok) {
                    signupSuccess = false;
                }
                return response.json();
            })
            .then((data) => {
                // Signup unsuccessful
                if (!signupSuccess && data.message) {
                    setSignupMsg(data.message);
                    setSignupMsgboxOpen(true);
                    return Promise.reject("Server returned non-200 response");
                }

                // Signup successful
                console.log(data);
                setSignupMsg("Sign up succesful");
                setSignupMsgboxOpen(true);
                history.push("/login");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const submitSignup = (e) => {
        e.preventDefault();
        fetchSignup(email, password);
    };

    const handleSignupMsgboxClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSignupMsgboxOpen(false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.focusIntro}>
                    <img className={styles.focusLogo} src={FocusLogo} alt="FOCUS" />
                    <p>
                        Daily Focus is a dashboard web app that surfaces vital at-a-glance
                        information to enable you to know what you need to know and get on with your
                        day.
                    </p>
                </div>
                <div className={styles.signUpContainer}>
                    <h1>Create new account!</h1>
                    <form onSubmit={submitSignup}>
                        <TextField
                            style={{ paddingBottom: 20 }}
                            classes={{ root: classes.root }}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Email address"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            style={{ paddingBottom: 20 }}
                            classes={{ root: classes.root }}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            classes={{ root: classes.buttonRoot, label: classes.label }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Link to="/login">Already have an account? Sign in</Link>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={signupMsgboxOpen}
                autoHideDuration={5000}
                message={signupMsg}
                onClose={handleSignupMsgboxClose}
                action={
                    <Fragment>
                        <Button color="inherit" size="small" onClick={handleSignupMsgboxClose}>
                            CLOSE
                        </Button>
                    </Fragment>
                }
            />
        </div>
    );
}
