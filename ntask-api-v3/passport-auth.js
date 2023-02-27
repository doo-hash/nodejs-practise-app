const mypassport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Employee = require("./models/Employee.js");
const employeeController = require("./controller/employeeController.js");
const bcrypt = require("bcrypt");

let mystrategy = new localStrategy({
    usernameField : 'userName'
},
async (username, password, done) => {
    const employee = await employeeController.findEmployee({userName : username});    
    if(!employee){
        return done(null, false, { message : "No Employee found"});
    }
    const psdValid = await bcrypt.compare(password,employee.password);
    console.log("password correct : ", psdValid);
    if(!psdValid){
        return done(null, false, { message : "Password is incorrect"});
    }
    return done(null, employee);
});

mypassport.use(mystrategy);

mypassport.serializeUser(function(user, done){
    done(null, user.id);
});

mypassport.deserializeUser(function(id, done){
    Employee.findByPk(id).then(function (user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
})

module.exports = mypassport;