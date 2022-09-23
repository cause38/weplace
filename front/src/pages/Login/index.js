import React, {useState} from 'react';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import {Link} from 'react-router-dom';

import Button from 'components/button';
import InputBox from 'components/inputBox';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const setLogin = () => {
        console.log(id, pw);
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
                    console.log('res', response);
                    if (response.data.state === 200) {
                        navigate('/');
                    } else if (response.data.state === 400) {
                        alert(response.data.msg);
                    } else if (response.data.state === 401) {
                        alert(response.data.msg);
                    }
                });
        }
        // if (id.length <= 0) {
        //     return alert(`아이디를 입력해 주세요.`);
        // } else if (pw.length <= 0) {
        //     return alert(`비밀번호를 입력해 주세요.`);
        // } else {
        //     fetch(`http://place-api.weballin.com/auth/login`, {
        //         method: 'POST',
        //         mode: 'no-cors',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Credentials': true,
        //         },
        //         body: JSON.stringify({
        //             id: id,
        //             pw: pw,
        //         }),
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log('data', data);
        //             if (data.state === 'OK') {
        //                 navigate('/');
        //             } else if (data.state !== 'OK') {
        //                 alert('아이디와 비밀번호를 확인 해 주세요');
        //             }
        //         });
        // }
    };

    const setRegister = () => {
        navigate('/join');
    };

    return (
        <div className="mt-40">
            <div className="w-full max-w-sm mx-auto overflow-hidden ">
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-bold text-center text-gray-700 ">Login</h2>
                    <form>
                        <InputBox
                            type="email"
                            placeholder="user name"
                            ariaLabel="user-name"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <InputBox
                            type="password"
                            placeholder="password"
                            ariaLabel="password"
                            value={pw}
                            onChange={e => setPw(e.target.value)}
                        />
                        <div className="flex items-center justify-between mt-4">
                            <div className="w-[45%]">
                                <Button contents="회원가입" onClick={() => setRegister()} />
                            </div>
                            <div className="w-[45%]">
                                <Button contents="로그인" onClick={setLogin} />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
                    <Link to="/find-password" className="text-sm text-gray-600 hover:text-gray-500">
                        비밀번호 찾기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
