import express from "express";
import { createUserController, deleteUserController, getAllUsersController, updateUserController } from "../controllers/user.controllers.js";

const router = express.Router();

// /api/users/
router.get('/', getAllUsersController);
// /api/users/add
router.post('/add', createUserController);

router.post('/delete', deleteUserController)

router.post('/edit', updateUserController)


export default router;