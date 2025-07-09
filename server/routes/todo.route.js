import { Router } from "express";
import {
    createTodo,
    deleteTodo,
    fetchTodos,
    modifyTodo
} from "../controllers/todo.controller.js"

const router = Router();

router.route('/create').post(createTodo); // Create todos
router.route('/fetch').post(fetchTodos); // Fetch todos
router.route('/modify').put(modifyTodo); // Update todos
router.route('/delete').delete(deleteTodo); // Delete todos

export default router;