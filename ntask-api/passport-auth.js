const mypassport = require("passport");
const passportJWT = require("passport-jwt");
const authconfig = require("./lib/config.development.js");
const userController = require("./controller/user.js");

let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = authconfig.jwtSecret;

let mystrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    console.log('Payloaad received : ', jwt_payload);
    let user = userController.getUser({id : jwt_payload.id});

    if(user){
        next(null, user);
    }
    else{
        next(null, false);
    }
});
mypassport.use(mystrategy);

module.exports = {
    mypassport,
    jwtOptions
};