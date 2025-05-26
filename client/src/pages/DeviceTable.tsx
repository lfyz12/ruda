import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import DeviceUpdatesModal from '../components/DeviceUpdatesModal';
import CreateDeviceModal from '../components/CreateDeviceModal';
import DeleteDeviceModal from '../components/DeleteDeviceModal';

const DeviceTable = observer(() => {
    const { deviceStore, employeeStore } = useContext(Context);
    const [showUpdatesModal, setShowUpdatesModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        deviceStore.fetchDevices();
    }, []);

    const openUpdates = (deviceId: number) => {
        deviceStore.fetchDeviceById(deviceId);
        setShowUpdatesModal(true);
    };

    const openDeleteModal = (deviceId: number) => {
        const device = deviceStore.devices.find(d => d.id === deviceId);
        if (device) {
            deviceStore.setSelectedDevice(device);
            setShowDeleteModal(true);
        }
    };

    return (
        <div className="ms-64 p-6 bg-white">
            {/* Заголовок и кнопка */}
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-orange-800">Список устройств</h2>
                {+employeeStore.employee.departmentId === 1 && <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-lg transition-colors shadow-md"
                >
                    Добавить устройство
                </button>}
            </div>

            {/* Таблица */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-orange-100">
                    <table
                        className="w-full divide-y divide-orange-200 min-w-[500px]"> {/* Уменьшена минимальная ширина */}
                        <thead className="bg-orange-50">
                        <tr>
                            <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-orange-600 uppercase">ID</th>
                            <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-orange-600 uppercase">Название</th>
                            <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-orange-600 uppercase hidden sm:table-cell">IP</th>
                            {/* Скрыт на маленьких экранах */}
                            <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-orange-600 uppercase">Статус</th>
                            <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-orange-600 uppercase">Действия</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-orange-200">
                        {deviceStore.devices.map(device => (
                            <tr key={device.id} className="hover:bg-orange-50 transition-colors">
                                <td className="px-2 sm:px-3 py-2 text-sm text-orange-900">{device.id}</td>
                                <td className="px-2 sm:px-3 py-2 text-sm font-medium text-orange-900">{device.name}</td>
                                <td className="px-2 sm:px-3 py-2 text-sm text-orange-700 hidden sm:table-cell">{device.ipAddress}</td>
                                {/* Скрыт на маленьких экранах */}
                                <td className="px-2 sm:px-3 py-2">
                                    <select
                                        value={device.status}
                                        onChange={async (e) => {
                                            await deviceStore.updateDevice(device.id, device.name, device.ipAddress, e.target.value);
                                        }}
                                        className="w-full px-2 py-1 text-xs sm:text-sm rounded-md border border-orange-200 bg-white focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="online" className="text-green-600">online</option>
                                        <option value="offline" className="text-red-600">offline</option>
                                    </select>
                                </td>
                                <td className="px-2 sm:px-3 py-2 space-y-1 sm:space-y-0 sm:space-x-1">
                                    <button
                                        onClick={() => openUpdates(device.id)}
                                        className="w-full sm:w-auto text-center text-orange-600 hover:bg-orange-100 text-xs sm:text-sm font-medium px-2 py-1 rounded-md border border-orange-200 transition-colors"
                                    >
                                        Обновления
                                    </button>
                                    {employeeStore.employee.role === 'ADMIN' && <button
                                        onClick={() => openDeleteModal(device.id)}
                                        className="w-full sm:w-auto text-center text-red-600 hover:bg-red-100 text-xs sm:text-sm font-medium px-2 py-1 rounded-md border border-red-200 transition-colors"
                                    >
                                        Удалить
                                    </button>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>

            {/* Модальные окна */}
            {showUpdatesModal && <DeviceUpdatesModal onClose={() => setShowUpdatesModal(false)}/>}
            {showCreateModal && <CreateDeviceModal onClose={() => setShowCreateModal(false)}/>}
            {showDeleteModal && <DeleteDeviceModal onClose={() => setShowDeleteModal(false)}/>}
        </div>
    );
});

export default DeviceTable;
