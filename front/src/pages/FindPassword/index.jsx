import React, {useState} from 'react';

import PasswordInput from './components/PasswordInput';
import Button from 'components/button';

import {useNavigate, useLocation} from '/node_modules/react-router-dom/dist/index';
import axios from '/node_modules/axios/index';

const FindPassword = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    // input value
    const [id, setId] = useState(''); // 아이디
    const [verifyId, setVerifyId] = useState(''); // 인증번호
    const [newPw, setNewPw] = useState(''); // 신규 비밀번호
    const [checkPw, setCheckPw] = useState(''); // 비밀번호 확인

    // check input value
    const [isSendVerifyEmail, setIsSendVerifyEmail] = useState(false); // 인증요청 메일 발송여부
    const [isIdValid, setIsIdValid] = useState(false); // 인증확인
    const [isSamePw, setIsSamePw] = useState(false); // 비밀번호 일치확인

    // 뒤로가기
    const goBack = () => {
        navigate('/login', {state: {pathname: pathname}});
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

    // 인증번호 요청
    const handleVerifyId = () => {
        const form = document.setPwForm;
        if (form.id.value === '') {
            alert('이메일 주소를 입력해 주십시오.');
            form.id.focus();
            return false;
        } else {
            if (!checkEmail(form.id.value)) {
                alert('이메일 주소를 바르게 입력해 주십시오.');
                form.id.focus();
                return false;
            } else {
                // 인증요청
                if (isSendVerifyEmail === false) {
                    fetch(`http://place-api.weballin.com/auth/passwordCode`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id: id}),
                    })
                        .then(res => res.json())
                        .then(response => {
                            if (response.state === 200) {
                                alert(response.msg);
                                setIsSendVerifyEmail(true);
                            } else if (response.state === 401) {
                                alert(response.msg);
                            } else if (response.state === 402) {
                                alert(response.msg);
                            } else if (response.state === 403) {
                                alert(response.msg);
                            } else if (response.state === 404) {
                                alert(response.msg);
                            }
                        });
                }
            }
        }
    };

    // 인증 재요청
    const handleSendAgainEmail = () => {
        setIsIdValid(false);
        setIsSendVerifyEmail(false);
    };

    // 인증번호 확인
    const handleConfirmId = () => {
        axios
            .get('http://place-api.weballin.com/auth/passwordCode', {
                params: {
                    id: id,
                    code: verifyId,
                },
            })
            .then(response => {
                if (response.data.state === 200) {
                    alert(response.data.msg);
                    setIsIdValid(true);
                    setIsSendVerifyEmail(true);
                } else if (response.data.state === 401) {
                    alert(response.data.msg);
                } else if (response.data.state === 402) {
                    alert(response.data.msg);
                } else if (response.data.state === 403) {
                    alert(response.data.msg);
                } else if (response.data.state === 404) {
                    alert(response.data.msg);
                }
            });
    };

    // 비밀번호 일치 확인
    const handlePwMatch = value => {
        setCheckPw(value);
        if (value !== newPw) {
            setIsSamePw(false);
        } else if (value === newPw) {
            setIsSamePw(true);
        }
    };

    // 비밀번호 설정
    const submitChangePW = () => {
        const form = document.setPwForm;
        if (isSendVerifyEmail === false) {
            alert('아이디 확인 부탁 드립니다.');
            form.id.focus();
            return false;
        } else if (isIdValid === false) {
            alert('인증번호 확인 부탁 드립니다.');
            form.verifyId.focus();
            return false;
        } else if (newPw.length < 1) {
            alert('비밀번호 입력 부탁 드립니다.');
            form.newPw.focus();
            return false;
        } else if (checkPw.length > newPw.length) {
            alert('비밀번호가 일치하지 않습니다. 확인 부탁 드립니다.');
            form.newPw.focus();
            return false;
        } else if (checkPw.length < 1) {
            alert('비밀번호가 일치하지 않습니다. 확인 부탁 드립니다.');
            form.checkPw.focus();
            return false;
        } else if (isSamePw === false) {
            alert('비밀번호가 일치하지 않습니다. 확인 부탁 드립니다.');
            form.checkPw.focus();
            return false;
        } else {
            fetch(`http://place-api.weballin.com/auth/changePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id, pw: newPw, pw2: checkPw}),
            })
                .then(res => res.json())
                .then(response => {
                    if (response.state === 200) {
                        alert(response.msg);
                        form.id.focus();
                        navigate('/login', {state: {pathname: pathname}});
                    } else if (response.state === 400) {
                        alert(response.msg);
                    } else if (response.state === 401) {
                        alert(response.msg);
                        form.id.focus();
                    } else if (response.state === 402) {
                        alert(response.msg);
                        form.id.focus();
                    } else if (response.state === 403) {
                        alert(response.msg);
                        form.id.focus();
                    } else if (response.state === 404) {
                        alert(response.msg);
                        form.password.focus();
                    } else if (response.state === 405) {
                        alert(response.msg);
                        form.cfmPassword.focus();
                    }
                });
        }
    };

    return (
        <div className="mt-20 flex justify-center items-center  h-[calc(100vh-204px)] sm:h-[calc(100vh-188px)]">
            <div className="bg-white w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg px-5 py-11">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-orange-600 ">비밀번호 찾기</h2>
                    <main className="flex mt-[10px]">
                        <form className="w-3/4" name="setPwForm">
                            <div className="flex ">
                                {isSendVerifyEmail ? (
                                    <div className="mt-4 w-full flex">
                                        <PasswordInput
                                            id="id"
                                            type="email"
                                            value={id}
                                            ariaLabel="user-id"
                                            name="아이디"
                                            onChange={setId}
                                            readOnly="readOnly"
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-4 w-full flex">
                                        <PasswordInput
                                            id="id"
                                            type="email"
                                            value={id}
                                            onChange={setId}
                                            placeholder="example@weballin.com"
                                            ariaLabel="user-id"
                                            name="아이디"
                                        />
                                    </div>
                                )}
                            </div>
                            {isIdValid ? (
                                <div className="mt-4 w-full flex">
                                    <PasswordInput
                                        id="verifyId"
                                        type="text"
                                        value={verifyId}
                                        ariaLabel="verifyId"
                                        name="인증번호"
                                        onChange={setVerifyId}
                                        readOnly="readOnly"
                                    />
                                </div>
                            ) : (
                                <div className="mt-4 w-full flex">
                                    <PasswordInput
                                        id="verifyId"
                                        type="text"
                                        value={verifyId}
                                        ariaLabel="verifyId"
                                        name="인증번호"
                                        onChange={setVerifyId}
                                    />
                                </div>
                            )}
                            <div className="mt-4 w-full flex">
                                <PasswordInput
                                    id="newPw"
                                    type="password"
                                    value={newPw}
                                    ariaLabel="password"
                                    name="신규 비밀번호"
                                    onChange={setNewPw}
                                />
                            </div>
                            <div className="mt-4 w-full flex">
                                <PasswordInput
                                    id="checkPw"
                                    type="password"
                                    value={checkPw}
                                    ariaLabel="confirm-password"
                                    name="비밀번호 확인"
                                    onChange={e => handlePwMatch(e)}
                                />
                            </div>
                            {checkPw.length > 0 ? (
                                isSamePw === true ? null : (
                                    <p className="absolute mt-1 text-red-600 text-[10px] ">
                                        * 비밀번호가 일치 하지 않습니다.
                                    </p>
                                )
                            ) : null}
                        </form>
                        <div className="mt-4 w-1/4">
                            {isSendVerifyEmail ? (
                                isIdValid ? (
                                    <div className="w-full pl-[10px] h-[38px]">
                                        <Button
                                            contents="인증 완료"
                                            onClick={handleSendAgainEmail}
                                            disAbled="disabled"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full pl-[10px] h-[38px]">
                                        <Button contents="인증 재요청" onClick={handleSendAgainEmail} />
                                    </div>
                                )
                            ) : (
                                <div className="w-full pl-[10px] h-[38px]">
                                    <Button contents="인증 요청" onClick={handleVerifyId} />
                                </div>
                            )}
                            {isIdValid ? (
                                <div className="w-full pl-[10px] mt-4  h-[38px]">
                                    <Button contents="인증 완료" onClick={handleConfirmId} disAbled="disabled" />
                                </div>
                            ) : (
                                <div className="w-full pl-[10px] mt-4  h-[38px]">
                                    <Button contents="인증 확인" onClick={handleConfirmId} />
                                </div>
                            )}
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
