const expect = require("chai").expect;
const request = require("supertest");
const myapp = require("../index.js");
const Tasks = require("../models/Task");
const Employee = require("../models/Employee.js");

describe("Test for Employee routes", () => {

    beforeEach("delete Employee records", async () => {
        await Employee.destroy({where : {}});
        await Tasks.destroy({where : {}});
        console.log("Employee and Tasks data deleted \n");
    });

    describe("POST -- Test for post /Employees/regiter", ()=> {
    
        it("POST -- should save and return a json response with employee", async () => {
            let createEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            const res = await request(myapp)
                                .post("/employees/register")
                                .send(createEmployee);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("prompt");
            expect(res.body).to.have.property("createdEmployee");
            expect(res.body.createdEmployee).to.have.property("id");
            expect(res.body.createdEmployee).to.have.property("fullName").to.equal(createEmployee.fullName);
            expect(res.body.createdEmployee).to.have.property("userName").to.equal(createEmployee.userName);
            expect(res.body.createdEmployee).to.have.property("email").to.equal(createEmployee.email);
            expect(res.body.createdEmployee).to.have.property("password");
            expect(res.body.createdEmployee).to.have.property("updatedAt");
            expect(res.body.createdEmployee).to.have.property("createdAt");
        });
    
        it("POST -- should not save and return json response with message", async () => {
            let createEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            await Employee.create(createEmployee);
            const res = await request(myapp)
                                .post("/employees/register")
                                .send(createEmployee);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
        });
    });
    
    describe("PUT --  Employee /Employees/:id", () => {
        let employee = null;
        beforeEach("create a Employee", async () => {
            let createEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            employee = await Employee.create(createEmployee);
            console.log("Employee created \n");
        });

        it("PUT -- should update and return a json response with updated employee", async () => {
            let updateEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "narutouzumaki@ninja.net", 
            };
            const res = await request(myapp)
                                .put("/employees/" + employee.id)
                                .send(updateEmployee);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("Employee");
            expect(res.body.Employee).to.have.property("id");
            expect(res.body.Employee).to.have.property("fullName").to.equal(updateEmployee.fullName);
            expect(res.body.Employee).to.have.property("userName").to.equal(updateEmployee.userName);
            expect(res.body.Employee).to.have.property("email").to.equal(updateEmployee.email);
            expect(res.body.Employee).to.have.property("password");
            expect(res.body.Employee).to.have.property("updatedAt");
            expect(res.body.Employee).to.have.property("createdAt");
        });
        
        it("PUT -- should not update and return a json response with message", async () => {
            let updateEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "narutouzumaki@ninja.net", 
            };
            const res = await request(myapp)
                                .put("/employees/" + 2)
                                .send(updateEmployee);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
        });
    });

    describe("GET -- get a single Employee /Employees/:id", () => {
        let employee = null;
        beforeEach("create a Employee", async () => {
            let createEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            employee = await Employee.create(createEmployee);
            console.log("Employee created \n");
        });

        it("GET -- should return a json response with employee if its found", async () => {
            const res = await request(myapp)
                                .get("/employees/" + employee.id)
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success");
            expect(res.body).to.have.property("Employee");
            expect(res.body.Employee).to.have.property("id");
            expect(res.body.Employee).to.have.property("fullName").to.equal(employee.fullName);
            expect(res.body.Employee).to.have.property("userName").to.equal(employee.userName);
            expect(res.body.Employee).to.have.property("email").to.equal(employee.email);
            expect(res.body.Employee).to.have.property("password");
            expect(res.body.Employee).to.have.property("updatedAt");
            expect(res.body.Employee).to.have.property("createdAt");
            expect(res.body.Employee).to.have.property("tasks");
        });
        
        it("GET -- should return a json response message if its not found", async () => {
            const res = await request(myapp)
                                .get("/employees/" + 2)
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
        });
    });

    describe("GET -- get all Employees /Employees", () => {
        it("GET -- should return a json response with employees if its found", async () => {
            let employees = [
                {fullName : "Naruto", userName : "Uzumaki", email : "naruto@ninja.net", password : "9tailfox"},
                {fullName : "Sasuke", userName : "Uchiha", email : "sasuke@ninja.net", password : "hiddenshadow"},
                {fullName : "Sakura", userName : "Haruno", email : "sakura@ninja.net", password : "medicalninja"}
            ];
            await Employee.bulkCreate(employees);
            const res = await request(myapp)
                                .get("/employees")
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success");
            expect(res.body).to.have.property("employees");
            expect(res.body.employees.length).to.equal(3);
        });
  

        it("GET -- should return a json response with message if its not found", async () => {
            const res = await request(myapp)
                                .get("/employees")
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
        });
    });

    describe("DEELTE -- delete a Employee", () => {
        let employee  = null;
        beforeEach("create a Employee", async () => {
            let createEmployee = {
                fullName : "Naruto", 
                userName : "Uzumaki", 
                email : "naruto@ninja.net", 
                password : "9tailfox"
            };
            employee = await Employee.create(createEmployee);
            console.log("Employee created \n");
        });

        it("DELETE - should return a json response with success message", async () => {
            const res = await request(myapp)
                                .delete("/employees/"+ employee.id);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("success");
        });

        it("DELETE - should return a json response with message if employee not found", async () => {
            await Employee.destroy({where : {}});
            const res = await request(myapp)
                                .delete("/employees/"+ employee.id);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message");
        });

        it("DELETE - should return a json response with message if employee is deleted", async () => {
            await Employee.update({inActive : true}, {where : {id : employee.id}});
            const res = await request(myapp)
                                .delete("/employees/"+ employee.id);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("message").to.equal("No Employee Found");
        });
    });
});