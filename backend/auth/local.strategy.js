const localStrategy = require("passport-local");
const passport = require("passport");
const userService = require("../users/users.service");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new localStrategy(async function (username, password, done) {
    try {
      const user = await userService.checkPassword(username, password);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);
