const express = require("express");
const TaskService = require("../services/tasks.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await TaskService.getAll();
    res
      .status(200)
      .json({ status: "success", data: { data, nbHits: data.length } });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await TaskService.getById(id);
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newData = await TaskService.createTask(body);
    res.status(201).json({ newData });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateData = await TaskService.updateTask(id, body);
    res.status(201).json({ updateData });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteData = await TaskService.deleteTask(id);
    res.status(201).json({ deleteData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
