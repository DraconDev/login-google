const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./config");

passport.use(
	new GoogleStrategy(
		{
			// Use the values from `config.js`
			clientID: process.env.clientID,
			clientSecret: process.env.clientSecret,
			callbackURL: process.env.callbackURL,
		},
		function (accessToken, refreshToken, profile, done) {
			// Here you can implement your logic to verify the user
			// For example, you can check if the user exists in your database
			const user = {
				id: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
			};
			if (user) {
				// Store the user in the session
				done(null, user);
			} else {
				done(new Error("Failed to authenticate user."));
			}
		}
	)
);

// Serialize the user ID to store in the session
passport.serializeUser(function (user, done) {
	done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser(function (user, done) {
	done(null, user);
});

module.exports = {
	passport,
};
