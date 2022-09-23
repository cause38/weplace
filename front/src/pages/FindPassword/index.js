import React, {useState} from 'react';

import InputBox from 'components/inputBox';
import Button from 'components/button';

import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';

const FindPassword = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [verifyNum, setVerifyNum] = useState('');
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    // 뒤로가기
    const goBack = () => {
        navigate(-1);
    };

    // 인풋체크
    const handleInputValue = () => {};

    // 인증번호 요청
    const handleVerifyNum = () => {};

    // 인증번호 확인
    const handleConfirmNum = () => {};

    // 비밀번호 설정
    const submitChangePW = () => {};

    return (
        <div className="container-wb">
            <div className="w-full max-w-lg mx-auto overflow-hidden ">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-gray-700 ">비밀번호 찾기</h2>
                    <main className="flex">
                        <form className="w-3/4">
                            <div className="flex ">
                                <InputBox
                                    type="email"
                                    value={id}
                                    onChange={setId}
                                    placeholder="example@weballin.com"
                                    ariaLabel="user-id"
                                    name="아이디"
                                />
                            </div>
                            <InputBox
                                type="number"
                                value={verifyNum}
                                ariaLabel="verifyNum"
                                name="인증번호"
                                onChange={setVerifyNum}
                            />

                            <InputBox
                                type="password"
                                value={password}
                                ariaLabel="password"
                                name="신규 비밀번호"
                                onChange={setPassword}
                            />
                            <InputBox
                                type="password"
                                value={cfmPassword}
                                ariaLabel="confirm-password"
                                name="비밀번호 확인"
                                onChange={setCfmPassword}
                            />
                        </form>
                        <div className="mt-[1.5rem] w-1/4">
                            <div className="w-full pl-[10px] h-[38px]">
                                <Button contents="인증 요청" onClick={handleVerifyNum} />
                            </div>
                            <div className="w-full pl-[10px] mt-6  h-[38px]">
                                <Button contents="인증 확인" onClick={handleConfirmNum} />
                            </div>
                        </div>
                    </main>
                </div>

                <div className="flex items-center justify-between mt-9">
                    <div className="w-[45%] h-[40px]">
                        <Button contents="뒤로가기" onClick={goBack} />
                    </div>
                    <div className="w-[45%] h-[40px]">
                        <Button contents="비밀번호 설정" onClick={submitChangePW} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindPassword;
