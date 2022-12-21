const { Employee, Task } = require("../models");

const seedDB = async () => {
  const dummyEmployee = await Employee.create({
    firstname: "Melissa",
    lastname: "Lynch",
    department: "Computer Science",
  });
  const dummyEmployee2 = await Employee.create({
    firstname: "Philip",
    lastname: "Fernandez",
    department: "Web Dev",
  });
  const dummyEmployee3 = await Employee.create({
    firstname: "John",
    lastname: "Doe",
    department: "Law",
  });

  const dummyTask1 = await Task.create({
    description: "Sort",
    prioritylevel: "Medium",
    completionstatus: false,
  });

  const dummyTask2 = await Task.create({
    description: "Check-In",
    prioritylevel: "High",
    completionstatus: false,
  });

  await dummyTask1.setEmployee(dummyEmployee);
  await dummyTask2.setEmployee(dummyEmployee2);
};

module.exports = seedDB;
