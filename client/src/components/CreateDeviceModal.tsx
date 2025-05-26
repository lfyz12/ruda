import React, { useState, useContext } from 'react';
import { Context } from '../index';

const CreateDeviceModal = ({ onClose }: { onClose: () => void }) => {
    const { deviceStore } = useContext(Context);
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [status, setStatus] = useState('online');

    const handleCreate = async () => {
        await deviceStore.createDevice(name, ip, status);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                <h3 className="text-lg font-bold text-orange-700 mb-4">Добавить устройство</h3>

                <input
                    type="text"
                    placeholder="Название"
                    className="w-full mb-4 px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="IP-адрес"
                    className="w-full mb-4 px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={ip}
                    onChange={e => setIp(e.target.value)}
                />

                <select
                    className="w-full mb-6 px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        onClick={handleCreate}
                    >
                        Создать
                    </button>
                    <button
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDeviceModal;
