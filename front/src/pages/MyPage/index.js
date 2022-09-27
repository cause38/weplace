import Button from 'components/button';
import React, {Fragment, useEffect, useState} from 'react';
import profileImage from '../../assets/user_solid.svg';
import InputBox from 'components/inputBox';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import axios from '../../../node_modules/axios/index';

const MyPage = () => {
    const navigate = useNavigate();

    //  토큰
    const getToken = sessionStorage.getItem('token');

    // 유저 이미지
    const [userImg, setUserImg] = useState();

    // 유저 닉네임
    const [nickName, setNickName] = useState();

    // 닉네임 변경 설정
    const [isChangeNickName, setIsChangeNickName] = useState(false);
    const [isDoubleChecked, setIsDoubleChecked] = useState(false);

    // 토큰이 있으면 메인페이지로 이동
    useEffect(() => {
        if (getToken === null) {
            alert('로그인 후 이동 바랍니다.');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        // 유저 데이터 가져오기.
        setUserImg(profileImage);
        setNickName('서버에서 받은 닉네임');
    }, []);

    // 인풋창 활성화
    const handleNickName = e => {
        setIsChangeNickName(true);
        setNickName(e.target.value);
        const inputFocus = document.getElementById('nickName').focus;
        return inputFocus;
    };

    console.log('인풋창 활성화', isChangeNickName);

    // 닉네임 중복 확인 및 변경완료
    const handleCheckedName = () => {
        setIsChangeNickName(false);
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

    return (
        <Fragment>
            {getToken ? (
                <main className="container-wb">
                    <h2 className="text-[24px] font-bold">마이페이지</h2>
                    <section className="mt-[20px]">
                        <h3 className="text-[15px] font-semibold">기본 정보</h3>
                        <div className="flex pt-[20px]">
                            <div className="min-w-[120px] w-[15%]">
                                <div className="max-h-[130px] rounded-[50%] overflow-hidden border-2 border-solid border-orange-400">
                                    <img src={userImg} />
                                </div>
                                <div className="h-[30px] mt-[10px]">
                                    <Button contents="프로필 사진 변경" />
                                </div>
                            </div>
                            <div className="flex ml-[10%] mb-[50px] items-end w-[85%] justify-between">
                                <div className="flex flex-col justify-center w-[80%]">
                                    <div className="flex items-center">
                                        <div className="min-w-[70px] w-[20%]">아이디</div>
                                        <div className="w-[80%]">sy.park@weballin.com</div>
                                    </div>
                                    <div className="flex mt-[20px] items-center">
                                        <div className="min-w-[70px] w-[20%]">
                                            <p>닉네임</p>
                                        </div>
                                        {isChangeNickName ? (
                                            <div className="w-full">
                                                <InputBox
                                                    id="nickName"
                                                    type="text"
                                                    value={nickName}
                                                    ariaLabel="name"
                                                    placeholder={nickName}
                                                    onChange={setNickName}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <InputBox
                                                    id="nickName"
                                                    type="text"
                                                    value={nickName}
                                                    ariaLabel="name"
                                                    placeholder={nickName}
                                                    readOnly="readOnly"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {isChangeNickName ? (
                                    <div className="h-[40px] w-[20%] ml-[5%] min-w-[100px]">
                                        <Button contents="중복 확인" onClick={handleCheckedName} />
                                    </div>
                                ) : (
                                    <div className="h-[40px] w-[20%] ml-[5%] min-w-[100px]">
                                        <Button contents="닉네임 변경" onClick={handleNickName} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            ) : null}
        </Fragment>
    );
};

export default MyPage;
