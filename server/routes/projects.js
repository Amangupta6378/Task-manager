const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const projectController = require('../controllers/projectController');

router.get('/', auth, projectController.getProjects);
router.post('/', auth, role(['Admin']), [body('title').notEmpty()], projectController.createProject);
router.delete('/:id', auth, role(['Admin']), projectController.deleteProject);

module.exports = router;
