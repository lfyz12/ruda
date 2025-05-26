const Router = require('express');
const router = new Router();
const taskController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/AuthMiddleware')

// 🔹 Создать задачу
router.post('/', authMiddleware, taskController.createTask);

// 🔹 Получить список всех задач (фильтрация по статусу и исполнителю)
router.get('/', authMiddleware, taskController.getTasks);

// 🔹 Получить одну задачу
router.get('/getOne', authMiddleware, taskController.getTaskById);

// 🔹 Обновить задачу
router.post('/update', authMiddleware, taskController.updateTask);

// 🔹 Удалить задачу
router.delete('/',authMiddleware, taskController.deleteTask);

module.exports = router;
