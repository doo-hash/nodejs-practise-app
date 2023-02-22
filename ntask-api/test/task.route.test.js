const expect = require("chai").expect;
const User = require("../models/User.js");
const Tasks = require("../models/Tasks.js");
const request = require("supertest");
const myapp = require("../index.js");
const jwt = require("jwt-simple");
const mypassport = require("../passport-auth.js");


describe("Tests for Tasks Routes", () => {
    let user = null;
    let tasks = null;
    let token = null;

    beforeEach("delete and create user and task records", async () => {
        await User.destroy({where : {}});
        await Tasks.destroy({where : {}});

        user = await User.create({
            firstName : "Naruto", 
            lastName : "Uzumaki", 
            email : "naruto@ninja.net", 
            password : "9tailfox"
        });

        tasks = await Tasks.bulkCreate([
            {title : "Work", UserId : user.id},
            {title : "Practise", UserId : user.id},
            {title : "Plan", UserId : user.id},
            {title : "Revise", UserId : user.id},
        ]);

        let payload = { id : user.id};
        token = jwt.encode(payload, mypassport.jwtOptions.secretOrKey);
    });

    it("GET -/tasks -- should return tasks if token is valid", async () => {
        const res = await request(myapp).get("/tasks").set('Authorization', 'Bearer '+token);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("tasks");
        expect(res.body.tasks.length).to.equal(4);
        expect(res.body.tasks[0].UserId).to.equal(user.id);
        expect(res.body.tasks[1].UserId).to.equal(user.id);
        expect(res.body.tasks[2].UserId).to.equal(user.id);
        expect(res.body.tasks[3].UserId).to.equal(user.id);
        expect(res.body.tasks[0].title).to.equal(tasks[0].title);
        expect(res.body.tasks[1].title).to.equal(tasks[1].title);
        expect(res.body.tasks[2].title).to.equal(tasks[2].title);
        expect(res.body.tasks[3].title).to.equal(tasks[3].title);
        expect(res.body.tasks[0].id).to.equal(tasks[0].id);
        expect(res.body.tasks[1].id).to.equal(tasks[1].id);
        expect(res.body.tasks[2].id).to.equal(tasks[2].id);
        expect(res.body.tasks[3].id).to.equal(tasks[3].id);
    });

    it("GET - /tasks -- should return nothing if token is not valid", async () => {
        const res = await request(myapp).get("/tasks").set('Authorization', 'Bearer '+token+'ee');
        expect(res.status).to.equal(401);
    });

    it("GET - /tasks/id -- should return task if token is valid", async () => {
        const res = await request(myapp).get("/tasks/" + tasks[1].id)
                                        .set('Authorization', 'Bearer '+token);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("task");
        expect(res.body).to.have.property("user_id").to.equal(user.id);
        expect(res.body.task.title).to.equal(tasks[1].title);
        expect(res.body.task.done).to.equal(tasks[1].done);
        expect(res.body.task.id).to.equal(tasks[1].id);
        expect(res.body.task.UserId).to.equal(tasks[1].UserId);
    });

    it("GET - /tasks/id -- should return nothing if token is not valid", async () => {
        const res = await request(myapp).get("/tasks/"+tasks[1].id).set('Authorization', 'Bearer '+token+'ee');
        expect(res.status).to.equal(401);
    });

    it("POST - /tasks -- should save and return task if token is valid", async () => {
        const res = await request(myapp).post("/tasks")
                            .set('Authorization', 'Bearer '+token)
                            .send({title : "Learn something new"});
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("task");
        expect(res.body).to.have.property("user_id").to.equal(user.id);
        expect(res.body.task.title).to.equal("Learn something new");
        expect(res.body.task.done).to.equal(false);
        expect(res.body.task).to.have.property("id");
        expect(res.body.task.UserId).to.equal(user.id);
    });

    it("POST - /tasks -- should not save task and return nothing if token is not valid", async () => {
        const res = await request(myapp).post("/tasks")
                                .set('Authorization', 'Bearer '+token+'ee')
                                .send({title : "Learn something new"});
        expect(res.status).to.equal(401);
    });

    it("PUT - /tasks/id -- should update and return task if token is valid", async () => {
        const res = await request(myapp).put("/tasks/"+ tasks[2].id)
                            .set('Authorization', 'Bearer '+token)
                            .send({title : "Learn something new", done : true});
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("task");
        expect(res.body).to.have.property("user_id").to.equal(user.id);
        expect(res.body.task.title).to.equal("Learn something new");
        expect(res.body.task.done).to.equal(true);
        expect(res.body.task.id).to.equal(tasks[2].id);
        expect(res.body.task.UserId).to.equal(user.id);
    });

    it("PUT - /tasks -- should not update task and return nothing if token is not valid", async () => {
        const res = await request(myapp).put("/tasks/"+tasks[2].id)
                                .set('Authorization', 'Bearer '+token+'ee')
                                .send({title : "Learn something new", done : true});
        expect(res.status).to.equal(401);
    });

    it("DELETE - /tasks/id -- should delete task if token is valid", async () => {
        const res = await request(myapp).delete("/tasks/" + tasks[1].id).set('Authorization', 'Bearer '+token);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("success");
    });

    it("DELETE - /tasks/id -- should not delete task if token is not valid", async () => {
        const res = await request(myapp).delete("/tasks/"+tasks[1].id).set('Authorization', 'Bearer '+token+'ee');
        expect(res.status).to.equal(401);
    });
});