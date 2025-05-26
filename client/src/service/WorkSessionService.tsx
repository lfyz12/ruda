import {AxiosResponse} from "axios";
import {$authHost} from "../http";

export default class WorkSessionService {
    static async startSession(userId: number): Promise<AxiosResponse> {
        return $authHost.post('/api/workSession/start', {userId})
    }

    static async endSession(userId: number): Promise<AxiosResponse> {
        return $authHost.post('/api/workSession/end', {userId})
    }

    static async getSessions(): Promise<AxiosResponse> {
        return $authHost.get('/api/workSession')
    }

    static async delSessions(id: number): Promise<AxiosResponse> {
        return $authHost.delete('/api/workSession/' + id)
    }
}