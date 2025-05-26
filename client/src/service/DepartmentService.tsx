import { AxiosResponse } from "axios";
import { $authHost } from "../http";

export default class DepartmentService {
    // 🔹 Создание отдела
    static async createDepartment(name: string): Promise<AxiosResponse> {
        return $authHost.post('/api/department', { name });
    }

    // 🔹 Получить все отделы
    static async getAllDepartments(): Promise<AxiosResponse> {
        return $authHost.get('/api/department');
    }

    // 🔹 Получить отдел по ID
    static async getDepartmentById(id: number): Promise<AxiosResponse> {
        return $authHost.get(`/api/department/${id}`);
    }

    // 🔹 Обновить отдел по ID
    static async updateDepartment(id: number, name: string): Promise<AxiosResponse> {
        return $authHost.post(`/api/department/${id}`, { name });
    }

    // 🔹 Удалить отдел по ID
    static async deleteDepartment(id: number): Promise<AxiosResponse> {
        return $authHost.delete(`/api/department/${id}`);
    }
}
