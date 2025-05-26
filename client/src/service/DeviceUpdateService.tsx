import { AxiosResponse } from "axios";
import { $authHost } from "../http";

export default class DeviceUpdateService {
    // 🔹 Создать обновление с файлом
    static async createUpdate(deviceId: number, explain: string, updateFile: File): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('deviceId', deviceId.toString());
        formData.append('explain', explain);
        formData.append('updateFile', updateFile);

        return $authHost.post('/api/deviceUpdate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    // 🔹 Получить все обновления
    static async getAllUpdates(): Promise<AxiosResponse> {
        return $authHost.get('/api/deviceUpdate');
    }

    // 🔹 Получить обновление по ID
    static async getUpdateById(id: number): Promise<AxiosResponse> {
        return $authHost.get(`/api/deviceUpdate/${id}`);
    }

    static async getUpdateByDeviceId(id: number): Promise<AxiosResponse> {
        return $authHost.get(`/api/deviceUpdate/getByDevice/${id}`);
    }

    // 🔹 Обновить обновление
    static async updateUpdate(id: number, deviceId: number, explain: string, updateFile?: string): Promise<AxiosResponse> {
        return $authHost.post('/api/deviceUpdate/update', {
            id,
            deviceId,
            explain,
            updateFile, // строка, как в бэке — это просто имя файла, не объект File
        });
    }

    // 🔹 Удалить обновление
    static async deleteUpdate(id: number): Promise<AxiosResponse> {
        return $authHost.post('/api/device-update/delete', { id });
    }
}
