const request = require("supertest");
const app = require("../app");
const firebase = require("firebase");
const database = require("../firebase").database;

const {
    shortPasswordErrorMessage,
    mockToken,
    mockUid,
    invalidEmailErrorMessage,
    unauthorizedEmailPasswordMessage,
} = require("../mocks/mockFirebase");

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

const authorizedPasswordAndEmailInput = {
    email: "test@gmail.com",
    password: "123456",
};

const unauthorizedAccountInput = {
    email: "test@gmail.com",
    password: "1234567",
};

unauthorizedEmailPasswordMessage = {
    "message": "Either your email or password is incorrect"
}

describe("login user endpoint  ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("when an authorised email and password is given it returns 200 and makes calls to firebase", async () => {
        const response = await request(app)
            .post("/login")
            .set("Accept", "application/json")
            .send(authorizedPasswordAndEmailInput);

        // Tests validation
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(token);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
            authorizedPasswordAndEmailInput.email,
            authorizedPasswordAndEmailInput.password
        );
    });
    it("when an unauthorised password/email is given an error messgae is returned with a status of 401 ", async () => {
        const response = await request(app)
            .post("/login")
            .set("Accept", "application/json")
            .send(unauthorizedAccountInput);

        // Tests validation
        expect(response.status).toEqual(401);
        expect(response.body).toEqual(unauthorizedEmailPasswordMessage);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
            unauthorizedAccountInput.email,
            unauthorizedAccountInput.password
        );
    });
});
