const Router = require('express')
const router = new Router();
const departmentController = require('../controllers/departmentController')
const authMiddleware = require('../middleware/AuthMiddleware')


router.post('/', authMiddleware, departmentController.createDepartment);

router.get('/', authMiddleware, departmentController.getDeps);

router.get('/:id', authMiddleware, departmentController.getDepById);

router.post('/:id', authMiddleware, departmentController.updateDep);

router.delete('/:id',authMiddleware, departmentController.deleteDep);

module.exports = router;