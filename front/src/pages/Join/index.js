import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from 'components/button';
import InputBox from 'components/inputBox';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';

const Join = () => {
    const navigate = useNavigate();

    // input value
    const [id, setId] = useState('');
    const [verifyNum, setVerifyNum] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    // check input value
    const [isIdValid, setIsIdValie] = useState(true);
    const [isVerifyNumValid, setIsVerifyNumValid] = useState(true);

    // 뒤로가기
    const goBack = () => {
        navigate(-1);
    };

    //   이메일 유효성 검사
    const checkEmail = id => {
        var regExp = /^[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+$/;
        if (regExp.test(id)) {
            // test 는 정규 Methods 입니다. test는 변경없음
            return true;
        } else {
            return false;
        }
    };

    // 인풋체크
    const handleInputValue = () => {
        const form = document.joinForm;

        if (form.id.value === '') {
            alert('이메일 주소를 입력해 주십시오.');
            form.id.focus();
            return false;
        } else {
            if (!checkEmail(form.id.value)) {
                alert('이메일 주소를 바르게 입력해 주십시오.');
                form.id.focus();
                return false;
            }
        }

        if (form.verifyNum.value === '') {
            alert('인증번호를 ');
            form.name.focus();
            return false;
        }
    };

    // 인증번호 요청
    const handleVerifyNum = () => {
        const form = document.joinForm;

        if (form.id.value === '') {
            alert('이메일 주소를 입력해 주십시오.');
            form.id.focus();
            return false;
        } else {
            if (!checkEmail(form.id.value)) {
                alert('이메일 주소를 바르게 입력해 주십시오.');
                form.id.focus();
                return false;
            }
        }
    };

    // 인증번호 확인
    const handleConfirmNum = () => {};

    // 닉네임 중복 확인
    const handleNickname = () => {};

    // 회원가입 전송
    const submitJoinForm = () => {};

    return (
        <div className="container-wb">
            <div className="w-full max-w-lg mx-auto overflow-hidden ">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-gray-700 ">회원가입</h2>
                    <main className="flex">
                        <form className="w-3/4" name="joinForm">
                            <div className="flex ">
                                <InputBox
                                    id="id"
                                    type="email"
                                    value={id}
                                    onChange={setId}
                                    placeholder="example@weballin.com"
                                    ariaLabel="user-id"
                                    name="아이디"
                                />
                            </div>
                            <InputBox
                                id="verifyNum"
                                type="number"
                                value={verifyNum}
                                ariaLabel="verifyNum"
                                name="인증번호"
                                onChange={setVerifyNum}
                            />
                            <InputBox
                                id="nickName"
                                type="text"
                                value={nickName}
                                ariaLabel="nickname"
                                name="닉네임"
                                onChange={setNickName}
                            />
                            <InputBox
                                id="password"
                                type="password"
                                value={password}
                                ariaLabel="password"
                                name="비밀번호"
                                onChange={setPassword}
                            />
                            <InputBox
                                id="cfmPassword"
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
                            <div className="w-full pl-[10px] mt-6  h-[38px]">
                                <Button contents="중복 확인" onClick={handleNickname} />
                            </div>
                        </div>
                    </main>
                </div>

                <div className="flex items-center justify-between mt-9">
                    <div className="w-[45%] h-[40px]">
                        <Button contents="뒤로가기" onClick={goBack} />
                    </div>
                    <div className="w-[45%] h-[40px]">
                        <Button contents="회원가입" onClick={submitJoinForm} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;
