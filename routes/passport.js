const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET = process.env.SECRET;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const { id, email } = jwt_payload;
     if(email){
            return done(null, jwt_payload);
        } else {
            return done(null, false);
            // or you could create a new account
        }
}));