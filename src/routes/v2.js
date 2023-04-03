const express = require("express");
const dataModules = require("../models");
const { users } = require("../models/index.js");
const bearerAuth = require("../middleware/auth/bearer.js");
const permissions = require("../middleware/auth/acl.js");
const router = express.Router();

router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});

router.get("/:model", bearerAuth, handleGetAll);
router.get("/:model/:id", bearerAuth, handleGetOne);
router.post("/:model", bearerAuth, permissions("create"), handleCreate);
router.put("/:model/:id", bearerAuth, permissions("update"), handleUpdate);
router.patch("/:model/:id", bearerAuth, permissions("update"), handleUpdate);
router.delete("/:model/:id", bearerAuth, permissions("delete"), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  let modelId = parseInt(req.params.id);
  let updateModel = req.body;
  let model = await req.model.get(modelId);
  if (model) {
    let updatedModel = await model.update(updateModel);
    res.status(201).json(updatedModel);
  } else {
    res.status(404);
  }
}

async function handleDelete(req, res) {
  let modelId = parseInt(req.params.id);
  try {
    let deleteModel = await req.model.delete(modelId);
    res.status(204).json(deleteModel); //it will return the id of the deleted person
  } catch (error) {
    res.status(500);
  }
}

module.exports = router;
