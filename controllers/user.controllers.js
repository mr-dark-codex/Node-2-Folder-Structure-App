import { UserService } from "../services/user.services.js";

let userService = new UserService();

export const getAllUsersController = async (req, res) => {
    try {
        const { message, data } = await userService.getAll();
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    } catch (err) {
        next(err); // Passes the error to Express error handler
    }
}


export const createUserController = async (req, res) => {
    try {
        const { name, id } = req.body;
        const { message, data } = await userService.create({ name, id });
        return res.status(201).json({
            success: true,
            message,
            insertRecord: data,
        });
    } catch (err) {
        next(err); // Passes the error to Express error handler
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.body;
        const { message, data } = await userService.delete({ id });
        return res.json({
            success: true,
            message,
            deleteRecord: data,
        });
    } catch (err) {
        next(err); // Passes the error to Express error handler
    }
}


export const updateUserController = async (req, res) => {
    try {
        const { user_id, name, id } = req.body;
        const { message, data } = await userService.update({ user_id, name, id });
        return res.json({
            success: true,
            message,
            updateRecord: data
        })
    } catch (error) {
        next(err); // Passes the error to Express error handler
    }
}
