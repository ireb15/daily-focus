const request = require("supertest");
const app = require("../app");
const firebase = require("firebase");
const database = require("../firebase").database;
const {
    shortPasswordErrorMessage,
    mockToken,
    mockUid,
    invalidEmailErrorMessage,
} = require("../mocks/mockFirebase");
const { token } = require("morgan");

jest.mock("firebase", () => {
    const { mockFirebase } = require("../mocks/mockFirebase");
    return mockFirebase;
});

jest.mock("../firebase", () => {
    const mockDatabase = require("../mocks/mockDatabase");
    return {
        database: mockDatabase,
    };
});

const validPasswordAndEmailInput = {
    email: "test@gmail.com",
    password: "123456",
};

const invalidPasswordInput = {
    email: "test@gmail.com",
    password: "12345",
};

const invalidEmailInput = {
    email: "",
    password: "123456",
};

mockToken = {
    "message": "The email address is already in use by another account."
};

shortPasswordErrorMessage = {
    "errors": [
        {
            "value": "12345",
            "msg": "Invalid value",
            "param": "password",
            "location": "body"
        }
    ]
};

invalidEmailErrorMessage = {
    "errors": [
        {
            "value": "",
            "msg": "Invalid value",
            "param": "email",
            "location": "body"
        }
    ]
};

describe("signup user endpoint  ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("when a valid email and password is given it returns 201 and makes calls to firebase", async () => {
        const response = await request(app)
            .post("/signup")
            .set("Accept", "application/json")
            .send(validPasswordAndEmailInput);

        // Tests validation
        expect(response.status).toEqual(201);
        expect(response.body).toEqual(mockToken);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
            validPasswordAndEmailInput.email,
            validPasswordAndEmailInput.password
        );

        //tests database calls
        expect(database.ref).toHaveBeenCalledWith("/");
        expect(database.ref().update).toHaveBeenCalledWith({
            [mockUid]: {
                email: validPasswordAndEmailInput.email,
            },
        });
    });

    it("when a invalid password less than 6 chars is given, it returns 400 and does not add user to database", async () => {
        const response = await request(app)
            .post("/signup")
            .set("Accept", "application/json")
            .send(invalidPasswordInput);

        // Tests validation
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(shortPasswordErrorMessage);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
            invalidPasswordInput.email,
            invalidPasswordInput.password
        );

        //tests no database calls have been made
        expect(database.ref).toHaveBeenCalledTimes(0);
    });

    it("when a invalid email is given, it returns 400 and does not add user to database", async () => {
        const response = await request(app)
            .post("/signup")
            .set("Accept", "application/json")
            .send(invalidEmailInput);

        // Tests express validation
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(invalidEmailErrorMessage);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
            invalidEmailInput.email,
            invalidEmailInput.password
        );

        //tests no database calls have been made
        expect(database.ref).toHaveBeenCalledTimes(0);
    });
});
