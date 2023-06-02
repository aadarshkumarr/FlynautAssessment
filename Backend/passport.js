const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("./Models/usersModel");

// Configure passport to use JWT strategy
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

passport.use(
	new JwtStrategy(options, async (jwtPayload, done) => {
		try {
			const user = await User.findById(jwtPayload.id);

			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	})
);

module.exports = passport;
