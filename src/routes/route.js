"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("../models/index.js");
const basicAuth = require("../middleware/auth/basic.js");
const bearerAuth = require("../middleware/auth/bearer.js");
const permissions = require("../middleware/auth/acl.js");
const {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
} = require("./handlers");

authRouter.post("/signup", handleSignup);

authRouter.post("/signin", basicAuth, handleSignin);

authRouter.get("/users", bearerAuth, permissions("delete"), handleGetUsers);

authRouter.get("/secret", bearerAuth, handleSecret);

module.exports = authRouter;
