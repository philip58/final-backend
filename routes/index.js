const express = require("express");
const router = express.Router();

const tasksRouter = require("./tasks");
const employeesRouter = require("./employees");

router.use("/tasks", tasksRouter);
router.use("/employees", employeesRouter);

module.exports = router;
