const express = require("express");
const Router = express.Router();
const userController=require('../controllers/users');

Router.post("/signup", userController.userSignup);

Router.post("/login",userController.userLogin);

Router.delete("/:userId",userController.userDelete);

module.exports = Router;
