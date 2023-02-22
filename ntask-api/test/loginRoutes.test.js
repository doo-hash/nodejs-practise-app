const expect = require("chai").expect;
const request = require("supertest");
const myapp = require("../index.js");
const User = require("../models/User.js");

let createuser = {
    firstName : "Naruto", 
    lastName : "Uzumaki", 
    email : "naruto@ninja.net", 
    password : "9tailfox"
};
describe("Test for token routes", () => {
    beforeEach("Create a user", async () => {
        await User.destroy({where : {}});
        await User.create(createuser);
    });

    it("Should return a token for correct credentials", async () => {
        const res = await request(myapp)
                            .post("/login")
                            .send({
                                email : createuser.email,
                                password : createuser.password
                            });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("token");
    });

    it("Should not return a token with no credentials", async () => {
        const res = await request(myapp)
                            .post("/login")
                            .send({
                                email : "",
                                password : ""
                            });
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message").to.equal("email and password are required");
    });

    it("Should not return a token for wrong credentials", async () => {
        const res = await request(myapp)
                            .post("/login")
                            .send({
                                email : "sssss@qqqqq.sss",
                                password : "aaaaaaaaa"
                            });
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message").to.equal("No such user found");
    });

    it("Should not return a token for wrong email", async () => {
        const res = await request(myapp)
                            .post("/login")
                            .send({
                                email : "sssss@sssss.ccc",
                                password : createuser.password
                            });
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message").to.equal("No such user found");
    });

    it("Should not return a token for wrong password", async () => {
        const res = await request(myapp)
                            .post("/login")
                            .send({
                                email : createuser.email,
                                password : createuser.password+"21"
                            });
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message").to.equal("Password is incorrect");
    });
});