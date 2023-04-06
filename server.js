const express = require("express");
const session = require("express-session");
const { passport } = require("./passportSetup");
const flash = require("connect-flash");
const config = require("./config");
const ensureAuthenticated = require("./ensureAuthenticated");

// Initialize the Express application
const app = express();

// Configure session middleware
app.use(
	session({
		secret: "some-secret",
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Configure middleware
app.use(flash());

// Set up routes
app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Set up Google OAuth callback route
app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/",
		successRedirect: "/dashboard",
	})
);

app.get("/dashboard", ensureAuthenticated, (req, res) => {
	if (req.user) {
		res.send(`Welcome ${req.user.name}!`);
	} else {
		res.send(`Welcome !`);
	}
});

// Start the server
app.listen(3000, () => {
	console.log("Server started at http://localhost:3000");
});
