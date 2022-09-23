import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    // check input value
    const [isIdValid, setIsIdValie] = useState(true);
    // const [isVerifyValid, setIsVerifyValid] = useState(true);

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
            console.log('입력없음 체크');
            return false;
        } else {
            if (!checkEmail(form.id.value)) {
                alert('이메일 주소를 바르게 입력해 주십시오.');
                form.id.focus();
                console.log('제대로 입력안함');
                return false;
            } else {
                console.log('api 호출시작', id);
                axios
                    .post('http://place-api.weballin.com/auth/registerCode', {
                        id: id,
                    })
                    .then(response => {
                        if (response.data.state === 200) {
                            console.log('200', response.data.msg);
                            alert(response.data.msg);
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
            }
        }
    };

    // 인증번호 확인
    const handleConfirmNum = () => {
        console.log('id', id);
        axios
            .get('http://place-api.weballin.com/auth/registerCode', {
                params: {
                    id: id,
                    code: 'WE632D77F70D98E',
                },
            })
            .then(response => {
                if (response.data.state === 200) {
                    console.log('200', response.data.msg);
                    alert(response.data.msg);
                    // setIsVerifyNumValid(true);
                } else if (response.data.state === 401) {
                    alert(response.data.msg);
                    // setIsVerifyNumValid(false);
                } else if (response.data.state === 402) {
                    alert(response.data.msg);
                } else if (response.data.state === 403) {
                    alert(response.data.msg);
                } else if (response.data.state === 404) {
                    alert(response.data.msg);
                }
            });
    };

    // 닉네임 중복 확인
    const handleName = () => {};

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
                                id="verifyId"
                                type="text"
                                value={verifyId}
                                ariaLabel="verifyId"
                                name="인증번호"
                                onChange={setVerifyId}
                            />
                            <InputBox
                                id="name"
                                type="text"
                                value={name}
                                ariaLabel="name"
                                name="닉네임"
                                onChange={setName}
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
                                {/* <Button contents="인증 요청" onClick={handleVerifyId} /> */}
                            </div>
                            <div className="w-full pl-[10px] mt-6  h-[38px]">
                                <Button contents="인증 확인" onClick={handleConfirmNum} />
                            </div>
                            <div className="w-full pl-[10px] mt-6  h-[38px]">
                                <Button contents="중복 확인" onClick={handleName} />
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
