const expect = require("chai").expect;
const request = require("supertest");
const myapp = require("../index.js");

describe("Test for main Route", () => {
    it("should return json object response", () => {
        request(myapp).get("/")
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success");
            expect(res.body).to.have.property("message");
        })
        .catch(err => {
            console.log(err);
        })
    })
})