import Button from 'components/button';
import React, {Fragment, useEffect, useState} from 'react';
import profileImage from '../../assets/user_solid.svg';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';

const MyPage = () => {
    const navigate = useNavigate();

    //  토큰
    const getToken = sessionStorage.getItem('token');

    const [userImg, setUserImg] = useState();

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
    });

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
                                    <div className="flex">
                                        <div className="min-w-[70px] w-[20%]">아이디</div>
                                        <div className="w-[80%]">sy.park@weballin.com</div>
                                    </div>
                                    <div className="flex mt-[20px]">
                                        <div className="min-w-[70px] w-[20%]">닉네임</div>
                                        <input className="h-[40px] w-[80%]" />
                                    </div>
                                </div>
                                <div className="h-[40px] w-[20%] ml-[5%] min-w-[100px]">
                                    <Button contents="닉네임 변경" />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            ) : null}
        </Fragment>
    );
};

export default MyPage;
