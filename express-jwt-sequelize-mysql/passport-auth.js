const userRoutes = require("./user-routes.js");

const mypassport = require("passport");
const passportJWT = require("passport-jwt");

//to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

//strategy for authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'avatar';

let mystrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    console.log('Payload received : ', jwt_payload);
    let user = userRoutes.getUser({ id : jwt_payload.id });

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