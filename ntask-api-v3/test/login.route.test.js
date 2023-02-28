const request = require("supertest");
const myapp = require("../index.js");
const Employee = require("../models/Employee.js");
const Tasks = require("../models/Task.js");
const expect = require("chai").expect;

describe("Login- Logout Route tests", () => {
    let employee = null;
    let cookie  = null;
    beforeEach("delete and create records", async () => {
        await Employee.destroy({where : {}});
        await Tasks.destroy({where : {}});
        employee = await Employee.create({
            fullName : "Mir Siddiqi",
            userName : "salarjung",
            email : "wazir@nizam.ccc",
            password : "456nizam"
        });
    });

    describe("POST - /login", () => {
        it("should send a cookie if credentials are coorect", async () => {
            const res = await request(myapp).post("/login")
                                    .send({email : employee.email, password : "456nizam"});
            cookie = res.headers['set-cookie'];
            console.log("cookie : ", cookie);
            expect(res.status).to.equal(302);
            expect(res.headers).to.have.property('set-cookie');
            expect(res.redirect).to.equal(true);
        })        
    })
})