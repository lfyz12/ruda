const { Ticket, User, Department} = require('../models/models');
const ApiError = require('../error/ApiError'); // Используем кастомные ошибки

class DepartmentController {
    // 🔹 1. Создать новую задачу
    async createDepartment(req, res, next) {
        try {
            const { name } = req.body;

            if (!name) {
                return next(ApiError.badRequest('Название обязательно'));
            }

            // Проверяем, существует ли сотрудник
            if (name) {
                const dep = await Department.findOne({
                    where: {name}
                });
                if (dep) {
                    return next(ApiError.badRequest('Отдел уже существует'));
                }
            }

            // Создаем задачу
            const department = await Department.create({ name });

            return res.status(201).json(department);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 2. Получить список всех задач (фильтрация по статусу и исполнителю)
    async getDeps(req, res, next) {
        try {
            // let whereClause = {};
            //
            // if (status !== '') whereClause.status = status;
            // if (userId !== 0) whereClause.userId = userId;

            const deps = await Department.findAll({
                // include: { model: Employee, attributes: ['id', 'first_name', 'last_name'] }
            });

            return res.json(deps);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 3. Получить одну задачу по ID
    async getDepById(req, res, next) {
        try {
            const { id } = req.params;

            const dep = await Department.findByPk(id);

            if (!dep) {
                return next(ApiError.badRequest('Отдел не найден'));
            }

            return res.json(dep);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 4. Обновить задачу (изменить статус, описание и т. д.)
    async updateDep(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const dep = await Department.findByPk(id);
            if (!dep) {
                return next(ApiError.badRequest('Отдел не найден'));
            }



            // Обновляем данные
            if (name) dep.name = name;

            await dep.save();
            return res.json(dep);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    // 🔹 5. Удалить задачу
    async deleteDep(req, res, next) {
        try {
            const { id } = req.params;

            const dep = await Department.findByPk(id);
            if (!dep) {
                return next(ApiError.badRequest('Отдел не найден'));
            }

            await dep.destroy();
            return res.json({ message: 'Задача удалена' });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new DepartmentController();
