let mypassport = require("passport");
let passportJwt = require("passport-jwt");

const users = require("./models/User.js");
let config = null;
const env = process.env.NODE_ENV;
if(env != null){
    config = require(`./libs/config.${env}.js`); 
}

let ExtractJwt = passportJwt.ExtractJwt;
let JwtStrategy = passportJwt.Strategy;

let params = {
    secretOrKey : config.jwtSecret,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
};

let mystrategy = new JwtStrategy(params, async function(jwt_payload, done) {
    console.log('Payload received : ', jwt_payload);
    // let user = users[jwt_payload.id] || null;
    let user = await users.findById({id : jwt_payload.id});
    
    if(user) {
        done(null, {
            id : user.id
        });
    }else{
        done(null, false);
    }
});
   
   mypassport.use(mystrategy);

module.exports = {
    mypassport,
    params
}