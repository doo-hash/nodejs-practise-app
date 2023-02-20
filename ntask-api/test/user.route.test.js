const expect = require("chai").expect;
const request = require("supertest");
const myapp = require("../index.js");
const User = require("../models/User.js");

describe("Test for post /users/regiter", ()=> {
    beforeEach("delete user records", async () => {
        await User.destroy({where : {}});
    });

    it("POST -- should return a positive json response", async () => {
        let user = {
            firstName : "Naruto", 
            lastName : "Uzumaki", 
            email : "naruto@ninja.net", 
            password : "9tailfox"
        };
        const res = await request(myapp)
                            .post("/users/register")
                            .send(user);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("prompt");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("id");
        expect(res.body.user).to.have.property("firstName").to.equal(user.firstName);
        expect(res.body.user).to.have.property("lastName").to.equal(user.lastName);
        expect(res.body.user).to.have.property("email").to.equal(user.email);
        expect(res.body.user).to.have.property("password");
        expect(res.body.user).to.have.property("updatedAt");
        expect(res.body.user).to.have.property("createdAt");
    });

    it("POST -- should return a negative json response", async () => {
        let user = {
            firstName : "Naruto", 
            lastName : "Uzumaki", 
            email : "naruto@ninja.net", 
            password : "9tailfox"
        };
        await User.create(user);
        const res = await request(myapp)
                            .post("/users/register")
                            .send(user);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("suggestion");
    });

});