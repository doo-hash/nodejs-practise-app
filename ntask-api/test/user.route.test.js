const expect = require("chai").expect;
const request = require("supertest");
const myapp = require("../index.js");
const Tasks = require("../models/Tasks.js");
const User = require("../models/User.js");

describe("Test for user routes", () => {

    beforeEach("delete user records", async () => {
        await User.destroy({where : {}});
        await Tasks.destroy({where : {}});
        console.log("User and Tasks data deleted \n");
    });

    describe("POST -- Test for post /users/regiter", ()=> {
    
        it("POST -- should return a positive json response", async () => {
            let createuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            const res = await request(myapp)
                                .post("/users/register")
                                .send(createuser);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("prompt");
            expect(res.body).to.have.property("createdUser");
            expect(res.body.createdUser).to.have.property("id");
            expect(res.body.createdUser).to.have.property("firstName").to.equal(createuser.firstName);
            expect(res.body.createdUser).to.have.property("lastName").to.equal(createuser.lastName);
            expect(res.body.createdUser).to.have.property("email").to.equal(createuser.email);
            expect(res.body.createdUser).to.have.property("password");
            expect(res.body.createdUser).to.have.property("updatedAt");
            expect(res.body.createdUser).to.have.property("createdAt");
        });
    
        it("POST -- should return a negative json response", async () => {
            let createuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            await User.create(createuser);
            const res = await request(myapp)
                                .post("/users/register")
                                .send(createuser);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("suggestion");
        });
    });
    
    describe("PUT --  user /users/:id", () => {
        let user = null;
        beforeEach("create a user", async () => {
            let createuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            user = await User.create(createuser);
            console.log("user created \n");
        });

        it("PUT -- should return a positive json response", async () => {
            let updateuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "narutouzumaki@ninja.net", 
            };
            const res = await request(myapp)
                                .put("/users/" + user.id)
                                .send(updateuser);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("prompt");
            expect(res.body).to.have.property("user");
            expect(res.body.user).to.have.property("id");
            expect(res.body.user).to.have.property("firstName").to.equal(updateuser.firstName);
            expect(res.body.user).to.have.property("lastName").to.equal(updateuser.lastName);
            expect(res.body.user).to.have.property("email").to.equal(updateuser.email);
            expect(res.body.user).to.have.property("password");
            expect(res.body.user).to.have.property("updatedAt");
            expect(res.body.user).to.have.property("createdAt");
        });
        
        it("PUT -- should return a negative json response", async () => {
            let updateuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "narutouzumaki@ninja.net", 
            };
            const res = await request(myapp)
                                .put("/users/" + 2)
                                .send(updateuser);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("suggestion");
        });
    });

    describe("GET -- get a single user /users/:id", () => {
        let user = null;
        beforeEach("create a user", async () => {
            let createuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            user = await User.create(createuser);
            console.log("user created \n");
        });

        it("GET -- should return a positive json response", async () => {
            const res = await request(myapp)
                                .get("/users/" + user.id)
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success");
            expect(res.body).to.have.property("user");
            expect(res.body.user).to.have.property("id");
            expect(res.body.user).to.have.property("firstName").to.equal(user.firstName);
            expect(res.body.user).to.have.property("lastName").to.equal(user.lastName);
            expect(res.body.user).to.have.property("email").to.equal(user.email);
            expect(res.body.user).to.have.property("password");
            expect(res.body.user).to.have.property("updatedAt");
            expect(res.body.user).to.have.property("createdAt");
            // expect(res.body.user).to.have.property("tasks");
        });
        
        it("GET -- should return a negative json response", async () => {
            const res = await request(myapp)
                                .get("/users/" + 2)
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("prompt");
        });
    });

    describe("GET -- get all users /users", () => {
        it("GET -- should return a positive json response", async () => {
            let users = [
                {firstName : "Naruto", lastName : "Uzumaki", email : "naruto@ninja.net", password : "9tailfox"},
                {firstName : "Sasuke", lastName : "Uchiha", email : "sasuke@ninja.net", password : "hiddenshadow"},
                {firstName : "Sakura", lastName : "Haruno", email : "sakura@ninja.net", password : "medicalninja"}
            ];
            await User.bulkCreate(users);
            const res = await request(myapp)
                                .get("/users")
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success");
            expect(res.body).to.have.property("users");
            expect(res.body.users.length).to.equal(3);
        });
  

        it("GET -- should return a negative json response", async () => {
            const res = await request(myapp)
                                .get("/users")
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
        });
    });

    describe("DEELTE -- delete a user", () => {
        let user  = null;
        beforeEach("create a user", async () => {
            let createuser = {
                firstName : "Naruto", 
                lastName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            user = await User.create(createuser);
            console.log("user created \n");
        });

        it("DELETE - positive response", async () => {
            const res = await request(myapp)
                                .delete("/users/"+ user.id);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("success");
        });

        it("DELETE - negative response", async () => {
            await User.destroy({where : {}});
            const res = await request(myapp)
                                .delete("/users/"+ user.id);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
        });
    });
});