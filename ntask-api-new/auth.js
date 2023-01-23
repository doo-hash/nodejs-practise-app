const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

module.exports = app => {
    const Users = require("./models/User.js");
    const config = require("./libs/config.js");
    
    const params = {
        secretOrKey : config.jwtSecret,
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt")
    };

    const strategy = new Strategy(params, (payload, done) => {
        Users.findById(payload.id)
            .then(user => {
                if(user){
                    return done(null, {
                        id : user.id,
                        email : user.email
                    });
                }
                return done(null, false);
            })
            .catch(error => {
                done(error,null);
            });
    });

    passport.use(strategy);

    return {
        initialize : () => {
            return passport.initialize();
        },
        authenticate : () => {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};