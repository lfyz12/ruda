import {AxiosResponse} from "axios";
import {$authHost} from "../http";

export default class TaskTimeLogService {
    static async startTimeLog(userId: number, ticketId: number, start_time: Date): Promise<AxiosResponse> {
        return $authHost.post('/api/taskTimeLog', {userId, ticketId, start_time})
    }

    static async endTimeLog(id: number, end_time: Date): Promise<AxiosResponse> {
        return $authHost.put('/api/taskTimeLog/' + id, {end_time})
    }

    static async getAll(): Promise<AxiosResponse> {
        return $authHost.get('/api/taskTimeLog')
    }

    static async getByEmployee(userId: number): Promise<AxiosResponse> {
        return $authHost.get('/api/taskTimeLog/user/' + userId)
    }

    static async getByTask(ticketId: number): Promise<AxiosResponse> {
        return $authHost.get('/api/taskTimeLog/ticket/' + ticketId)
    }

    static async delTaskTimeLog(id: number): Promise<AxiosResponse> {
        return $authHost.delete('/api/taskTimeLog/' + id)
    }
}