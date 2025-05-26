import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const DeviceUpdatesModal = observer(({ onClose }: { onClose: () => void }) => {
    const { deviceStore, deviceUpdateStore, employeeStore } = useContext(Context);
    const device = deviceStore.selectedDevice;

    useEffect(() => {
        if (device) {
            deviceUpdateStore.fetchUpdatesByDeviceId(device.id);
        }
    }, [device]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg">
                <h3 className="text-lg font-bold text-orange-700 mb-4">Обновления устройства: {device?.name}</h3>

                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-orange-200">
                        <thead className="bg-orange-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Описание</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Файл</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Дата</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-orange-200">
                        {deviceUpdateStore.updates.map(update => (
                            <tr key={update.id} className="hover:bg-orange-50">
                                <td className="px-4 py-3 text-sm text-gray-700">{update.id}</td>
                                <td className="px-4 py-3 text-sm text-orange-900">{update.explain}</td>
                                <td className="px-4 py-3 text-sm text-blue-600 hover:underline">
                                    <a
                                        href={update.updateFile}
                                        target="_blank"
                                        download
                                    >
                                        Скачать
                                    </a>
                                </td>

                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(update.createdAt!).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {(+employeeStore.employee.departmentId === 1 || employeeStore.employee.role === 'ADMIN') && <form
                    className="mt-6 border-t border-orange-200 pt-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!device) return;

                        const formData = new FormData(e.currentTarget);
                        const explain = formData.get("explain") as string;
                        const file = formData.get("file") as File;

                        try {
                            await deviceUpdateStore.createUpdate(device.id, explain, file);
                            e.currentTarget.reset();
                        } catch (err) {
                            console.error("Ошибка при создании обновления", err);
                        }
                    }}
                >
                    <h4 className="text-md font-semibold text-orange-800 mb-2">Добавить обновление</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="explain"
                            required
                            placeholder="Описание обновления"
                            className="border rounded-lg px-3 py-2"
                        />
                        <input
                            name="file"
                            type="file"
                            required
                            accept=".zip,.rar,.7z,.exe,.txt,.docx"
                            className="border rounded-lg px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Сохранить
                    </button>
                </form>}


                <div className="mt-6 flex justify-end">
                    <button
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
});

export default DeviceUpdatesModal;
