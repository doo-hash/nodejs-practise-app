let assert = require("chai").assert;
let expect = require("chai").expect;
const app = require("../index.js");
const request = require("supertest");


describe("Basic Tests -- GET /", () => {
    it("should return a simple message", async () => {
        const res = await request(app).get("/");
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("hello to nodejs testing");
    })

    it("should say hello", (done) => {
        request(app)
        .get("/hello")
        .expect(200)
        .expect("hello world")
        .end(done);
    })
})