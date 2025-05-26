import { makeAutoObservable } from "mobx";
import DeviceService from "../service/DeviceService";
import { IDevice } from "../models/IDevice/IDevice";

export class DeviceStore {
    devices: IDevice[] = [];
    selectedDevice: IDevice | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setDevices(devices: IDevice[]) {
        this.devices = devices;
    }

    setSelectedDevice(device: IDevice | null) {
        this.selectedDevice = device;
    }

    async fetchDevices() {
        try {
            const response = await DeviceService.getAllDevices();
            this.setDevices(response.data);
        } catch (e) {
            console.error("Ошибка при получении устройств:", e);
        }
    }

    async fetchDeviceById(id: number) {
        try {
            const response = await DeviceService.getDeviceById(id);
            this.setSelectedDevice(response.data);
        } catch (e) {
            console.error("Ошибка при получении устройства:", e);
        }
    }

    async createDevice(name: string, ipAddress: string, status: string) {
        try {
            await DeviceService.createDevice(name, ipAddress, status);
            await this.fetchDevices();
        } catch (e) {
            console.error("Ошибка при создании устройства:", e);
        }
    }

    async updateDevice(id: number, name: string, ipAddress: string, status: string) {
        try {
            await DeviceService.updateDevice(id, name, ipAddress, status);
            await this.fetchDevices();
        } catch (e) {
            console.error("Ошибка при обновлении устройства:", e);
        }
    }

    async deleteDevice(id: number) {
        try {
            await DeviceService.deleteDevice(id);
            await this.fetchDevices();
        } catch (e) {
            console.error("Ошибка при удалении устройства:", e);
        }
    }
}
