import React, {FC, useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {DASHBOARDROUTER, LOGINROUTER, REGISTROUTER} from "../../utils/consts";
import {Context} from "../../index";
import ErrorModal from "../../components/ErrorModal";

interface AuthFormProps {
    isLogin: boolean
}

const AuthForm: FC<AuthFormProps> = ({isLogin}: AuthFormProps) => {
    const {employeeStore} = useContext(Context)
    const navigation = useNavigate()

    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const login = async () => {
        if (email && password) await employeeStore.login(email, password)
    }

    const click = async () => {

            await login().catch(err => {
                setError(employeeStore.error)
            })

        navigation('/dashboard')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg space-y-8 border border-orange-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
                        {'Добро пожаловать!'}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {'Войдите в свой аккаунт'}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-11 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                placeholder="example@mail.com"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-11 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                placeholder="••••••••"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </div>
                    </div>


                    <button
                        type="button"
                        onClick={click}
                        className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Войти
                    </button>
                </div>

            </form>
            {error !== null && <ErrorModal message={error} onClose={() => setError(null)}/>}
        </div>
    );
};

export default AuthForm;