const expect = require("chai").expect;
const testingapp = require("../index.js");
const request = require("supertest");
const User = require("../user.js");
const userRoutes = require("../user-routes.js");
const jwt = require("jsonwebtoken");
const mypassport = require("../passport-auth.js");

describe("protected pages", () => {
    let token = null;

    beforeEach("should have a valid token for each api", async () => {
        await User.destroy({where : {}});
        const user = {full_name : "james bond", username : "detective", password : "bond"};
        await User.create(user);
        const createdUser = userRoutes.getUser({username : user.username});
        let payload = {id : createdUser.id};
        token = jwt.sign(payload, mypassport.jwtOptions.secretOrKey);

    });
  
    it("should display page /protected", async () => {
        console.log("Generated token :: \n" + token + "\n");
        const res = await request(testingapp)
                            .get("/protected")
                            .auth(token, {type : "bearer"})
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("msg").to.equal("Congrats! you are seeing this bcz you are authorized");
    });
})