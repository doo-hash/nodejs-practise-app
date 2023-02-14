// describe("Routes: Token -- login", () => {
//   const Users = require("../models/User.js");
//   describe("Post /token for login all possible responses", () => {
//     beforeEach(done => {
//         Users.destroy({where : {}})
//             .then(() => Users.create({
//                 firstName : "test",
//                 lastName : "user",
//                 email : "user@mail.com",
//                 password : "user12345"
//             }))
//             .then(done());
//     });

//     describe("status 200", () => {
//         it("returns authenticated user token", done => {
//             request.post("/token")
//                 .send({
//                   email : "user@mail.com",
//                   password : "user12345"
//                 })
//                 .expect(200)
//                 .end((err, res) => {
//                   expect(res.body).to.include.keys("token");
//                   expect(res.body).to.have.property("msg").to.equal("Token generated successfully");
//                   done(err);
//                 });
//         });
//     });

//     describe("status 401", () => {
//         it("throws error when password is incorrect", done => {
//           request.post("/token")
//           .send({
//             email : "user@mail.com",
//             password : "wrongpassword"
//           })
//           .expect(401)
//           .end((err, res) => {
//             done(err);
//           });
//         });

//         it("throws error when email not existant", done => {
//           request.post("/token")
//           .send({
//             email : "wrong@mail.com",
//             password : "user12345"
//           })
//           .expect(401)
//           .end((err, res) => {
//             done(err);
//           });
//         });

//         it("throws error when password and email are blank", done => {
//           request.post("/token")
//           .expect(401)
//           .end((err, res) => {
//             done(err);
//           });
//         });
//     });
//   }); 
// });