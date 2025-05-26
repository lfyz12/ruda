const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/AuthMiddleware');

// 🔹 Создать устройство
router.post('/', authMiddleware, deviceController.create);

// 🔹 Получить список всех устройств
router.get('/', authMiddleware, deviceController.getAll);

// 🔹 Получить устройство по ID
router.get('/:id', authMiddleware, deviceController.getById);

// 🔹 Обновить устройство
router.post('/update', authMiddleware, deviceController.update);

// 🔹 Удалить устройство
router.post('/delete', authMiddleware, deviceController.delete);

module.exports = router;