import React, {useState} from 'react';

import InputBox from 'components/inputBox';
import Button from 'components/button';

import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';

const FindPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [varifyNum, setVarifyNum] = useState();
    const [newPassword, setNewPassword] = useState();
    const [cfmPassword, setCfmPassword] = useState();

    // 뒤로가기
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="mt-40 ">
            <div className="w-full max-w-lg mx-auto px-6 py-4 overflow-hidden ">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-gray-700 ">비밀번호 찾기</h2>
                    <main className="flex">
                        <form className="w-3/4">
                            <div className="flex">
                                <InputBox
                                    type="email"
                                    value={email}
                                    placeholder="example@weballin.com"
                                    ariaLabel="email"
                                    name="아이디"
                                />
                            </div>
                            <InputBox
                                type="text"
                                value={varifyNum}
                                placeholder="password"
                                ariaLabel="password"
                                name="인증번호"
                            />
                            <InputBox type="text" value="" placeholder="password" ariaLabel="password" name="닉네임" />
                            <InputBox
                                type="password"
                                value={newPassword}
                                placeholder="password"
                                ariaLabel="password"
                                name="비밀번호"
                            />
                            <InputBox
                                type="password"
                                value={cfmPassword}
                                placeholder="password"
                                ariaLabel="password"
                                name="비밀번호 확인"
                            />
                        </form>
                        <div className="mt-[1.5rem] w-1/4">
                            <div className="w-full pl-[10px] h-[42px]">
                                <Button contents="인증번호 발송" />
                            </div>
                            <div className="w-full pl-[10px] mt-6  h-[42px]">
                                <Button contents="인증번호 확인" />
                            </div>
                            <div className="w-full pl-[10px] mt-6  h-[42px]">
                                <Button contents="중복확인" />
                            </div>
                        </div>
                    </main>
                </div>

                <div className="flex items-center justify-between mt-9">
                    <div className="w-[45%] h-[40px]">
                        <Button contents="뒤로가기" />
                    </div>
                    <div className="w-[45%] h-[40px]">
                        <Button contents="회원가입" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindPassword;
