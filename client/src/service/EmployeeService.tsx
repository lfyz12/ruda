import {AxiosResponse} from "axios";
import {$authHost, $host} from "../http";

export default class EmployeeService {
    static async registration(name: string, email: string, departmentId: number, password: string, role: string):Promise<AxiosResponse> {
        return $host.post('/api/user/createUser', {name, email, departmentId, password, role})
    }

    static async login(email: string, password: string):Promise<AxiosResponse> {
        return $host.post('/api/user/login', {email, password})
    }

    static async logout():Promise<AxiosResponse> {
        return $authHost.post('/api/user/logout', {})
    }

    static async checkAuth(token: string): Promise<AxiosResponse> {
        return $host.get('/api/user/refresh?refreshToken=' + token, { withCredentials: true })
    }

    static async getById(id: number): Promise<AxiosResponse> {
        return $authHost.post('/api/user/user', {id})
    }

    static async getAll(): Promise<AxiosResponse> {
        return $authHost.get('/api/user/users')
    }
}
