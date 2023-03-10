const router = require("express").Router();
const userService = require("./users_service");
const passport = require("passport");
require("../auth/jwt.strategy");
require("../auth/local.strategy");

router.post("/register", userService.registerUser);

router.post("/login", passport.authenticate("local"), userService.loginUser);

router.get("/2fa", userService.getQRCode);

router.post("/2faVerify", userService.verifyCode);

router.post("/sendOTPCode", userService.sendOTPCode);


router.get("/", passport.authenticate("jwt"), userService.getAllUsers);

router.get("/me", passport.authenticate("jwt"), userService.getCurrentUser);

router.put("/me", passport.authenticate("jwt"), userService.updateCurrentUser);

router.delete("/me", passport.authenticate("jwt"), userService.deleteCurrentUser);

module.exports = router;
