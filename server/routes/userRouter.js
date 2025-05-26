const Router = require('express')
const router = new Router()
const employeeController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/createUser', employeeController.registration)
router.post('/login', employeeController.login)
router.post('/logout', authMiddleware, employeeController.logout)

router.get('/refresh', employeeController.refresh)
router.get('/users', employeeController.getAllUsers)
router.post('/user', employeeController.getUserByUserID)
// router.post('/getAll', employeeController.getAllEmployees)
// router.post('/getUserByUserID', authMiddleware, employeeController.getUserByEmployeeID)
//
// router.put('/changeDefaultAddressByNumber', authMiddleware, employeeController.changeDefaultAddressByNumber)
// router.put('/changeNumberByNumber', authMiddleware, employeeController.changeNumberByNumber)
// router.put('/changeNameByNumber', authMiddleware, employeeController.changeNameByNumber)
// router.put('/changeDefaultAddressByID', authMiddleware, employeeController.changeDefaultAddressById)
// router.put('/changeNumberByID', authMiddleware, employeeController.changeNameById)
// router.put('/changeNameByID', authMiddleware, employeeController.changeNameById)
// router.put('/changeNumberAndNameByID', authMiddleware, employeeController.changeNumberAndNameById)
// router.put('/changeAllByID', authMiddleware, employeeController.changeAllById)
// router.put('/changeRoleByNumber', checkRole(['ADMIN']), employeeController.changeRoleByNumber)
// router.put('/changePasswordbyNumber', employeeController.changePasswordbyNumber)


module.exports = router