const createDB = require("./database/utils/createDB");
const seedDB = require("./database/utils/seedDB");

const db = require("./database");

const syncDatabase = async () => {
  try {
    await db.sync({force: true});
    console.log("------Synced to db--------");
    await seedDB();
    console.log("--------Successfully seeded db--------");
  } catch (err) {
    console.error("syncDB error:", err);
  }
};

const express = require("express");

const app = express();

const apiRouter = require("./routes");

const cors = require("cors");

const configureApp = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/favicon.ico", (req, res) => res.status(204));

  app.get("/hello", (request, response) => {
    response.send("hello world!");
  });

  app.use("/api", apiRouter);

  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const bootApp = async () => {
  await createDB();

  await syncDatabase();

  await configureApp();
};

bootApp();

const PORT = 5001;
app.listen(PORT, console.log(`Server started on ${PORT}`));
