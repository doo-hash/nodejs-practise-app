const expect = require("chai").expect;
const employeeController = require("../controller/employeeController.js");
const Employee = require("../models/Employee.js");
const Tasks = require("../models/Task.js");

describe("CRUD TEST FOR EMPLOYEE", () => {
    beforeEach("delete records", async () => {
        await Employee.destroy({where : {}});
        await Tasks.destroy({where : {}});
    });

    describe("GET - Test for findAll()", () => {
        it("shoudld return list of employee data", async () => {
            let emp = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            await Employee.create(emp);
            const employees = await Employee.findAll({where : {}});
            const e = await employeeController.findAllEmployees();
            expect(e.length).to.equal(1);
            expect(e[0].id).to.equal(employees[0].id);
            expect(e[0].fullName).to.equal(employees[0].fullName);
            expect(e[0].userName).to.equal(employees[0].userName);
            expect(e[0].email).to.equal(employees[0].email);
        }); 

        it("should return null", async () => {
            const e = await employeeController.findAllEmployees();
            expect(e).to.equal(null);
        });
    });

    describe("GET - Test for findEmployee()", () => {
        it("shoudld return employee data", async () => {
            let emp = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            let employee = await Employee.create(emp);

            const e = await employeeController.findEmployee({id : employee.id});
            expect(e.id).to.equal(employee.id);
            expect(e.fullName).to.equal(employee.fullName);
            expect(e.userName).to.equal(employee.userName);
            expect(e.email).to.equal(employee.email);
        }); 

        it("shoudld return employee with tasks data", async () => {
            let emp = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            let employee = await Employee.create(emp);
            let btasks = [
                { title: "Work", EmployeeId: employee.id },
                { title: "Practise", EmployeeId: employee.id },
                { title: "Plan", EmployeeId: employee.id },
                { title: "Revise", EmployeeId: employee.id },
            ];
            await Tasks.bulkCreate(btasks);

            const e = await employeeController.findEmployeewithTasks({id : employee.id});
            expect(e.id).to.equal(employee.id);
            expect(e.fullName).to.equal(employee.fullName);
            expect(e.userName).to.equal(employee.userName);
            expect(e.email).to.equal(employee.email);
            expect(e).to.have.property("tasks");
            expect(e.tasks.length).to.equal(4);
        });

        it("should return null when employee not found", async () => {
            const e = await employeeController.findEmployee({id : 1});
            expect(e).to.equal(null);
        });

        it("should return null when employee is deleted", async () => {
            let emp = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox",
                inActive : true
            };
            let employee = await Employee.create(emp);
            const e = await employeeController.findEmployee({id : employee.id});
            let tasks = await Tasks.findAll({where : {EmployeeId : employee.id}});
            if(tasks == ""){
                tasks = null;
            }
            expect(e).to.equal(null);
            expect(tasks).to.equal(null);
        });

        it("should return null - no tasks when employee not found", async () => {
            const e = await employeeController.findEmployeewithTasks({id : 1});
            expect(e).to.equal(null);
        });

        it("should return null when employee is deleted", async () => {
            let emp = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox",
                inActive : true
            };
            let employee = await Employee.create(emp);
            const e = await employeeController.findEmployeewithTasks({id : employee.id});
            let tasks = await Tasks.findAll({where : {EmployeeId : employee.id}});
            if(tasks == ""){
                tasks = null;
            }
            expect(e).to.equal(null);
            expect(tasks).to.equal(null);
        }); 
    });

    describe("POST - Test for saveEmployee()", () => {
        it("shoudld save and return employee data", async () => {
            let employee = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            const e = await employeeController.saveEmployee(employee);
            expect(e).to.have.property("id");
            expect(e.fullName).to.equal(employee.fullName);
            expect(e.userName).to.equal(employee.userName);
            expect(e.email).to.equal(employee.email);
        }); 
    });

    describe("PUT - Test for saveEmployee()", () => {
        it("shoudld update and return employee data", async () => {
            let employeedata = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            const employee = await Employee.create(employeedata);
            let emp = {
                fullName: "Naruto Namikaze",
                userName: "Uzumaki",
            };
            const e = await employeeController.updateEmployee(emp, {id : employee.id});
            expect(e).to.have.property("id").to.eq(employee.id);
            expect(e.fullName).to.equal(emp.fullName);
            expect(e.userName).to.equal(emp.userName);
            expect(e.email).to.equal(employee.email);
        });
        
        it("shoudld not update and return null when employee is deleted", async () => {
            let employeedata = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox", 
                inActive : true
            };
            const employee = await Employee.create(employeedata);
            let emp = {
                fullName: "Naruto Namikaze",
                userName: "Uzumaki",
            };
            const e = await employeeController.updateEmployee(emp, {id : employee.id});
            expect(e).to.equal(null);
        });

        it("shoudld not update and return null when employee not found", async () => {
            let employeedata = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox", 
                inActive : true
            };
            const employee = await Employee.create(employeedata);
            let emp = {
                fullName: "Naruto Namikaze",
                userName: "Uzumaki",
            };
            const e = await employeeController.updateEmployee(emp, {id : employee.id+1});
            expect(e).to.equal(null);
        });
    });

    describe("DELETE - Test for deleteEmployee()", () => {
        it("shoudld set inActive to true and return employee data", async () => {
            let employeedata = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            const employee = await Employee.create(employeedata);
            const e = await employeeController.deleteEmployee({id : employee.id});
            expect(e).to.have.property("inActive").to.eq(true);
        });
        
        it("shoudld not set inActive to true and return null when its not found", async () => {
            let employeedata = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox"
            };
            const employee = await Employee.create(employeedata);
            const e = await employeeController.deleteEmployee({id : employee.id+1});
            expect(e).to.equal(null);
        });

        it("shoudld not set inActive to true and return null when its already deleted", async () => {
            let employeedata = {
                fullName: "Naruto",
                userName: "Uzumaki",
                email: "naruto@ninja.net",
                password: "9tailfox",
                inActive : true
            };
            const employee = await Employee.create(employeedata);
            const e = await employeeController.deleteEmployee({id : employee.id+1});
            expect(e).to.equal(null);
        });
    });
});