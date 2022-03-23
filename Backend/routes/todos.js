var express = require('express');
var router = express.Router();
let todoController = require('../controller/todos');

router.get('/', todoController.getTodos);
router.post('/', todoController.addTodo);
router.delete('/:_id', todoController.deleteTodo);

module.exports = router;
