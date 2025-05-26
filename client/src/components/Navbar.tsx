import React, {useContext} from 'react';
import {
    ADMINROUTER,
    DASHBOARDROUTER,
    DEVICEROUTER,
    TASKLOGROUTER,
    TASKROUTER,
    WORKSESSIONROUTER
} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {Context} from "../index";

const Navbar = () => {
    const {employeeStore} = useContext(Context)

    const logout = async () => {
        await employeeStore.logout()
    }

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white p-6 flex flex-col border-r border-orange-200 z-50">
            {/* Заголовок */}
            <div className="mb-10">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
                    Рудодобыча
                </h1>
                <p className="text-sm text-gray-600 mt-1">предприятие</p>
            </div>

            {/* Навигационные кнопки */}
            <nav className="flex-1 space-y-2">
                {[
                    { name: 'Дэшборд', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: DASHBOARDROUTER },
                    { name: 'Рабочие сессии', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', path: WORKSESSIONROUTER },
                    { name: 'Задачи', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', path: TASKROUTER },
                    { name: 'Отслеживание задач', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', path: TASKLOGROUTER },
                    { name: 'Компьютеры', icon: 'M4 6h16M4 12h16m-7 6h7', path: DEVICEROUTER },
                ].map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                isActive
                                    ? 'bg-orange-100 bg-opacity-50 translate-x-2'
                                    : 'hover:bg-orange-50 hover:bg-opacity-50 hover:translate-x-2'
                            }`}
                    >
                        <svg
                            className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                        </svg>
                        <span className="text-gray-700 group-hover:text-orange-600">{item.name}</span>
                    </NavLink>
                ))}
                {employeeStore.employee.role === 'ADMIN' &&
                    <NavLink
                        to={ADMINROUTER}
                        className={({ isActive }) =>
                            `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                isActive
                                    ? 'bg-orange-100 bg-opacity-50 translate-x-2'
                                    : 'hover:bg-orange-50 hover:bg-opacity-50 hover:translate-x-2'
                            }`}
                    >
                        <svg
                            className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'} />
                        </svg>
                        <span className="text-gray-700 group-hover:text-orange-600">Админпанель</span>
                    </NavLink>}
            </nav>

            {/* Кнопка выхода */}
            <div className="border-t border-orange-200 pt-4 mt-4">
                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-orange-500 hover:bg-opacity-50 group"
                >
                    <svg
                        className="w-5 h-5 text-orange-500 group-hover:text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-orange-500 group-hover:text-orange-600">Выйти</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;