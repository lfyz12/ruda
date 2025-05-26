import { makeAutoObservable, runInAction } from "mobx";
import DepartmentService from "../service/DepartmentService";
import { IDepartment } from "../models/IDepartment/IDepartment";

export class DepartmentStore {
    departments: IDepartment[] = [];
    currentDepartment = {} as IDepartment;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setDepartments(departments: IDepartment[]) {
        this.departments = departments;
    }

    setCurrentDepartment(department: IDepartment) {
        this.currentDepartment = department;
    }

    setLoading(state: boolean) {
        this.isLoading = state;
    }

    setError(error: string | null) {
        this.error = error;
    }

    async fetchDepartments() {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await DepartmentService.getAllDepartments();
            runInAction(() => {
                this.setDepartments(response.data);
            });
        } catch (e: any) {
            this.setError("Не удалось загрузить отделы");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async getDepartmentById(id: number) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await DepartmentService.getDepartmentById(id);
            runInAction(() => {
                this.setCurrentDepartment(response.data);
            });
        } catch (e: any) {
            this.setError("Не удалось получить отдел");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async createDepartment(name: string) {
        this.setLoading(true);
        this.setError(null);
        try {
            await DepartmentService.createDepartment(name);
            await this.fetchDepartments(); // обновим список
        } catch (e: any) {
            this.setError("Не удалось создать отдел");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async updateDepartment(id: number, name: string) {
        this.setLoading(true);
        this.setError(null);
        try {
            await DepartmentService.updateDepartment(id, name);
            await this.fetchDepartments(); // обновим список
        } catch (e: any) {
            this.setError("Не удалось обновить отдел");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteDepartment(id: number) {
        this.setLoading(true);
        this.setError(null);
        try {
            await DepartmentService.deleteDepartment(id);
            runInAction(() => {
                this.setDepartments(this.departments.filter(d => d.id !== id));
            });
        } catch (e: any) {
            this.setError("Не удалось удалить отдел");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }
}
