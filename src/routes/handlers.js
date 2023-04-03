"use strict";

const { users } = require("../models/index.js");
const base64 = require("base-64");

const jwt = require("jsonwebtoken");

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      userId: userRecord.id,
      username: userRecord.username,
      capabilities: userRecord.capabilities,
      role: userRecord.role,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      userId: req.user.id,
      username: req.user.username,
      capabilities: req.user.capabilities,
      role: req.user.role,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll();
    // console.log(
    //   "🚀 ~ file: handlers.js:41 ~ handleGetUsers ~ userRecords:",
    //   userRecords
    // );
    const list = userRecords.map((user) => {
      return {
        id: user.id,
        username: user.username,
      };
    });
    console.log("🚀 ~ file: handlers.js:46 ~ handleGetUsers ~ list:", list);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

function generateToken(username) {
  return jwt.sign({ username: username }, process.env.SECRET, {
    expiresIn: "2d",
  });
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
};
