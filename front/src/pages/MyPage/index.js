import Button from 'components/button';
import React, {Fragment, useEffect, useState, useRef} from 'react';
import InputBox from 'components/inputBox';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import axios from '../../../node_modules/axios/index';

const MyPage = () => {
    const navigate = useNavigate();

    //  토큰
    const getToken = sessionStorage.getItem('token').toString();

    // 유저 이미지
    const [userImg, setUserImg] = useState();

    // 유저 아이디
    const [userId, setUserId] = useState();

    // 유저 닉네임
    const [nickName, setNickName] = useState();

    // 닉네임 변경 설정
    const [isChangeNickName, setIsChangeNickName] = useState(false);

    // 리뷰박스
    const [reviews, setReviews] = useState([]);

    // 찜목록
    const [favoriteList, setFavoriteList] = useState([]);

    const imageInput = useRef(null);

    // 토큰이 없으면 메인페이지로 이동, 있으면 유저데이터 불러오기
    useEffect(() => {
        if (getToken === null) {
            alert('로그인 후 이동 바랍니다.');
            navigate('/login');
        } else {
            axios
                .get(`http://place-api.weballin.com/mypage/myInfo`, {
                    params: {
                        token: getToken,
                    },
                })
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.state === 200) {
                        setNickName(res.data.data.basic.name);
                        setUserId(res.data.data.basic.uid);
                        setUserImg(res.data.data.basic.thumb);
                        setReviews(res.data.data.reviews);
                        setFavoriteList(res.data.data.favorites);
                    } else if (res.data.state === 400) {
                        alert(res.data.data.msg);
                    }
                });
        }
    }, []);

    // 닉네임 인풋창 활성화
    const handleNickName = e => {
        setIsChangeNickName(true);
        setNickName(e.target.value);
        const inputFocus = document.getElementById('nickName').focus;
        return inputFocus;
    };

    // 닉네임 변경
    const handleCheckedName = () => {
        const name = nickName.toString();
        const inputFocus = document.getElementById('nickName').focus;

        if (nickName.length <= 0) {
            alert('닉네임을 입력 해 주세요.');
        } else {
            fetch(`http://place-api.weballin.com/mypage/changeName`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: getToken, name: name}),
            })
                .then(res => res.json())
                .then(response => {
                    if (response.state === 200) {
                        alert(response.msg);
                        setIsChangeNickName(false);
                    } else if (response.state === 400) {
                        alert(response.msg);
                        setIsChangeNickName(true);
                        return inputFocus;
                    } else if (response.state === 401) {
                        alert(response.msg);
                        setIsChangeNickName(true);
                        return inputFocus;
                    } else if (response.state === 402) {
                        alert(response.msg);
                        setIsChangeNickName(true);
                        return inputFocus;
                    }
                });
        }
    };

    // 유저 이미지 수정
    const handleProfileImg = () => {
        imageInput.current.click();
    };

    const onImgChange = e => {
        e.preventDefault();
        const file = e.target.files[0];

        const ImageUrl = URL.createObjectURL(file);

        setUserImg(ImageUrl);

        const formData = new FormData();
        formData.append('profileImg', file);
        formData.append('token', getToken);

        axios
            .post('http://place-api.weballin.com/mypage/changeProfileImg', formData, {
                headers: {
                    'Content-Type': `multipart/form-data; `,
                },
            })
            .then(res => {
                if (res.data.state === 200) {
                    alert(res.data.msg);
                } else if (res.data.state === 400) {
                    alert(res.data.msg);
                } else if (res.data.state === 401) {
                    alert(res.data.msg);
                }
            });
    };

    // 리뷰삭제
    const handleDeleteReview = (e, idx) => {
        e.preventDefault();
        console.log('idx', idx);
        axios.delete(`http://place-api.weballin.com/mypage/deleteReview`, {
            data: {
                token: getToken,
                idx: idx,
            },
            withCredentials: true,
        });
    };

    return (
        <Fragment>
            {getToken ? (
                <main className="container-wb">
                    <h1 className="text-[24px] font-bold">마이페이지</h1>
                    <section className="mt-9">
                        <h2 className="text-[15px] font-semibold">기본 정보</h2>
                        <div className="flex mt-[20px]">
                            <div className="min-w-[120px] w-[15%]">
                                <img
                                    className="min-w-[100%] max-h-[130px] min-h-[130px] rounded-[50%] overflow-hidden border-2 border-solid border-orange-400"
                                    src={userImg}
                                />

                                <form className="h-[30px] mt-[10px]" encType="multipart.form-data">
                                    <input
                                        id="file"
                                        type="file"
                                        style={{display: 'none'}}
                                        ref={imageInput}
                                        accept="image/*"
                                        name="file"
                                        onChange={e => onImgChange(e)}
                                        multiple="multiple"
                                    />
                                    <Button contents="프로필 사진 변경" onClick={handleProfileImg} />
                                </form>
                            </div>
                            <div className="flex ml-[10%] mb-[50px] items-end w-[85%] justify-between">
                                <div className="flex flex-col justify-center w-[80%]">
                                    <div className="flex items-center">
                                        <div className="min-w-[70px] w-[20%]">아이디</div>
                                        <div className="w-full">
                                            <p className="ml-[5px]">{userId}</p>
                                        </div>
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
                                                    value={nickName || ''}
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
                                                    value={nickName || ''}
                                                    ariaLabel="name"
                                                    onChange={setNickName}
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
                    <section className="mt-14">
                        <h2 className="text-[15px] font-semibold">내 리뷰✍</h2>
                        {reviews?.length > 0 ? (
                            <div className="bg-slate-300 mt-[20px] flex flex-col">
                                <div className="flex">
                                    {reviews?.map(data => {
                                        const {idx, content} = data;
                                        return (
                                            <Fragment key={idx}>
                                                <div
                                                    className={
                                                        idx > 1
                                                            ? 'h-[170px] bg-orange-300 ml-[10px] w-full'
                                                            : 'h-[170px] bg-orange-300 w-full'
                                                    }
                                                >
                                                    <p>{content}</p>
                                                    <div className="flex justify-between p-[40px] items-end">
                                                        <button>수정</button>
                                                        <button onClick={e => handleDeleteReview(e, idx)}>삭제</button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end">
                                    <p>페이지 네이션</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center h-[50px] justify-center">
                                <p>작성한 리뷰가 없습니다.😥</p>
                            </div>
                        )}
                    </section>
                    <section className="mt-14">
                        <h2 className="text-[15px] font-semibold">찜 목록&#128150;</h2>
                        {favoriteList?.length > 0 ? (
                            <div className="bg-slate-300 mt-[20px] flex flex-col">
                                <div className="flex">
                                    {favoriteList?.map(data => {
                                        const {idx, content} = data;
                                        return (
                                            <Fragment key={idx}>
                                                <div
                                                    className={
                                                        idx > 1
                                                            ? 'h-[170px] bg-orange-300 ml-[10px] w-full '
                                                            : 'h-[170px] bg-orange-300 w-full'
                                                    }
                                                >
                                                    <p>{content}</p>
                                                    <div className="flex justify-between p-[40px] items-end">
                                                        <button>수정</button>
                                                        <button onClick={e => handleDeleteReview(e, idx)}>삭제</button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end">
                                    <p>페이지 네이션</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center h-[50px] justify-center">
                                <p>찜한 가게가 없습니다.😥</p>
                            </div>
                        )}
                    </section>
                </main>
            ) : null}
        </Fragment>
    );
};

export default MyPage;

const MY_REVIEW = [
    {id: 1, content: '내리뷰1'},
    {id: 2, content: '내리뷰2'},
    {id: 3, content: '내리뷰3'},
];

const MY_FAVORITE = [
    {id: 1, content: '찜가게1'},
    {id: 2, content: '찜가게2'},
    {id: 3, content: '찜가게3'},
];
