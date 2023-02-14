const jwt  = require("jwt-simple");

describe("Routes: Tasks", () => {
    const Users = require("../models/User.js");
    const Tasks = require("../models/Tasks.js");
    let config = null;
    const env = process.env.NODE_ENV;
    if(env != null){
        config = require(`../libs/config.${env}.js`);
    }
    let token;
    let fakeTask;
    beforeEach(done => {
        Users.destroy({where : {}})
            .then(() => Users.create({
                    firstName : "test",
                    lastName : "user",
                    email : "user@mail.com",
                    password : "user12345"
                }))
            .then(user => {
                Tasks.destroy({where : {}})
                    .then(() => Tasks.bulkCreate([{
                        id : 1,
                        title : "Work",
                        user_id : user.id
                    },{
                        id : 2,
                        title : "Play",
                        user_id : user.id
                    }
                ]))
                .then(tasks => {
                    console.log("tasks : ", tasks.length)
                    fakeTask = tasks[0];
                    console.log(`user id : ${user.id}`)
                    token = jwt.encode({id : user.id}, config.jwtSecret);
                    console.log(`token : ${token}`)
                    done();
                });
            });
    });
    describe("Get /tasks", () => {
        describe("status 200", () => {
            it("returns a list of tasks", done => {
                request.get("/tasks")
                    // .set({"Authorization" : `Bearer ${token}`})
                    .auth(token, {type : "bearer"})
                    .expect(200)
                    .end((err, res) => {
                        console.log(token)
                        console.log("result from /tasks : ",res.body)
                        // console.log(err)
                        // expect(res.body).to.have.length(2);
                        // expect(res.body[0]).to.have.property("title", "Work");
                        // expect(res.body[1].title).to.eql("Play");
                        done(err);
                    });
            });
        });
    });

    // describe("Post /tasks/", () => {
    //     describe("status 200", () => {
    //         it("creates a new task", done => {

    //         });
    //     });
    // });

    // describe("Get /tasks/:id", () => {
    //     describe("status 200", () => {
    //         it("returns one task", done => {

    //         });
    //     });

    //     describe("status 404", () => {
    //         it("throws error when task not exist", done => {

    //         });
    //     });
    // });

    // describe("Put /tasks/:id", () => {
    //     describe("status 204", () => {
    //         it("updates a task", done => {

    //         });
    //     });
    // });

    // describe("Delete /tasks/:id", () => {
    //     describe("status 204", () => {
    //         it("deletes a task", done => {

    //         });
    //     });
    // });
})