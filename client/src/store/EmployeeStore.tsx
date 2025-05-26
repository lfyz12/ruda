import { makeAutoObservable, runInAction } from "mobx";
import EmployeeService from "../service/EmployeeService";
import { IEmployee } from "../models/IEmployee/IEmployee";

export class EmployeeStore {
    isAuth = false;
    employee = {} as IEmployee;
    employeeList: IEmployee[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setEmployee(employee: IEmployee) {
        this.employee = employee;
    }

    setEmployeeList(list: IEmployee[]) {
        this.employeeList = list;
    }

    setLoading(state: boolean) {
        this.isLoading = state;
    }

    setError(error: string | null) {
        this.error = error;
    }

    async register(name: string, email: string, departmentId: number, password: string, role: string) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await EmployeeService.registration(name, email, departmentId, password, role);
        } catch (e: any) {
            this.setError(e.response?.data?.message || "Registration failed");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async login(email: string, password: string) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await EmployeeService.login(email, password);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            runInAction(() => {
                this.setEmployee(response.data.User);
                this.setIsAuth(true);
            });
        } catch (e: any) {
            this.setError(e.response?.data?.message || "Login failed");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setLoading(true);
        this.setError(null);
        try {
            await EmployeeService.logout();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            runInAction(() => {
                this.setEmployee({} as IEmployee);
                this.setIsAuth(false);
            });
        } catch (e: any) {
            this.setError("Logout failed");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        this.setError(null);
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) throw new Error("No refresh token found");

            const response = await EmployeeService.checkAuth(refreshToken);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            runInAction(() => {
                this.setIsAuth(true);
                this.setEmployee(response.data.user);
            });
        } catch (e: any) {
            this.setError("Auth check failed");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async getById(id: number) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await EmployeeService.getById(id);
            this.setEmployee(response.data);
        } catch (e: any) {
            this.setError("Failed to fetch employee");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async getAll() {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await EmployeeService.getAll();
            this.setEmployeeList(response.data);
        } catch (e: any) {
            this.setError("Failed to fetch employee list");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }
}
