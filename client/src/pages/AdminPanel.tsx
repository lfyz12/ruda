import React, {useContext, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { IDepartment } from "../models/IDepartment/IDepartment";
import { IEmployee } from "../models/IEmployee/IEmployee";
import {Context} from "../index";

const AdminPanel = observer(() => {
    const { departmentStore, employeeStore } = useContext(Context);
    const [activeTab, setActiveTab] = useState('departments');
    const [newDepartmentName, setNewDepartmentName] = useState("");
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        departmentId: 0,
        password: "",
        role: ""
    });

    useEffect(() => {
        departmentStore.fetchDepartments();
        employeeStore.getAll();
    }, []);

    const handleCreateDepartment = async () => {
        if (!newDepartmentName.trim()) return;
        await departmentStore.createDepartment(newDepartmentName);
        setNewDepartmentName("");
    };

    const handleRegisterUser = async () => {
        const { name, email, departmentId, password, role } = newUser;
        if (!name || !email || !password || !role) return;
        await employeeStore.register(name, email, departmentId, password, role);
        await employeeStore.getAll();
        setNewUser({ name: "", email: "", departmentId: 0, password: "", role: "" });
    };

    return (
        <div className="p-4 sm:p-6 bg-orange-50 min-h-screen ml-0 sm:ml-64 transition-all">
            {/* Навигация по табам */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-orange-200">
                {['departments', 'users', 'employees'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                            ${activeTab === tab
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-orange-600 hover:bg-orange-100'}`}
                    >
                        {{
                            departments: 'Отделы',
                            users: 'Пользователи',
                            employees: 'Сотрудники'
                        }[tab]}
                    </button>
                ))}
            </div>

            {/* Создание отдела */}
            {activeTab === 'departments' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-orange-100 mb-6">
                    <h2 className="text-xl font-bold text-orange-800 mb-4">Управление отделами</h2>
                    <div className="flex flex-col sm:flex-row gap-3 items-start">
                        <input
                            className="w-full sm:w-64 px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            type="text"
                            placeholder="Название отдела"
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-md"
                            onClick={handleCreateDepartment}
                        >
                            Создать отдел
                        </button>
                    </div>
                    <ul className="mt-4 space-y-2">
                        {departmentStore.departments.map((dep: IDepartment) => (
                            <li
                                key={dep.id}
                                className="p-3 bg-orange-50 rounded-md border border-orange-100 flex justify-between items-center"
                            >
                                <span className="text-orange-900">{dep.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Регистрация пользователя */}
            {activeTab === 'users' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-orange-100 mb-6">
                    <h2 className="text-xl font-bold text-orange-800 mb-4">Регистрация пользователя</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            placeholder="Имя"
                            value={newUser.name}
                            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <select
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            value={newUser.departmentId}
                            onChange={e => setNewUser({ ...newUser, departmentId: Number(e.target.value) })}
                        >
                            <option value={0}>Выберите отдел</option>
                            {departmentStore.departments.map(dep => (
                                <option key={dep.id} value={dep.id}>{dep.name}</option>
                            ))}
                        </select>
                        <input
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            placeholder="Пароль"
                            type="password"
                            value={newUser.password}
                            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <select
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            value={newUser.role}
                            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="">Выберите роль</option>
                            <option value="ADMIN">Администратор</option>
                            <option value="USER">Сотрудник</option>
                        </select>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-md"
                        onClick={handleRegisterUser}
                    >
                        Зарегистрировать
                    </button>
                </div>
            )}

            {/* Список сотрудников */}
            {activeTab === 'employees' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-orange-200 min-w-[600px]">
                            <thead className="bg-orange-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Имя</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Отдел</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Роль</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-orange-200">
                            {employeeStore.employeeList.map((emp: IEmployee) => {
                                const dep = departmentStore.departments.find(d => d.id === +emp.departmentId);
                                return (
                                    <tr key={emp.id} className="hover:bg-orange-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-orange-900">{emp.name}</td>
                                        <td className="px-4 py-3 text-sm text-orange-900">{emp.email}</td>
                                        <td className="px-4 py-3 text-sm text-orange-700">{dep ? dep.name : "—"}</td>
                                        <td className="px-4 py-3 text-sm text-orange-700 capitalize">{emp.role}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
});

export default AdminPanel;