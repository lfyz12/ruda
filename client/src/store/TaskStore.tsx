import { makeAutoObservable, runInAction } from "mobx";
import TaskService from "../service/TaskService";
import { ITask } from "../models/ITask/ITask";
import { taskTimeLogStore } from "../index";

export class TaskStore {
    tasks: ITask[] = [];
    task = {} as ITask;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTasks(tasks: ITask[]) {
        this.tasks = tasks;
    }

    setTask(task: ITask) {
        this.task = task;
    }

    setLoading(state: boolean) {
        this.isLoading = state;
    }

    setError(error: string | null) {
        this.error = error;
    }

    async createTask(title: string, description: string, status: string): Promise<void> {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await TaskService.createTask(title, description, status);
            runInAction(() => {
                this.setTask(response.data); // добавляем задачу сразу
            });
        } catch (e: any) {
            this.setError("Ошибка при создании задачи");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async getTaskById(id: number): Promise<void> {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await TaskService.getTask(id); // API ожидает id задачи
            runInAction(() => {
                this.setTask(response.data);
            });
        } catch (e: any) {
            this.setError("Ошибка при получении задачи");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchTasks(): Promise<void> {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await TaskService.getTasks();
            runInAction(() => {
                this.setTasks(response.data);
            });
        } catch (e: any) {
            this.setError("Ошибка при получении списка задач");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async updateTask(id: number, userId: number, title: string, description: string, status: string): Promise<void> {
        this.setLoading(true);
        this.setError(null);
        try {
            await TaskService.updateTask(id, userId, title, description, status);

            // Обновление времени
            if (status === "in_progress") {
                await taskTimeLogStore.startTimeLog(userId, id, new Date());
            } else if (status === "completed") {
                const activeLog = taskTimeLogStore.logs.find(
                    log => log.id === id && !log.end_time
                );
                if (activeLog) {
                    await taskTimeLogStore.endTimeLog(activeLog.id, new Date());
                }
            }

            // Обновляем задачу в списке
            await this.fetchTasks();
        } catch (e: any) {
            this.setError("Ошибка при обновлении задачи");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteTask(id: number): Promise<void> {
        this.setLoading(true);
        this.setError(null);
        try {
            await TaskService.delTask(id);
            runInAction(() => {
                this.setTasks(this.tasks.filter(task => task.id !== id));
            });
        } catch (e: any) {
            this.setError("Ошибка при удалении задачи");
            throw e;
        } finally {
            this.setLoading(false);
        }
    }
}
