const request = require("supertest");
const app = require("./../../app");
const database = require("./../../firebase").database;

let NZGmt = 13;
let todaysDate = new Date();
todaysDate.setHours(todaysDate.getHours() + NZGmt);
todaysDate = todaysDate.toISOString().slice(0, 10);

const expectedAfterDeleteTodo = [
    {
        date: "2099-03-20",
        description: "Eat",
        entry_id: 1,
        ticked: false,
        time: "08:00",
        title: "Shopping",
    },
    {
        date: todaysDate,
        description: "sleep",
        entry_id: 1,
        ticked: false,
        time: "10:00",
        title: "Shopping",
    },
    {
        date: todaysDate,
        description: "Go shopping with bob",
        entry_id: 1,
        ticked: false,
        time: "08:00",
        title: "Shopping",
    },
];

jest.mock("./../../firebase", () => {
    const mockDatabase = require("../../test_utils/mocks/mockDatabase");
    return {
        database: mockDatabase,
    };
});

jest.mock("../../auth", () => {
    return jest.fn(() => Promise.resolve("mockValidToken"));
});

describe("/todo endpoint", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Delete a todo item by pass in the todoId after logged in", async () => {
        const response = await request(app)
            .delete("/todo")
            .set("Accept", "application/json")
            .send({entry_id: 'a6722588-4f1c-4de1-aba0-ed597930871e'});

        expect(response.status).toBe(200);
        expect(database.ref().child().child("to").set).toHaveBeenCalledWith(expectedAfterDeleteTodo);
    });
});
