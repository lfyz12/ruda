import { AxiosResponse } from "axios";
import { $authHost } from "../http";

export default class DeviceService {
    // 🔹 Создать устройство
    static async createDevice(name: string, ipAddress: string, status: string): Promise<AxiosResponse> {
        return $authHost.post('/api/device', { name, ipAddress, status });
    }

    // 🔹 Получить все устройства
    static async getAllDevices(): Promise<AxiosResponse> {
        return $authHost.get('/api/device');
    }

    // 🔹 Получить устройство по ID
    static async getDeviceById(id: number): Promise<AxiosResponse> {
        return $authHost.get(`/api/device/${id}`);
    }

    // 🔹 Обновить устройство
    static async updateDevice(id: number, name: string, ipAddress: string, status: string): Promise<AxiosResponse> {
        return $authHost.post('/api/device/update', { id, name, ipAddress, status });
    }

    // 🔹 Удалить устройство
    static async deleteDevice(id: number): Promise<AxiosResponse> {
        return $authHost.post('/api/device/delete', { id });
    }
}
