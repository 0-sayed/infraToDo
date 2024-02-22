import express from "express";
const router = express.Router();
import {createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";

router.route('/').post(createTask);
router.route('/').get(getTasks);
router.route('/:id').get(getTaskById);
router.route('/').patch(updateTask);
router.route('/:id').delete(deleteTask);

export default router;

