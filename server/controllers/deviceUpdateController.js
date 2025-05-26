const { DeviceUpdate, Device } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const uuid = require('uuid')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dnxnis6iq',
    api_key: '253861488465722',
    api_secret: 'Bc55vOLUPB_2en93XhBB1GmH7sY'
});

class DeviceUpdateController {
    async getAll(req, res, next) {
        try {
            const updates = await DeviceUpdate.findAll({ include: Device });
            res.json(updates);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAllByDeviceId(req, res, next) {
        try {
            const {deviceId} = req.params
            const updates = await DeviceUpdate.findAll({where: deviceId, include: Device});
            res.json(updates);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getById(req, res, next) {
        try {
            const update = await DeviceUpdate.findByPk(req.params.id, { include: Device });
            if (!update) return res.status(404).json({ error: 'Update not found' });
            res.json(update);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

   async create(req, res, next) {
    try {
        const { deviceId, explain } = req.body;
        const { updateFile } = req.files;

        const extension = path.extname(updateFile.name);
        const fileName = uuid.v4() + extension;
        const tmpPath = path.resolve(__dirname, '..', 'uploads', fileName);

        // Сохраняем файл во временную директорию
        await updateFile.mv(tmpPath);

        // Загружаем в Cloudinary как raw-файл
       const result = await cloudinary.uploader.upload(tmpPath, {
            resource_type: 'raw',
            public_id: `device-updates/${fileName}`,
            type: 'upload' // 👈 гарантирует публичный доступ
        });


        // Удаляем временный файл
        fs.unlinkSync(tmpPath);

        // Проверим, существует ли устройство
        const device = await Device.findByPk(deviceId);
        if (!device) return res.status(404).json({ error: 'Device not found' });

        // Сохраняем ссылку на Cloudinary
        const newUpdate = await DeviceUpdate.create({
            deviceId,
            explain,
            updateFile: result.secure_url
        });

        res.status(201).json(newUpdate);
    } catch (err) {
        next(ApiError.badRequest(err.message));
    }
}

    async update(req, res, next) {
        try {
            const { id, deviceId, explain, updateFile } = req.body;
            const update = await DeviceUpdate.findByPk(id);
            if (!update) return res.status(404).json({ error: 'Update not found' });

            if (deviceId) {
                const device = await Device.findByPk(deviceId);
                if (!device) return res.status(404).json({ error: 'Device not found' });
            }

            await update.update({ deviceId, explain, updateFile });
            res.json(update);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const update = await DeviceUpdate.findByPk(req.body.id);
            if (!update) return res.status(404).json({ error: 'Update not found' });

            await update.destroy();
            res.json({ message: 'Update deleted successfully' });
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new DeviceUpdateController();
