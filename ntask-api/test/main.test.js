const expect = require("chai").expect;
const request = require("supertest");
const myapp = require("../index.js");

describe("Test for GET /", ()=> {
    it("should return a json response", async () => {
        const res = await request(myapp).get("/");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("work");
    });
});