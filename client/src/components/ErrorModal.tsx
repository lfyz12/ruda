import React from "react";

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-orange-800">Ошибка</h3>
                    <button
                        onClick={onClose}
                        className="text-orange-600 hover:text-orange-800 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="text-orange-700 mb-4 whitespace-pre-wrap">
                    {message}
                </div>

                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-md"
                >
                    Понятно
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;