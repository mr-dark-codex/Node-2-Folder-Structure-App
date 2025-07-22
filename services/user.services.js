import User from "../models/user.models.js"

export class UserService {
    create = async ({ name, id }) => {
        const newUser = await User.insertOne({
            name, id
        });

        return { message: "User created successfully", data: newUser }
    }

    update = async ({ user_id, name, id }) => {
        const updatedUser = await User.updateOne({ _id: user_id }, { $set: { name, id } });

        return { message: "User updated successfully", data: updatedUser }
    }

    delete = async ({ user_id }) => {
        const deletedUser = await User.deleteOne({ _id: user_id });

        return { message: "User deleted successfully", data: deletedUser }
    }

}