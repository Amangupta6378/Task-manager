const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const taskController = require('../controllers/taskController');

router.get('/', auth, taskController.getTasks);
router.post('/', auth, role(['Admin','Member']), [body('title').notEmpty()], taskController.createTask);
router.patch('/:id', auth, role(['Admin','Member']), taskController.updateTask);
router.delete('/:id', auth, role(['Admin']), taskController.deleteTask);

module.exports = router;
