const assert = require("assert");

describe("group tests", () => {
    before(() => {
        console.log("executes before all tests.");
    });

    after(() => {
        console.log("executes after all tests.");
    });

    describe("Test1", () => {
        beforeEach(() => {
            console.log("executes before each test.");
        });

        it("sum calculation", () => {
            assert.equal(2+3, 5);
        });

        it("sum calculation", () => {
            assert.equal(3+5, 8);
        });
    })

    describe("Test2", () => {
        afterEach(() => {
            console.log("executes after each test.");
        });

        it("multiply calculation", () => {
            assert.equal(2*3, 6);
        });

        it("multiply calculation", () => {
            assert.equal(3*3, 9);
        });
    })
})