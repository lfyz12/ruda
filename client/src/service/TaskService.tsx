import {AxiosResponse} from "axios";
import {$authHost} from "../http";

export default class TaskService {
    static async createTask(title: string, description: string, status: string): Promise<AxiosResponse> {
        return $authHost.post('/api/ticket', {title, description, status})
    }

    static async getTask(userId: number): Promise<AxiosResponse> {
        return $authHost.get(`/api/ticket?id=${userId}`)
    }

    static async getTasks(): Promise<AxiosResponse> {
        return $authHost.get(`/api/ticket`)
    }

    static async updateTask(id:number, userId: number, title: string, description: string, status: string): Promise<AxiosResponse> {
        return $authHost.post('/api/ticket/update?id=' + id, {userId, title, description, status})
    }

    static async delTask(id: number): Promise<AxiosResponse> {
        return $authHost.delete('/api/ticket?id=' + id)
    }
}