const { body, validationResult } = require('express-validator');
const Todo = require('../models/todo');
function getTodos(req, res) {
    Todo.find((err, todos_list) => {
        if (err) {
            res.json(err);
        } else {
            res.json(todos_list);
        }
    });
}
const addTodo = [
    body('item')
        .trim()
        .isLength({ min: 3, max: 150 })
        .withMessage('Item: 3-20 chars')
        .escape(),
    body('status')
        .trim()
        .isLength({ min: 8, max: 10 })
        .withMessage('Status should be 8-10 chars'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            console.log(req.body);
            let { item, status } = req.body;
            let todoObj = new Todo({ item, status });
            todoObj.save((error) => {
                if (error) {
                    console.log(error);
                    res.json(error);
                } else {
                    res.json({ status: 'adding todo complete' });
                }
            });
        }
    },
];
function deleteTodo(req, res) {
    Todo.findByIdAndDelete(req.params._id, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json(`todos with id : ${req.params._id} is deleted`);
        }
    });
}

module.exports = { getTodos, addTodo, deleteTodo };
