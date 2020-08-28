const {User} = require("../db/models")
require('dotenv').config();
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET

}

module.exports = passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({
        where: {
            username: jwt_payload
        }
    })
    .then((data) => {
        const user = data;
        return done(null, user)
    })
    .catch((err) => { return done(err, false) })
}));

module.exports = passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
module.exports = passport.deserializeUser(function(id, cb) {
    User.findByPk(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
module.exports = passport.authenticate("jwt", {session: false})