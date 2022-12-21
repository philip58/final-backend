const express = require("express");
const router = express.Router();
const { Task, Employee } = require("../database/models");
const ash = require("express-async-handler");

router.get(
  "/",
  ash(async (req, res) => {
    let employees = await Employee.findAll({ include: [Task] });
    res.status(200).json(employees);
  })
);

router.get(
  "/:id",
  ash(async (req, res) => {
    let employee = await Employee.findByPk(req.params.id, { include: [Task] });
    res.status(200).json(employee);
  })
);

router.delete(
  "/:id",
  ash(async (req, res) => {
    await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Employee deleted");
  })
);

router.post(
  "/",
  ash(async (req, res) => {
    let newEmployee = await Employee.create(req.body);
    res.status(200).json(newEmployee);
  })
);

router.put(
  "/:id",
  ash(async (req, res) => {
    await Employee.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    let employee = await Employee.findByPk(req.params.id, { include: [Task] });
    res.status(201).json(employee);
  })
);

module.exports = router;
