const { Device } = require('../models/models');
const ApiError = require('../error/ApiError');
class DeviceController {
    async getAll(req, res, next) {
        try {
            const devices = await Device.findAll();
            res.json(devices);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch devices' });
        }
    }

    async getById(req, res, next) {
        try {
            const device = await Device.findByPk(req.params.id);
            if (!device) return res.status(404).json({ error: 'Device not found' });
            res.json(device);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async create(req, res, next) {
        try {
            const { name, ipAddress, status } = req.body;
            const newDevice = await Device.create({ name, ipAddress, status });
            res.status(201).json(newDevice);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, ipAddress, status } = req.body;
            const device = await Device.findByPk(id);
            if (!device) return res.status(404).json({ error: 'Device not found' });

            await device.update({ name, ipAddress, status });
            res.json(device);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const device = await Device.findByPk(req.body.id);
            if (!device) return res.status(404).json({ error: 'Device not found' });

            await device.destroy();
            res.json({ message: 'Device deleted successfully' });
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new DeviceController();
