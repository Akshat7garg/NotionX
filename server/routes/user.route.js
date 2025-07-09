import { Router } from "express"
import {
    changePassword,
    loginUser,
    registerUser
} from "../controllers/user.controller.js"

const router = Router();

router.route('/register').post(registerUser); // Register user
router.route('/login').post(loginUser); // Login user
router.route('/changePassword').put(changePassword); // Change password

export default router;