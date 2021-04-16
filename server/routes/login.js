var express = require("express");
var router = express.Router();
const firebase = require("firebase");
const { body, validationResult } = require('express-validator');

// Conditions for validating user data
const userCreationValidators = [
    body('email').isEmail(),
    body('password').notEmpty()
];

/* Endpoint to handle logging into the system */
router.post("/", userCreationValidators, function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    //checks if matching email and password exist on firebase servers
    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((err) => {
            return res.status(401).json({ message: "Either your email or password is incorrect" });
        });
});

module.exports = router;