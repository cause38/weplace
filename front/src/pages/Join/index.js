import React, {useState, useEffect} from 'react';
import Button from 'components/button';
import InputBox from 'components/inputBox';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import axios from '../../../node_modules/axios/index';

const Join = () => {
    const navigate = useNavigate();

    // 토큰
    const getToken = sessionStorage.getItem('token');

    // 토큰이 있으면 메인페이지로 이동
    useEffect(() => {
        if (getToken !== null) {
            navigate('/');
        }
    }, []);

    // input value
    const [id, setId] = useState('');
    const [verifyId, setVerifyId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    // check input value
    const [isIdValid, setIsIdValid] = useState(false); // 인증확인
    const [isDoubleChecked, setIsDoubleChecked] = useState(false); // 중복확인
    const [isSamePw, setIsSamePw] = useState(true); // 비밀번호 일치여부 확인

    // 인증 요청 메일 발송여부
    const [isSendVerifyEmail, setIsSendVerifyEmail] = useState(false);

    // 닉네임변경
    const [isResetNickName, setIsResetNickName] = useState(false);

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

    // 인증번호 요청
    const handleVerifyId = () => {
        const form = document.joinForm;
        if (form.id.value === '') {
            alert('이메일 주소를 입력해 주십시오.');
            form.id.focus();
            console.log('입력없음 체크');
            return false;
        } else {
            if (!checkEmail(form.id.value)) {
                alert('이메일 주소를 바르게 입력해 주십시오.');
                form.id.focus();
                console.log('제대로 입력안함');
                return false;
            } else {
                // 인증요청
                if (isSendVerifyEmail === false) {
                    fetch(`http://place-api.weballin.com/auth/registerCode`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        body: JSON.stringify({id: id}),
                    })
                        .then(res => res.json())
                        .then(response => {
                            console.log('resr?', response);
                            if (response.state === 200) {
                                console.log('200', response.msg);
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

    // 인증번호 확인
    const handleConfirmId = () => {
        axios
            .get('http://place-api.weballin.com/auth/registerCode', {
                params: {
                    id: id,
                    code: verifyId,
                },
            })
            .then(response => {
                if (response.data.state === 200) {
                    console.log('200', response.data.msg);
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

    // 인증 재요청
    const handleSendAgainEmail = () => {
        setIsIdValid(false);
        setIsSendVerifyEmail(false);
    };

    // 닉네임 중복 확인
    const handleName = () => {
        const name = nickName.toString();
        console.log('name', name);
        if (nickName.length <= 0) {
            alert('닉네임을 입력 해 주세요.');
        } else {
            axios
                .get('http://place-api.weballin.com/auth/nickname', {
                    params: {
                        name: name,
                    },
                })
                .then(response => {
                    if (response.data.state === 200) {
                        alert(response.data.msg);
                        setIsDoubleChecked(true);
                    } else if (response.data.state === 400) {
                        alert(response.data.msg);
                    } else if (response.data.state === 401) {
                        alert(response.data.msg);
                    }
                });
        }
    };

    // 닉네임 중복확인 요청
    const handleResetName = () => {
        setIsDoubleChecked(false);
        setIsResetNickName(false);
    };

    // 비밀번호 확인
    const handlePwMatch = e => {
        console.log('e', e.target.value);
        setCfmPassword(e.target.value);
        if (e.target.value !== password) {
            setIsSamePw(false);
        } else if (e.target.value === password) {
            setIsSamePw(true);
        }
    };

    // 회원가입 전송
    const submitJoinForm = () => {
        const form = document.joinForm;
        if (isSendVerifyEmail === false) {
            alert('아이디 확인 부탁 드립니다.');
            form.id.focus();
            return false;
        } else if (isIdValid === false) {
            alert('인증번호 확인 부탁 드립니다.');
            form.verifyId.focus();
            return false;
        } else if (isDoubleChecked === false) {
            alert('닉네임 중복확인 부탁 드립니다.');
            form.nickName.focus();
            return false;
        } else if (password.length < 1) {
            alert('비밀번호 입력 부탁 드립니다.');
            form.password.focus();
            return false;
        } else if (cfmPassword.length > password.length) {
            alert('비밀번호 입력 부탁 드립니다.');
            form.password.focus();
            return false;
        } else if (cfmPassword.length < 1) {
            alert('비밀번호 확인 부탁 드립니다.');
            form.cfmPassword.focus();
            return false;
        } else if (isSamePw === false) {
            alert('비밀번호가 일치하지 않습니다. 확인 부탁 드립니다.');
            form.cfmPassword.focus();
            return false;
        } else {
            fetch(`http://place-api.weballin.com/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({id: id, pw: password, pw2: cfmPassword, name: nickName}),
            })
                .then(res => res.json())
                .then(response => {
                    if (response.state === 200) {
                        alert(response.msg);
                        form.id.focus();
                        navigate('/login');
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
                    } else if (response.state === 406) {
                        alert(response.msg);
                        form.nickName.focus();
                    } else if (response.state === 407) {
                        alert(response.msg);
                        form.nickName.focus();
                    }
                });
        }
    };

    return (
        <div className="container-wb">
            <div className="w-full max-w-lg mx-auto overflow-hidden ">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-gray-700 ">회원가입</h2>
                    <main className="flex">
                        <form className="w-3/4" name="joinForm">
                            <div className="flex ">
                                {isSendVerifyEmail ? (
                                    <div className="mt-2 w-full">
                                        <InputBox
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
                                    <div className="mt-2 w-full">
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
                                )}
                            </div>
                            {isIdValid ? (
                                <div className="mt-2 w-full">
                                    <InputBox
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
                                <div className="mt-2 w-full">
                                    <InputBox
                                        id="verifyId"
                                        type="text"
                                        value={verifyId}
                                        ariaLabel="verifyId"
                                        name="인증번호"
                                        onChange={setVerifyId}
                                    />
                                </div>
                            )}
                            {isDoubleChecked ? (
                                <div className="mt-2 w-full">
                                    <InputBox
                                        id="nickName"
                                        type="text"
                                        value={nickName}
                                        ariaLabel="name"
                                        name="닉네임"
                                        onChange={setNickName}
                                        readOnly="readOnly"
                                    />
                                </div>
                            ) : (
                                <div className="mt-2 w-full">
                                    <InputBox
                                        id="nickName"
                                        type="text"
                                        value={nickName}
                                        ariaLabel="name"
                                        name="닉네임"
                                        onChange={setNickName}
                                    />
                                </div>
                            )}
                            <div className="mt-2 w-full">
                                <InputBox
                                    id="password"
                                    type="password"
                                    value={password}
                                    ariaLabel="password"
                                    name="비밀번호"
                                    onChange={setPassword}
                                />
                            </div>
                            {/* <InputBox
                                id="cfmPassword"
                                type="password"
                                value={cfmPassword}
                                ariaLabel="confirm-password"
                                name="비밀번호 확인"
                                onChange={handlePwMatch}
                            />
                             */}
                            <div className="w-full mt-2 flex ">
                                <label
                                    htmlFor="비밀번호 확인"
                                    className="w-2/5 pl-1 py-2 mt-2 text-slate-600 text-sm font-semibold placeholder-gray-500 bg-slate-200 border rounded-md focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    비밀번호 확인
                                </label>
                                <input
                                    id="cfmPassword"
                                    className={
                                        'block w-[62%]  pl-1 py-2  mt-2 ml-[-5px] text-gray-700 text-xs placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                                    }
                                    name="비밀번호 확인"
                                    type="password"
                                    aria-label="confirm-password"
                                    value={cfmPassword}
                                    onChange={e => handlePwMatch(e)}
                                />
                            </div>
                            {isSamePw === true ? null : (
                                <p className="absolute mt-1 text-red-600 text-[10px] ">
                                    * 비밀번호가 일치 하지 않습니다.
                                </p>
                            )}
                        </form>
                        <div className="mt-2 w-1/4">
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
                                <div className="w-full pl-[10px] mt-2  h-[38px]">
                                    <Button contents="인증 완료" onClick={handleConfirmId} disAbled="disabled" />
                                </div>
                            ) : (
                                <div className="w-full pl-[10px] mt-2  h-[38px]">
                                    <Button contents="인증 확인" onClick={handleConfirmId} />
                                </div>
                            )}
                            {isDoubleChecked ? (
                                isResetNickName ? (
                                    <div className="w-full pl-[10px] mt-2 h-[38px]">
                                        <Button contents="확인 완료" onClick={handleResetName} disAbled="disabled" />
                                    </div>
                                ) : (
                                    <div className="w-full pl-[10px] mt-2  h-[38px]">
                                        <Button contents="재확인" onClick={handleResetName} />
                                    </div>
                                )
                            ) : (
                                <div className="w-full pl-[10px] mt-2  h-[38px]">
                                    <Button contents="중복 확인" onClick={handleName} />
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
                        <Button contents="회원가입" onClick={submitJoinForm} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;
