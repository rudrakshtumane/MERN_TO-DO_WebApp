const express = require("express");
const taskController = require("../controllers/taskController");
const { auth } = require("../middlewares/authorize");
const router = express.Router();
const upload = require("../middlewares/multer");

router.post("/createTask", auth,  taskController.createTask);

router.get("/getUserTasks/:id", auth, taskController.getUserTasks);

router.put("/updateTask/:id", auth, taskController.updateTask);

router.delete("/deleteTask/:id", auth, taskController.deleteTask);

module.exports = router;

// http://localhost:5001/api/task/createTask
// http://localhost:5001/api/task/getUserTasks
// http://localhost:5001/api/task/updateTask/
// http://localhost:5001/api/task/deleteTask/