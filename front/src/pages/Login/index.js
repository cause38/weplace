import React, {useState, useEffect} from 'react';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import {Link} from 'react-router-dom';

import Button from 'components/button';
import InputBox from 'components/inputBox';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    // 토큰
    const getToken = sessionStorage.getItem('token');

    // input value
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 토큰이 있으면 메인페이지로 이동
    useEffect(() => {
        if (getToken !== null) {
            navigate('/');
        }
    }, []);

    // 토큰생성
    const handleToken = id => {
        if (getToken === null) {
            sessionStorage.setItem('token', id);
        }
    };

    // 로그인
    const setLogin = () => {
        if (id.length < 1) {
            alert(`아이디를 입력해 주세요.`);
        } else if (pw.length < 1) {
            alert(`비밀번호를 입력해 주세요.`);
        } else {
            axios
                .post('http://place-api.weballin.com/auth/login', {
                    id: id,
                    pw: pw,
                })
                .then(response => {
                    if (response.data.state === 200) {
                        handleToken(response.data.data.id);
                        navigate(-1);
                    } else if (response.data.state === 400) {
                        alert(response.data.msg);
                    } else if (response.data.state === 401) {
                        alert(response.data.msg);
                    }
                });
        }
    };

    // 회원가입
    const setRegister = () => {
        navigate('/join');
    };

    return (
        <div className="container-wb">
            <div className="w-full max-w-lg mx-auto overflow-hidden">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-gray-700 ">Login</h2>
                    <form>
                        <InputBox
                            type="email"
                            placeholder="user name"
                            ariaLabel="user-name"
                            value={id}
                            onChange={setId}
                        />
                        <InputBox
                            type="password"
                            placeholder="password"
                            ariaLabel="password"
                            value={pw}
                            onChange={setPw}
                        />
                        <div className="flex items-center justify-between mt-4">
                            <div className="w-[45%] h-[40px]">
                                <Button contents="회원가입" onClick={setRegister} />
                            </div>
                            <div className="w-[45%] h-[40px]">
                                <Button contents="로그인" onClick={setLogin} />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 mt-7">
                    <Link to="/find-password" className="text-sm text-gray-600 hover:text-gray-500">
                        비밀번호 찾기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
