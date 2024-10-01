const express = require("express");
const TaskService = require("../services/tasks.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await TaskService.getAll();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TaskService.getById(id);
    res.json({ data });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newData = await TaskService.createTask(body);
    res.status(201).json({ newData });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const {id} = req.params
    const body = req.body
    const updateData = await TaskService.updateTask(id, body)
    res.status(201).json({updateData})
  } catch (error) {
    res.status(404).json({msg: error.message})
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await TaskService.deleteTask(id);
    res.status(201).json({ deleteData });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

module.exports = router;
