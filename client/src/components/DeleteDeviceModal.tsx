import React, { useContext } from 'react';
import { Context } from '../index';

const DeleteDeviceModal = ({ onClose }: { onClose: () => void }) => {
    const { deviceStore } = useContext(Context);
    const device = deviceStore.selectedDevice;

    const handleDelete = async () => {
        if (device) {
            await deviceStore.deleteDevice(device.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                <h3 className="text-lg font-bold text-orange-700 mb-4">Удалить устройство</h3>
                <p className="text-gray-600 mb-6">
                    Вы действительно хотите удалить <b className="text-orange-700">{device?.name}</b>?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        onClick={handleDelete}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDeviceModal;
