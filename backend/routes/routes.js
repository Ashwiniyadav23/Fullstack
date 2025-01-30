const express = require("express");
const routes = express.Router();
module.exports = routes;

const Model = require("../models/models");

routes.post("/sign", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    const newUser = new Model({
      name,
      email,
      password,
    });

    const dataToSave = await newUser.save();
    res.status(201).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

routes.get("/getAll", async (req, res) => {
  try {
    const allUsers = await Model.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
