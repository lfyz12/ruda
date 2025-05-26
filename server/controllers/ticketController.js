const { Ticket, User} = require('../models/models');
const ApiError = require('../error/ApiError'); // Используем кастомные ошибки

class TicketController {
    // 🔹 1. Создать новую задачу
    async createTask(req, res, next) {
        try {
            const { title, description, status } = req.body;

            if (!title) {
                return next(ApiError.badRequest('Название задачи обязательно'));
            }

            const userId = 1;
            // Создаем задачу
            const task = await Ticket.create({title, description, status, userId});

            console.log(task)
            return res.status(201).json(task);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 2. Получить список всех задач (фильтрация по статусу и исполнителю)
    async getTasks(req, res, next) {
        try {
            const { status, userId } = req.query;
            // let whereClause = {};
            //
            // if (status !== '') whereClause.status = status;
            // if (userId !== 0) whereClause.userId = userId;

            const tasks = await Ticket.findAll({
                // include: { model: Employee, attributes: ['id', 'first_name', 'last_name'] }
            });

            return res.json(tasks);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 3. Получить одну задачу по ID
    async getTaskById(req, res, next) {
        try {
            const { id } = req.query;

            const task = await Ticket.findByPk(id, {
                include: { model: User, attributes: ['id', 'name', 'departmentId'] }
            });

            if (!task) {
                return next(ApiError.badRequest('Задача не найдена'));
            }

            return res.json(task);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 4. Обновить задачу (изменить статус, описание и т. д.)
    async updateTask(req, res, next) {
        try {
            const { id } = req.query;
            const { title, description, userId, status } = req.body;

            const task = await Ticket.findByPk(id);
            if (!task) {
                return next(ApiError.badRequest('Задача не найдена'));
            }

            // Проверяем, существует ли сотрудник, если он указан
            if (userId) {
                const user = await User.findByPk(userId);
                if (!user) {
                    return next(ApiError.badRequest('Сотрудник не найден'));
                }
            }

            // Обновляем данные
            if (title) task.title = title;
            if (description) task.description = description;
            if (status) task.status = status;
            if (userId) task.userId = userId;

            await task.save();
            return res.json(task);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 5. Удалить задачу
    async deleteTask(req, res, next) {
        try {
            const { id } = req.query;

            const task = await Ticket.findByPk(id);
            if (!task) {
                return next(ApiError.badRequest('Задача не найдена'));
            }

            await task.destroy();
            return res.json({ message: 'Задача удалена' });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new TicketController();
