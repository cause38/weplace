import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from '../../../node_modules/react-router-dom/dist/index';
import {Link} from 'react-router-dom';

import Button from 'components/button';
import InputBox from 'components/inputBox';
import axios from 'axios';

import {useRecoilState} from '../../../node_modules/recoil/';
import {tokenValue, profileImgValue, nameValue} from 'atoms/state';
import API from 'config';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.state?.pathname;

    // 토큰
    const [getToken, setGetToken] = useRecoilState(tokenValue);

    // 프로필 이미지 url
    const [profileImg, setProfileImg] = useRecoilState(profileImgValue);

    // 프로필 닉네임
    const [name, setName] = useRecoilState(nameValue);

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
            setGetToken(id);
        }
    };

    // 유저정보 가져와서 세션저장
    const handleUser = id => {
        axios
            .get(`${API.myInfo}`, {
                params: {
                    token: id,
                },
            })
            .then(res => {
                if (res.data.state === 200) {
                    let name = res.data.data.basic.name;
                    let url = res.data.data.basic.thumb;
                    sessionStorage.setItem('profileImg', url);
                    sessionStorage.setItem('name', name);
                    setProfileImg(url);
                    setName(name);
                }
            });
    };

    // 로그인
    const setLogin = e => {
        e.preventDefault();
        if (id.length < 1) {
            alert(`아이디를 입력해 주세요.`);
        } else if (pw.length < 1) {
            alert(`비밀번호를 입력해 주세요.`);
        } else {
            axios
                .post(`${API.login}`, {
                    id: id,
                    pw: pw,
                })
                .then(response => {
                    if (response.data.state === 200) {
                        handleToken(response.data.data.id);
                        handleUser(response.data.data.id);
                        if (
                            pathname === null ||
                            pathname === '/join' ||
                            pathname === '/find-password' ||
                            pathname === undefined
                        ) {
                            navigate('/');
                        } else {
                            navigate(-1);
                        }
                    } else if (response.data.state === 400) {
                        alert(response.data.msg);
                    } else if (response.data.state === 401) {
                        alert(response.data.msg);
                    }
                });
        }
    };

    // 회원가입페이지로 이동
    const setRegister = () => {
        navigate('/join');
    };

    return (
        <div className="container-wb flex justify-center items-center h-[calc(100ch-156px)]">
            <div className="w-full max-w-lg mx-auto overflow-hidden">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-orange-600 ">Login</h2>
                    <form>
                        <div className="mt-4">
                            <InputBox
                                type="email"
                                placeholder="user name"
                                ariaLabel="user-name"
                                value={id}
                                onChange={setId}
                            />
                        </div>
                        <div className="mt-2">
                            <InputBox
                                type="password"
                                placeholder="password"
                                ariaLabel="password"
                                value={pw}
                                onChange={setPw}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="w-[45%] h-10">
                                <Button contents="회원가입" onClick={setRegister} />
                            </div>
                            <div className="w-[45%] h-10">
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
