import React from 'react';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import {Link} from 'react-router-dom';

import Button from 'components/button';
import InputBox from 'components/inputBox';

const Login = () => {
    const navigate = useNavigate();

    const setLogin = () => {
        navigate('/');
    };

    const setRegister = () => {
        navigate('/join');
    };

    return (
        <div className="mt-40">
            <div className="w-full max-w-sm mx-auto overflow-hidden dark:bg-gray-800">
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Login</h2>
                    <form>
                        <InputBox type="text" placeholder="userName" ariaLabel="email" />
                        <InputBox type="password" placeholder="password" ariaLabel="password" />
                        <div className="flex items-center justify-between mt-4">
                            <Button contents="회원가입" onClick={() => setRegister()} />

                            <Button contents="로그인" onClick={() => setLogin()} />
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <Link to="/" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">
                        비밀번호 찾기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
