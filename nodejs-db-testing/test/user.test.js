const request = require("supertest");
const expect = require("chai").expect;
const app = require("../index.js");
const { User } = require("../models/user.model.js");

describe("api/users", () => {
    beforeEach("before Each api call", async () => {
       await User.deleteMany();
    });

    describe("Get /api/users", () => {
        it("should return all users", async () => {
            const users = [
                {name : "test", email : "test@em.com", gender : "female"},
                {name : "testuse", email : "testuse@em.com", gender : "male"},
                {name : "testjain", email : "testjain@em.com", gender : "female"},
                {name : "testinf", email : "testinf@em.com", gender : "male"}
            ];

            await User.insertMany(users);
            const res = await request(app).get("/api/users");
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(4);
        });
    });

    describe("get /api/users/id", () => {
        it("should return a user if valid id is passed", async () => {
            const user = new User({name : "testinf", email : "testinf@em.com", gender : "male"});
            await user.save();
            const res = await request(app).get("/api/users/" + user.id);
            expect(res.status).to.equal(200);
        });

        it("should return 404 error if valid object id is passed but does not exist", async () => {
            const res = await request(app).get("/api/users/123456789123");
            expect(res.status).to.equal(404);
        });

        it("should return 404 error if invalid object id is passed", async () => {
            const res = await request(app).get("/api/users/1");
            expect(res.status).to.equal(400);
        })

    })
  
    describe("POST /api/users", () => {
        it("should return a user when all the request body is valid", async () => {
            const res = await request(app)
                            .post("/api/users")
                            .send({
                                name : "flamingo",
                                email : "testflamingi@em.com", 
                                gender : "female"
                            });
                            expect(res.status).to.equal(200);
                            expect(res.body).to.have.property("_id");
                            expect(res.body).to.have.property("name", "flamingo");
        });
    })

    describe("PUT /api/users", () => {
        it("should return a existing user with updated data and return 200", async () => {
            const user = new User({
                name : "BlueRay",
                email : "blueray@statebird.com",
                gender : "female"
            });
            await user.save();
            const res = await request(app)
                            .put("/api/users/" + user.id)
                            .send({
                                name : "BlueRayPalapitta",
                                email : "blueray@telanganastatebird.com",
                                gender : "female"
                            });
            
            expect(res.status).to.equal(200);
            expect(res.body._id).to.equal(user.id);
            expect(res.body).to.have.property("name", "BlueRayPalapitta");
            expect(res.body).to.have.property("email", "blueray@telanganastatebird.com");
        })
    })

    describe("DELETE /api/users/:id", () => {
        it("should delete a user with the given valid object id", async () => {
            const user = new User({
                name : "BlueRay",
                email : "blueray@statebird.com",
                gender : "female"
            });
            await user.save();
            console.log(user)
            const res = await request(app).delete("/api/users/" + user.id);            
            expect(res.status).to.equal(200);

            const get_res = await request(app).get("/api/users/" + user.id);            
            expect(get_res.status).to.equal(404);
        })
    })
})