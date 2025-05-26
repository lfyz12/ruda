const Router = require('express');
const router = new Router();
const deviceUpdateRouter = require('../controllers/deviceUpdateController');
const authMiddleware = require('../middleware/AuthMiddleware');

// 🔹 Создать обновление (с загрузкой файла)
router.post('/', authMiddleware, deviceUpdateRouter.create);

// 🔹 Получить все обновления
router.get('/', authMiddleware, deviceUpdateRouter.getAll);

// 🔹 Получить обновление по ID
router.get('/:id', authMiddleware, deviceUpdateRouter.getById);

router.get('/getByDevice/:deviceId', authMiddleware, deviceUpdateRouter.getAllByDeviceId);

// 🔹 Обновить информацию об обновлении
router.post('/update', authMiddleware, deviceUpdateRouter.update);

// 🔹 Удалить обновление
router.post('/delete', authMiddleware, deviceUpdateRouter.delete);

module.exports = router;