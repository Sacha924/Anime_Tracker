const router = require("express").Router();
const userService = require("./users_service");

router.post("/register", userService.registerUser);

router.post("/login", userService.loginUser);

router.get("/", userService.getAllUsers);

router.get("/me", userService.getCurrentUser);

router.put("/me", userService.updateCurrentUser);

router.delete("/me", userService.deleteCurrentUser);

module.exports = router;
