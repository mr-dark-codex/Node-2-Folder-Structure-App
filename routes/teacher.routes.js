import express from "express";
import User from "../user-schema.js";

const router = express.Router();

// /api/users/add
router.post('/add', async (req, res) => {
    // console.log('Req Body = ', req.body);
    // Object Destructuring
    const { name, id } = req.body;
    // Add Logic likhbo 
    const newUser = await User.insertOne({
        name, id
    });


    res.json({
        message: "User Created Sucessfully",
        insertRecord: newUser
    });
});


router.post('/delete', async (req, res) => {
    const { id } = req.body;

    // console.log('ID = ', id);
    const deletedUser = await User.deleteOne({ _id: id });

    res.json({
        message: "User Deleted Sucessfully",
        deletedRecord: deletedUser
    });
})

router.post('/edit', async (req, res) => {
    const { user_id, name, id } = req.body;

    // {
    //     user_id: "687fda7ae31a08f95f78323f",
    //     name : "Priti",
    //     id : "123"
    // }

    const user = await User.updateOne({ _id: user_id }, {
        name, id
    });

    res.json({
        message: "User Updated Successfully",
        updateRecord: user
    })
})


export default router;