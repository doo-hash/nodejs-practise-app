const request = require("supertest");
const myapp = require("../index.js");
const agent = request.agent(myapp);
const Employee = require("../models/Employee.js");
const Tasks = require("../models/Task.js");
const expect = require("chai").expect;

describe("Login- Logout Route tests", () => {
    let employee = null;
    let cookie  = null;
    before("delete and create records", async () => {
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
        it("should send a cookie if credentials are coorect", (done) => {

            // const res = await request(myapp).post("/login")
            //                         .send({email : employee.email, password : "456nizam"});
            // cookie = res.headers['set-cookie'];
            // console.log("cookie : ", cookie);
            // console.log(res.body)
            // expect(res.status).to.equal(302);
            // expect(res.headers).to.have.property('set-cookie');
            // expect(res.headers).to.have.property('location').to.equal('/tasks');
            // expect(res.redirect).to.equal(true);
            
            // request(myapp)
            //     .post("/login")
            //     .send({email : employee.email, password : "456nizam"})
            //     .expect(302)
            //     .expect('Location', '/tasks')
            //     .end(done);

            agent.post("/login")
                    .send({email : employee.email, password : "456nizam"})
                    .expect(302)
                    .expect('Location', "/tasks")
                    .end(function(err, res){
                        if(err) return done(err);

                        agent.get("/tasks")
                                .expect(200)
                                .end(function(err, res){
                                    if(err) return done(err);
                                    expect(res.body).to.have.property("message")
                                    done()
                                })
                    });
        });
        
        it("should see protected page", function(done) {
            agent.get("/protected")
                    .expect(200)
                    .end(function(err, res){
                        if(err) return done(err);
                        expect(res.body.Employee).to.equal(employee.id);
                        done();
                    })
        })

        it("should not see /sample page when logged in", function(done) {
            agent.get("/sample")
                    .expect(302)
                    .end(function(err, res){
                        if(err) return done(err);
                        agent.get("/tasks")
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);
                            console.log(res.body)
                            expect(res.body).to.have.property("message")
                            done()
                    })
                    })
        })
    })

    describe("Tasks routes", () => {
        afterEach("delete tasks", async ()=>{
            await Tasks.destroy({where : {}});
        })

        describe("GET - /tasks", () => {
            let createdTasks = null;
            let tasksdata = null;
    
            before("create tasks", async () =>{
                tasksdata = [
                    { title: "Work", EmployeeId: employee.id },
                    { title: "Practise", EmployeeId: employee.id },
                    { title: "Plan", EmployeeId: employee.id },
                    { title: "Revise", EmployeeId: employee.id },
                ];
                createdTasks = await Tasks.bulkCreate(tasksdata);
            });    

            it("should return tasks, employee data", (done) => {
                agent.get("/tasks")
                .expect(200)
                .end(function(err, res){
                    if(err) return done(err);
                    expect(res.body).to.have.property("success")
                    expect(res.body).to.have.property("tasks")
                    expect(res.body).to.have.property("employee")
                    expect(res.body.employee.id).to.equal(employee.id)
                    expect(res.body.tasks.length).to.equal(tasksdata.length)
                    done()
                })
            })

            it("should return a message if no task found", (done) =>{
                agent.get("/tasks")
                .expect(200)
                .end(function(err, res){
                    if(err) return done(err);
                    console.log(res.body);
                    expect(res.body).to.have.property("message")
                    done();
                })
            })
        })

        describe("GET /tasks/:id", ()=> {
            let createdTasks = null;
            let tasksdata = null;
    
            before("create tasks", async () =>{
                tasksdata = [
                    { title: "Work", EmployeeId: employee.id },
                    { title: "Practise", EmployeeId: employee.id },
                    { title: "Plan", EmployeeId: employee.id },
                    { title: "Revise", EmployeeId: employee.id },
                ];
                createdTasks = await Tasks.bulkCreate(tasksdata);
            });

            it("should return a task", (done) =>{
                agent.get("/tasks/"+createdTasks[2].id)
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);

                            expect(res.body).to.have.property("task")
                            expect(res.body).to.have.property("employee")
                            expect(res.body).to.have.property("success")
                            expect(res.body.task.id).to.equal(createdTasks[2].id)
                            expect(res.body.task.title).to.equal(createdTasks[2].title)
                            expect(res.body.task.EmployeeId).to.equal(createdTasks[2].EmployeeId)
                            expect(res.body.task.EmployeeId).to.equal(employee.id)
                            done()
                        })
            })

            it("should return a message if task not found", (done) => {
                agent.get("/tasks/"+createdTasks[2].id)
                .expect(200)
                .end(function(err, res){
                    if(err) return done(err);

                    expect(res.body).to.have.property("message")
                    done()
                })
            })
        })

        describe("POST /tasks/add", ()=> {    

            it("should save and return task", (done) =>{
                agent.post("/tasks/add")
                        .send({title : "read", done : false, EmployeeId : employee.id})
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);

                            expect(res.body).to.have.property("task")
                            expect(res.body).to.have.property("Employee")
                            expect(res.body).to.have.property("success")
                            expect(res.body.task).to.have.property("id")
                            expect(res.body.task.title).to.equal("read")
                            expect(res.body.task.done).to.equal(false)
                            expect(res.body.task.EmployeeId).to.equal(employee.id)
                            done()
                        })
            })
        })

        describe("PUT /tasks/:id", ()=> {
            let createdTasks = null;
            let tasksdata = null;
    
            before("create tasks", async () =>{
                tasksdata = [
                    { title: "Work", EmployeeId: employee.id },
                    { title: "Practise", EmployeeId: employee.id },
                    { title: "Plan", EmployeeId: employee.id },
                    { title: "Revise", EmployeeId: employee.id },
                ];
                createdTasks = await Tasks.bulkCreate(tasksdata);
            });

            it("should save and return updated task", (done) =>{
                agent.put("/tasks/"+createdTasks[2].id)
                        .send({title : "Plan done", done : true})
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);

                            expect(res.body).to.have.property("task")
                            expect(res.body).to.have.property("Employee")
                            expect(res.body).to.have.property("success")
                            expect(res.body.task.id).to.equal(createdTasks[2].id)
                            expect(res.body.task.title).to.equal("Plan done")
                            expect(res.body.task.done).to.equal(true)
                            expect(res.body.task.EmployeeId).to.equal(createdTasks[2].EmployeeId)
                            expect(res.body.task.EmployeeId).to.equal(employee.id)
                            done()
                        })
            })

            it("should not update and return a message if task not found", (done) => {
                agent.get("/tasks/"+createdTasks[2].id)
                .expect(200)
                .end(function(err, res){
                    if(err) return done(err);

                    expect(res.body).to.have.property("message")
                    done()
                })
            })
        })

        describe("DELETE /tasks/:id", ()=> {
            let createdTasks = null;
            let tasksdata = null;
    
            before("create tasks", async () =>{
                tasksdata = [
                    { title: "Work", EmployeeId: employee.id },
                    { title: "Practise", EmployeeId: employee.id },
                    { title: "Plan", EmployeeId: employee.id },
                    { title: "Revise", EmployeeId: employee.id },
                ];
                createdTasks = await Tasks.bulkCreate(tasksdata);
                console.log(createdTasks[2].id);
            });

            it("should return tasks and employee", (done) =>{
                agent.delete("/tasks/"+createdTasks[2].id)
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);

                            expect(res.body).to.have.property("tasks")
                            expect(res.body).to.have.property("Employee")
                            expect(res.body).to.have.property("success")
                            expect(res.body.tasks.length).to.equal(3)
                            expect(res.body.tasks[0].id).to.equal(createdTasks[0].id)
                            expect(res.body.tasks[1].id).to.equal(createdTasks[1].id)
                            expect(res.body.tasks[2].id).to.equal(createdTasks[3].id)
                            expect(res.body.tasks[0].EmployeeId).to.equal(employee.id)
                            expect(res.body.tasks[1].EmployeeId).to.equal(employee.id)
                            expect(res.body.tasks[2].EmployeeId).to.equal(employee.id)
                            done()
                        })
            })
        })
    })

    describe("LOGOUT", () => {
        it("should logout", (done) => {
            agent.post("/logout")
            .expect(302)
            .expect('Location', "/")
            .end(function(err, res){
                if(err) return done(err);

                agent.get("/")
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);
                            expect(res.body).to.have.property("message")
                            done()
                    })
                });          
        })
    })

    describe("after LOGOUT", () => {
        it("GET /tasks -> /home", (done) => {
                agent.get("/tasks")
                        .expect(302)
                        .expect('Location', '/home')
                        .end(function(err, res){
                            if(err) return done(err);
                          
                            agent.get("/home")
                            .expect(200)
                            .end(function(err, res){
                                if(err) return done(err);
                                expect(res.body).to.have.property("message")
                                done()
                        })
                    })
        })

        it("GET /tasks/522 -> /home", (done) => {
            agent.get("/tasks/522")
                    .expect(302)
                    .expect('Location', '/home')
                    .end(function(err, res){
                        if(err) return done(err);
                      
                        agent.get("/home")
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);
                            expect(res.body).to.have.property("message")
                            done()
                    })
                })
        })

        it("POST /tasks/add -> /home", (done) => {
            agent.post("/tasks/add")
                    .send({title : "redirect", EmployeeId : employee.id})
                    .expect(302)
                    .expect('Location', '/home')
                    .end(function(err, res){
                        if(err) return done(err);
                      
                        agent.get("/home")
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);
                            expect(res.body).to.have.property("message")
                            done()
                    })
                })
        })

        it("PUT /tasks/522 -> /home", (done) => {
            agent.put("/tasks/522")
                    .send({title: "redirect", done : true})
                    .expect(302)
                    .expect('Location', '/home')
                    .end(function(err, res){
                        if(err) return done(err);
                      
                        agent.get("/home")
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);
                            expect(res.body).to.have.property("message")
                            done()
                    })
                })
        })

        it("DELETE /tasks/522 -> /home", (done) => {
            agent.delete("/tasks/522")
                    .expect(302)
                    .expect('Location', '/home')
                    .end(function(err, res){
                        if(err) return done(err);
                      
                        agent.get("/home")
                        .expect(200)
                        .end(function(err, res){
                            if(err) return done(err);
                            expect(res.body).to.have.property("message")
                            done()
                    })
                })
        })

        it("should see /sample page when logged out", function(done) {
            agent.get("/sample")
                    .expect(200)
                    .end(function(err, res){
                        if(err) return done(err);
                        expect(res.body).to.have.property("message")
                        done()
                    })
        })
    })
})