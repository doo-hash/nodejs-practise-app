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

    it("Should return a token", async () => {
        const res = await request(myapp)
                            .post("/login")
                            .send({
                                email : createuser.email,
                                password : createuser.password
                            });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("token");
    })
})