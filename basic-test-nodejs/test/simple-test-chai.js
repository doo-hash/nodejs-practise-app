const expect = require("chai").expect;

describe("group tests with chai", () => {
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
            expect(2 + 2).to.equal(4);
        });

        it("boolean true", () => {
            expect(2+3 == 5).to.be.true;
        });
    })

    describe("Test2", () => {
        afterEach(() => {
            console.log("executes after each test.");
        });

        it("multiply calculation", () => {
            expect(2*5).to.equal(10);
        });

        it("sentence comparision", () => {
            expect("This is amazing!!").to.equal("This is amazing!!");
        });
    })
})