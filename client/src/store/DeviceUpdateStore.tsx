import { makeAutoObservable } from "mobx";
import DeviceUpdateService from "../service/DeviceUpdateService";
import { IDeviceUpdate } from "../models/IDeviceUppdate/IDeviceUpdate";

export class DeviceUpdateStore {
    updates: IDeviceUpdate[] = [];
    selectedUpdate: IDeviceUpdate | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUpdates(updates: IDeviceUpdate[]) {
        this.updates = updates;
    }

    setSelectedUpdate(update: IDeviceUpdate | null) {
        this.selectedUpdate = update;
    }

    async fetchAllUpdates() {
        try {
            const response = await DeviceUpdateService.getAllUpdates();
            this.setUpdates(response.data);
        } catch (e) {
            console.error("Ошибка при получении обновлений:", e);
        }
    }

    async fetchUpdateById(id: number) {
        try {
            const response = await DeviceUpdateService.getUpdateById(id);
            this.setSelectedUpdate(response.data);
        } catch (e) {
            console.error("Ошибка при получении обновления:", e);
        }
    }

    async fetchUpdatesByDeviceId(deviceId: number) {
        try {
            const response = await DeviceUpdateService.getAllUpdates();
            const filtered = response.data.filter((u: IDeviceUpdate) => u.deviceId === deviceId);
            this.setUpdates(filtered);
        } catch (e) {
            console.error("Ошибка при фильтрации обновлений:", e);
        }
    }

    async createUpdate(deviceId: number, explain: string, updateFile: File) {
        try {
            await DeviceUpdateService.createUpdate(deviceId, explain, updateFile);
            await this.fetchUpdatesByDeviceId(deviceId);
        } catch (e) {
            console.error("Ошибка при создании обновления:", e);
        }
    }

    async updateUpdate(id: number, deviceId: number, explain: string, updateFile?: string) {
        try {
            await DeviceUpdateService.updateUpdate(id, deviceId, explain, updateFile);
            await this.fetchUpdatesByDeviceId(deviceId);
        } catch (e) {
            console.error("Ошибка при обновлении:", e);
        }
    }

    async deleteUpdate(id: number, deviceId: number) {
        try {
            await DeviceUpdateService.deleteUpdate(id);
            await this.fetchUpdatesByDeviceId(deviceId);
        } catch (e) {
            console.error("Ошибка при удалении обновления:", e);
        }
    }
}
