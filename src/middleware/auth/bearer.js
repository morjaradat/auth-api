"use strict";

const { users } = require("../../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    res.status(403).send("Invalid Login");
  }

  function _authError() {
    next("Invalid Login");
  }
};
