const express = require("express");
const router = express.Router()

const { createTodo, updateTodo, updateDeletedTodo } = require("../types");
const { todo } = require("../dbConnect");
const { completed } = require("../models/completed");


router.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if (!parsePayload.success) {
        res.status(411).json({

            message: "You have sent wrong inputs"
        })
        return
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        message: "todo created successfully"
    })



    //put data in the database

})
router.get("/todo", async function (req, res) {
    const todos = await todo.find({})
    res.json({
        todos
    })

})
router.get("/completedtodo", async function (req, res) {
    const completedTodos = await todo.find({completed:true})
    res.json({
        completedTodos
    })

})
router.put("/completed", async function (req, res) {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if (!parsePayload.success) {
        res.status(411).json({

            message: "You have sent wrong inputs"
        })
        return
    }
    try {
        // console.log("object")
        const updatedTodo = await todo.updateOne(
            { _id: req.body.id }, // Match the document with the given ID
            { completed: true } // Update the completed field to true
        );
        const todos = await todo.findById({ _id: req.body.id })
        const completedTodo = new completed({
            title: todos.title,
            description: todos.description,
            completed: todos.completed

        })
        await completedTodo.save()
        res.json({
            updatedTodo: updatedTodo
        })


    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }





})
router.delete("/todo", async function (req, res) {

    const payload = req.body;
    const updatedPayload = updateDeletedTodo.safeParse(payload);
    if (!updatedPayload.success) {
        res.json({
            message: "wrong inputs"
        })
    }
    const response = await todo.findByIdAndDelete({
        _id: req.body.id
    })
    if (response) {
        res.json({
            message: "deleted successfully"
        })
    }
    else {
        res.json({
            message: "not found"
        })
    }

})

module.exports = router