const request = require("supertest");
const expect = require("chai").expect;
const app = require("../index.js");
const { User } = require("../models/user.model.js");

describe("api/users", () => {
    beforeEach("before Each api call", async () => {
       await User.deleteMany();
    });

    // describe("Get /api/users", () => {
    //     it("should return all users", async () => {
    //         const users = [
    //             {name : "test", email : "test@em.com", gender : "female"},
    //             {name : "testuse", email : "testuse@em.com", gender : "male"},
    //             {name : "testjain", email : "testjain@em.com", gender : "female"},
    //             {name : "testinf", email : "testinf@em.com", gender : "male"}
    //         ];

    //         await User.insertMany(users);
    //         const res = await request(app).get("/api/users");
    //         expect(res.status).to.equal(200);
    //         expect(res.body.length).to.equal(4);
    //     });
    // });

    describe("get /api/users/id", () => {
        it("should return a user if valid id is passed", async () => {
            const user = new User({name : "testinf", email : "testinf@em.com", gender : "male"});
            await user.save();
            const res = await request(app).get("/api/users/" + user.id);
            expect(res.status).to.equal(200);
        })
    })
    
})