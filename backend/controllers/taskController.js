import Task from "../models/tasksModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Create a Task
// @route Post api/task
const createTask = asyncHandler(async (req, res) => {
  await Task.create({
    tittle: req.body.tittle,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueTo: req.body.dueTo,
  });
  // we need to check that parameters are not null
  res.status(201).json({
    message: "Task Created",
  });
});

// @desc Fetch All Tasks
// @route Get api/task
const getTasks = asyncHandler(async (req, res) => {
	// limiting the api for performance and if we want to implement pagination in the future
  let Tasks = await Task.find({status : "false"}).limit(10).sort({ priority: 1 });
  res.status(200).json({"tasks" : Tasks});
});

// @desc Fetch A Task
// @route Get api/task/:id
const getTaskById = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);
  res.status(200).json(task);
});

// @desc Update A Task
// @route Patch api/task/
const updateTask = asyncHandler(async (req, res) => {
  let taskId = req.body._id;
  let taskUpdatedData = {
		tittle : req.body.tittle,
		description : req.body.description,
		priority : req.body.priority,
		dueTo : req.body.dueTo,
		status : req.body.status
	};

  let s = await Task.findByIdAndUpdate(taskId, taskUpdatedData);
  res.status(200).json({
    message: "Document updated",
  });
});

// @desc Delete A Task
// @route Delete api/task/:id
const deleteTask = asyncHandler(async (req, res) => {
  await Task.deleteOne({ _id: req.params.id });
  res.status(204).json({
    message: "Document Deleted",
  });
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
