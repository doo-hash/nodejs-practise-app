const expect = require("chai").expect;
const testingapp = require("../index.js");
const request = require("supertest");
const User = require("../user.js");

describe("Basic Tests : GET /", () =>{
    it("should return a simple json reponse", async () => {
        const res = await request(testingapp).get("/");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message").to.equal("Express is up! Let's Go");
    });

});

describe("User test CR /register, /users", () => {
    beforeEach("before each user api call", async () => {
        await User.destroy({where : {} });
    });

    describe("For users api /users", () => {
        it("should return all users", async () => {
            const users = [
                {full_name : "james cameroon", username : "avatar", password : "avatar"},
                {full_name : "james bond", username : "detective", password : "bond"}
            ];

            await User.bulkCreate(users);
            const res = await request(testingapp).get("/users");
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
        });
    });

    describe("For adding user /register", () => {
        it("should return user created user", async () => {
            const user ={full_name : "james bond", username : "detective", password : "bond"};
            const res = await request(testingapp).post("/register").send(user);
            expect(res.status).to.equal(200);
            expect(res.body.user).to.have.property("full_name").to.equal("james bond");
            expect(res.body.user).to.have.property("username").to.equal("detective");
            expect(res.body.user).to.have.property("id").to.be.finite;
            expect(res.body.user).to.have.property("createdAt");
            expect(res.body.user).to.have.property("updatedAt");
        });  
    });
});

describe("To login with a created user", () => {
    beforeEach("before each user api call", async () => {
        await User.destroy({where : {} });
        const user = {full_name : "james bond", username : "detective", password : "bond"};
        await User.create(user);
    });

    it("should login successfully /login", async () => {
        const loginuser = {username : "detective", password : "bond"};
        const res = await request(testingapp).post("/login").send(loginuser);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("token");
        expect(res.body).to.have.property("msg").to.equal("ok");
    });

    it("should not login successfully with wrong username /login", async () => {
        const loginuser = {username : "detecti", password : "bond"};
        const res = await request(testingapp).post("/login").send(loginuser);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("msg").to.equal('No such user found : ', loginuser);
    });

    it("should not login successfully with wrong password /login", async () => {
        const loginuser = {username : "detective", password : "bonds"};
        const res = await request(testingapp).post("/login").send(loginuser);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("msg").to.equal('Password is incorrect');
    });
});