import express from "express";
import { createUserController, deleteController, updateController } from "../controllers/user.controllers.js";

const router = express.Router();

// /api/users/
router.get('/user-details', (req, res) => {
    // Fetch 

    res.json({})
});

// /api/users/add
router.post('/add', createUserController);

router.post('/delete', deleteController)

router.post('/edit', updateController)


export default router;