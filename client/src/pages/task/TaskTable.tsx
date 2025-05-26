import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import {IEmployee} from "../../models/IEmployee/IEmployee";
import {ITask} from "../../models/ITask/ITask";

const TaskTable = observer(() => {
    const { taskStore, employeeStore } = useContext(Context);
    const [statusFilter, setStatusFilter] = useState('');
    const [employeeFilter, setEmployeeFilter] = useState('');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending',
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        taskStore.fetchTasks();
    }, [statusFilter, employeeFilter]);

    useEffect(() => {
        employeeStore.getAll();
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        await taskStore.createTask(
            newTask.title,
            newTask.description,
            newTask.status
        );
        setShowModal(false);
        await taskStore.fetchTasks();
        setNewTask({ title: '', description: '', status: 'pending'});
    };

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        const task = taskStore.tasks.find(t => t.id === taskId);
        if (task) {
            await taskStore.updateTask(
                taskId,
                task.userId,
                task.title,
                task.description,
                newStatus
            );
            taskStore.setTasks(taskStore.tasks.map(t =>
                t.id === taskId ? {...t, status: newStatus} : t
            ));
        }
    };

    const handleTaketask = async (taskId: number, userId: number) => {
        const task = taskStore.tasks.find(t => t.id === taskId);
        if (task) {
            await taskStore.updateTask(
                taskId,
                userId,
                task.title,
                task.description,
                task.status
            );
            taskStore.setTasks(taskStore.tasks.map(t =>
                t.id === taskId ? {...t, userId: userId} : t
            ));
        }
    };

    const filteredTasks = taskStore.tasks.filter(task =>
        (statusFilter ? task.status === statusFilter : true) &&
        (employeeFilter ? task.userId === Number(employeeFilter) : true)
    ).sort((a: ITask, b:ITask ) => a.id - b.id);

    const statusStyles = {
        pending: 'bg-orange-100 text-orange-800',
        in_progress: 'bg-amber-100 text-amber-800',
        completed: 'bg-green-100 text-green-800'
    };

    const formatEmployeeName = (employee: IEmployee) =>
        `${employee.name}`;

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-orange-100">
            {/* Фильтры */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between bg-orange-50 p-4 rounded-lg shadow">
                <div className="flex flex-wrap gap-4 flex-1">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                        <select
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                        >
                            <option value="">Все статусы</option>
                            <option value="pending">Ожидание</option>
                            <option value="in_progress">В процессе</option>
                            <option value="completed">Завершено</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Исполнитель</label>
                        <select
                            className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                            value={employeeFilter}
                            onChange={e => setEmployeeFilter(e.target.value)}
                        >
                            <option value="">Все исполнители</option>
                            {employeeStore.employeeList.map(employee => (
                                <option key={employee.id} value={employee.id}>
                                    {formatEmployeeName(employee)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-md"
                    onClick={() => setShowModal(true)}
                >
                    + Создать задачу
                </button>
            </div>

            {/* Модальное окно создания */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md border border-orange-100">
                        <h2 className="text-xl font-bold mb-4">Новая задача</h2>
                        <form onSubmit={handleCreateTask}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Название</label>
                                    <input
                                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                                        value={newTask.title}
                                        onChange={e => setNewTask({...newTask, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Описание</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500"
                                        value={newTask.description}
                                        onChange={e => setNewTask({...newTask, description: e.target.value})}
                                    />
                                </div>

                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-md"
                                    onClick={() => setShowModal(false)}
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 shadow-md"
                                >
                                    Создать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Таблица */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-orange-100">
                <table className="w-full divide-y divide-orange-200">
                    <thead className="bg-orange-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Название</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Описание</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Исполнитель</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Статус</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-orange-200">
                    {filteredTasks.map(task => {
                        const employee = task.userId !== 1 ? employeeStore.employeeList.find(e => e.id === task.userId) : null;
                        return (
                            <tr key={task.id} className="hover:bg-orange-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-900">{task.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{task.title}</td>
                                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{task.description}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">
                                    {
                                        employee !== null ? employee ? formatEmployeeName(employee) : `#${task.userId}` :
                                            <span>Не назначено</span>
                                    }

                                </td>
                                <td className="px-4 py-3">
                                    {+employeeStore.employee.departmentId === 1 ? <select
                                        className={`px-3 py-1 text-sm rounded-full focus:ring-2 focus:ring-orange-500 
                                        ${task.status === 'pending' ? 'bg-orange-100 text-orange-800' : task.status === 'in_progress' ?
                                            'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}
                                        value={task.status}
                                        disabled={task.userId === 1}
                                        onChange={e => handleStatusChange(task.id, e.target.value)}
                                    >
                                        <option value="pending">Ожидание</option>
                                        <option value="in_progress">В процессе</option>
                                        <option value="completed">Завершено</option>
                                    </select> :
                                    <span>{task.status === 'pending' ? 'Ожидание' : task.status === 'in_progress' ? 'В процессе' : 'Завершено'}</span>}
                                </td>
                                <td className="px-4 py-3 flex gap-5">
                                    {employeeStore.employee.role === 'ADMIN' && <button
                                        onClick={() => taskStore.deleteTask(task.id)}
                                        className="text-orange-600 hover:text-orange-800 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </button>}
                                    {+employeeStore.employee.departmentId === 1 && <button onClick={() => handleTaketask(task.id, employeeStore.employee.id)} className='px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 shadow-md'>
                                        Взять задачу
                                    </button>}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            {filteredTasks.length === 0 && (
                <div className="mt-6 text-center py-8 bg-white rounded-lg border border-orange-100">
                    <p className="text-orange-600">Задачи не найдены</p>
                </div>
            )}
        </div>
    );
});

export default TaskTable;