// const User = require("../models/User.js");
// const userController = require("../controller/user.js");

// const expect = require("chai").expect;
// let user = {
//     firstName : "Naruto", 
//     lastName : "Uzumaki", 
//     email : "naruto@ninja.net", 
//     password : "9tailfox"
// };
// let deuser = {
//     firstName : "Naruto", 
//     lastName : "Uzumaki", 
//     email : "naruto@ninja.net", 
//     password : "9tailfox",
//     inActive : true
// };
// let users = null;

// describe("user CRUD services", () => {
//     beforeEach("empty user table", async () =>{
//         // await sequelize.sync({force : true});
//         await User.destroy({where : {}});
//     });

//     it("should return all users", async ()=>{
//         await User.create(user);
//         users = await User.findAll({where : {}});

//         const usersto = await userController.getAllUsers();
//         expect(usersto[0].id).to.equal(users[0].id);
//         expect(usersto[0].firstName).to.equal(users[0].firstName);
//         expect(usersto[0].lastName).to.equal(users[0].lastName);
//         expect(usersto[0].email).to.equal(users[0].email);
//         expect(usersto[0].password).to.equal(users[0].password);
//         expect(usersto[0]).to.have.property("updatedAt");
//         expect(usersto[0]).to.have.property("createdAt");
//         expect(usersto).to.have.length(1);
//     });

//     it("should save a user", async () => {
//         const newUser = await userController.createUser(user);
//         expect(newUser).to.have.property("id");
//         expect(newUser).to.have.property("firstName").to.equal(user.firstName);
//         expect(newUser).to.have.property("lastName").to.equal(user.lastName);
//         expect(newUser).to.have.property("email").to.equal(user.email);
//         expect(newUser).to.have.property("password");
//         expect(newUser).to.have.property("updatedAt");
//         expect(newUser).to.have.property("createdAt");
//     });

//     it("should return if its deleted", async () => {
//         const user = await User.create(deuser);
//         const getUser = await userController.getUser({id : user.id});
//         expect(getUser).to.equal(null);
//     });

//     it("should get a single user", async () => {
//         const createUser = await User.create(user);
//         const getUser = await userController.getUser({id : createUser.id});
//         expect(getUser.id).to.equal(createUser.id);
//         expect(getUser.firstName).to.equal(createUser.firstName);
//         expect(getUser.lastName).to.equal(createUser.lastName);
//         expect(getUser.email).to.equal(createUser.email);
//         expect(getUser.password).to.equal(createUser.password);
//     });

//     it("should update a user", async () => {
//         const createUser = await User.create(user);
//         const updateUser = await userController.updateUser({firstName : "samahade", email : "samahade@forfun.com"},{id : createUser.id});
//         expect(updateUser.id).to.equal(createUser.id);
//         expect(updateUser.firstName).to.equal("samahade");
//         expect(updateUser.lastName).to.equal(createUser.lastName);
//         expect(updateUser.email).to.equal("samahade@forfun.com");
//         expect(updateUser.password).to.equal(createUser.password);
//     });

//     it("should delete a user", async () => {
//         const createUser = await User.create(user);
//         await userController.deleteUser({id : createUser.id});
//         const userf = await User.findOne({where : {id : createUser.id}});
//         expect(userf.inActive).to.equal(true);
//     });

// });