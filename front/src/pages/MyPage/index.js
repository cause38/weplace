import React, {Fragment, useEffect, useState, useRef} from 'react';

import Button from 'components/button';
import InputBox from 'components/inputBox';

import Pagination from './components/Pagination';
import UserInfo from './components/UserInfo';
import Reviews from './components/Reviews';
import Favorites from './components/Favorites';

import {useNavigate, useLocation} from '../../../node_modules/react-router-dom/dist/index';
import axios from '../../../node_modules/axios/index';

const MyPage = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const qs = require('qs');

    //  토큰
    const [token, setToken] = useState(0);

    // 유저 이미지
    const [userImg, setUserImg] = useState();

    // 유저 아이디
    const [userId, setUserId] = useState();

    // 유저 닉네임
    const [nickName, setNickName] = useState();

    // 닉네임 변경 설정
    const [isChangeNickName, setIsChangeNickName] = useState(false);

    // 리뷰박스
    const [reviews, setReviews] = useState();

    // 찜목록
    const [favoriteList, setFavoriteList] = useState();

    // 이미지 인풋창
    const imageInput = useRef(null);

    // 닉네임 인풋창
    const nameInput = useRef(null);

    // 화면에 보여줄 티켓 수
    const limit = 3;

    // 페이지
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;

    // 토큰이 없으면 메인페이지로 이동, 있으면 유저데이터 불러오기
    useEffect(() => {
        let getToken = sessionStorage.getItem('token');
        if (getToken === null) {
            setToken(0);
            alert('로그인 후 이용 바랍니다.');
            navigate('/login', {state: {pathname: pathname}});
        } else {
            setToken(getToken);
            axios
                .get(`http://place-api.weballin.com/mypage/myInfo`, {
                    params: {
                        token: getToken,
                    },
                })
                .then(res => {
                    if (res.data.state === 200) {
                        setNickName(res.data.data.basic.name);
                        setUserId(res.data.data.basic.uid);
                        setUserImg(res.data.data.basic.thumb);
                        setReviews(MY_REVIEW);
                        setFavoriteList(MY_FAVORITE);
                        // setReviews(res.data.data.reviews);
                        // setFavoriteList(res.data.data.favorites);
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
        nameInput.current?.focus();
    };

    // 닉네임 변경
    const handleCheckedName = () => {
        const name = nickName.toString();

        if (nickName.length <= 0) {
            alert('닉네임을 입력 해 주세요.');
        } else {
            fetch(`http://place-api.weballin.com/mypage/changeName`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: token, name: name}),
            })
                .then(res => res.json())
                .then(response => {
                    if (response.state === 200) {
                        alert(response.msg);
                        setIsChangeNickName(false);
                    } else if (response.state === 400) {
                        alert(response.msg);
                        setIsChangeNickName(true);
                        return nameInput.current?.focus();
                    } else if (response.state === 401) {
                        alert(response.msg);
                        setIsChangeNickName(true);
                        return nameInput.current?.focus();
                    } else if (response.state === 402) {
                        alert(response.msg);
                        setIsChangeNickName(true);
                        return nameInput.current?.focus();
                    }
                });
        }
    };

    // 유저 이미지 수정 영역 클릭
    const handleProfileImg = () => {
        imageInput.current.click();
    };

    // 유저 이미지 수정 완료
    const onImgChange = e => {
        e.preventDefault();
        const file = e.target.files[0];

        const ImageUrl = URL.createObjectURL(file);

        const formData = new FormData();
        formData.append('profileImg', file);
        formData.append('token', token);

        axios
            .post('http://place-api.weballin.com/mypage/changeProfileImg', formData, {
                headers: {
                    'Content-Type': `multipart/form-data; `,
                },
            })
            .then(res => {
                if (res.data.state === 200) {
                    alert(res.data.msg);
                    setUserImg(ImageUrl);
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

        const data = {token: token, idx: parseInt(idx)};
        const url = 'http://place-api.weballin.com/mypage/deleteReview';
        const options = {
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
        };

        axios.delete(url, options).then(response => {
            if (response.data.state === 200) {
                alert(response.data.msg);
                axios
                    .get(`http://place-api.weballin.com/mypage/myInfo`, {
                        params: {
                            token: token,
                        },
                    })
                    .then(res => {
                        if (res.data.state === 200) {
                            setReviews(res.data.data.reviews);
                        } else if (res.data.state === 400) {
                            alert(res.data.data.msg);
                        }
                    });
            } else if (response.data.state === 400) {
                alert(response.data.msg);
            } else if (response.data.state === 401) {
                alert(response.data.msg);
            } else if (response.data.state === 402) {
                alert(response.data.msg);
            }
        });
    };

    // 찜목록 삭제
    const handleDeleteFavorite = (e, idx) => {
        e.preventDefault();

        const data = {token: token, idx: parseInt(idx)};
        const url = 'http://place-api.weballin.com/mypage/deleteFavorite';
        const options = {
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
        };
        // axios(options);
        axios.delete(url, options).then(response => {
            if (response.data.state === 200) {
                alert(response.data.msg);
                axios
                    .get(`http://place-api.weballin.com/mypage/myInfo`, {
                        params: {
                            token: token,
                        },
                    })
                    .then(res => {
                        if (res.data.state === 200) {
                            setFavoriteList(res.data.data.favorites);
                        } else if (res.data.state === 400) {
                            alert(res.data.data.msg);
                        }
                    });
            } else if (response.data.state === 400) {
                alert(response.data.msg);
            } else if (response.data.state === 401) {
                alert(response.data.msg);
            } else if (response.data.state === 402) {
                alert(response.data.msg);
            }
        });
    };

    // 리뷰 수정
    const goToWrite = () => {
        navigate('/write');
    };

    // 가게 상세 페이지
    const goToDetail = () => {
        navigate('/detail');
    };

    return (
        <Fragment>
            {token !== 0 ? (
                <main className="container-wb">
                    <h1 className="text-3xl font-bold text-orange-600">마이페이지</h1>
                    <section className="mt-9">
                        <h2 className="text-[20px] font-semibold text-orange-700">기본 정보</h2>
                        <UserInfo
                            userImg={userImg}
                            imageInput={imageInput}
                            onImgChange={onImgChange}
                            handleProfileImg={handleProfileImg}
                            userId={userId}
                            isChangeNickName={isChangeNickName}
                            nickName={nickName}
                            setNickName={setNickName}
                            nameInput={nameInput}
                            handleCheckedName={handleCheckedName}
                            handleNickName={handleNickName}
                        />
                    </section>
                    <section className="mt-14">
                        <h2 className="text-[20px] font-semibold text-orange-700">내 리뷰✍</h2>
                        {reviews?.length > 0 ? (
                            <div className=" mt-[20px] flex flex-col max-w-[890px] w-fit">
                                <div className="flex h-[185px] overflow-hidden grow">
                                    {reviews?.slice(offset, offset + limit).map(data => {
                                        const {idx, menu, star, name, comment, wdate} = data;
                                        return (
                                            <Fragment key={idx}>
                                                <div
                                                    className={
                                                        idx > 1
                                                            ? 'h-[170px] w-[280px] min-w-[280px] bg-white ml-[10px]  rounded-[20px] shadow-md overflow-hidden'
                                                            : 'h-[170px] w-[280px] min-w-[280px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                                    }
                                                >
                                                    <div className="p-[10px] h-[70%]">
                                                        <div className="flex justify-between ">
                                                            <h3 className="w-fit p-[5px] rounded-[20px] bg-orange-400 text-white text-[14px]">
                                                                {menu}
                                                            </h3>
                                                            <p className="flex items-center text-[14px]">{wdate}</p>
                                                        </div>
                                                        <span className="star pl-[5px]">
                                                            {[1, 2, 3, 4, 5].map(el => (
                                                                <i
                                                                    key={el}
                                                                    className={`fas fa-star fa-light ${
                                                                        el <= star && 'yellowStar'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </span>
                                                        <p className="pl-[5px] font-medium">{name}</p>
                                                        <p className="pl-[5px] text-2xl font-bold ">{comment}</p>
                                                    </div>
                                                    <div className="flex justify-between h-[30%] pt-[15px]">
                                                        <button
                                                            className="w-[50%] h-[100%] text-white bg-gray-500 hover:bg-gray-400 focus:outline-none focus:bg-gray-600"
                                                            onClick={goToWrite}
                                                        >
                                                            수정
                                                        </button>
                                                        <button
                                                            className="w-[50%] h-[100%] bg-orange-500 text-white hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                                                            onClick={e => handleDeleteReview(e, idx)}
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                                <Pagination total={reviews.length} limit={limit} page={page} setPage={setPage} />
                            </div>
                        ) : (
                            <div className="flex items-center h-[50px] justify-center">
                                <p>작성한 리뷰가 없습니다.😥</p>
                            </div>
                        )}
                    </section>
                    <section className="mt-14">
                        <h2 className="text-[20px] font-semibold text-orange-700">찜 목록&#128150;</h2>
                        {favoriteList?.length > 0 ? (
                            <div className=" mt-[20px] flex flex-col max-w-[890px] w-fit">
                                <div className="flex overflow-hidden grow mb-[5px]">
                                    {favoriteList?.map(data => {
                                        const {idx, favorite, category, name, review, star, wdate} = data;
                                        return (
                                            <Fragment key={idx}>
                                                <div
                                                    className={
                                                        idx > 1
                                                            ? ' flex w-[280px] min-w-[280px] mb-[10px] ml-[10px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                                            : ' flex w-[280px] min-w-[280px] mb-[10px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                                    }
                                                >
                                                    <div
                                                        className="absolute cursor-pointer hover:opacity-50"
                                                        onClick={e => handleDeleteFavorite(e, idx)}
                                                    >
                                                        <span className="text-red-600 text-[60px]">&#128150; </span>
                                                    </div>
                                                    <div
                                                        className="w-full ml-[80px] p-[10px] cursor-pointer hover:bg-orange-400 hover:text-white"
                                                        onClick={goToDetail}
                                                    >
                                                        <div className="flex justify-between">
                                                            <span className="w-fit px-[6px] py-[1px] rounded-[20px] bg-orange-400 text-white">
                                                                {category}
                                                            </span>
                                                            <span>{wdate}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-2xl font-bold">{name}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>⭐{star}</span>
                                                            <span>&#128221;{review}</span>
                                                            <span>💘{favorite}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end mt-[10px]">
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
    {
        idx: '1',
        menu: '뚝배기 불고기',
        star: '2',
        name: '일차돌 뚝섬역점',
        comment: '짜다',
        wdate: '2022-09-27',
    },
    {
        idx: '2',
        menu: '뚝배기 불고기',
        star: '4',
        name: '일차돌 뚝섬역점',
        comment: '짜다',
        wdate: '2022-09-27',
    },
    {
        idx: '3',
        menu: '뚝배기 불고기',
        star: '3',
        name: '일차돌 뚝섬역점',
        comment: '짜다',
        wdate: '2022-09-27',
    },
    {
        idx: '4',
        menu: '뚝배기 불고기',
        star: '3',
        name: '일차돌 뚝섬역점',
        comment: '짜다',
        wdate: '2022-09-27',
    },
];

const MY_FAVORITE = [
    {
        idx: 1,
        category: '한식',
        name: '일차돌 뚝섬역점',
        star: '4.0',
        review: '1',
        favorite: '1',
        wdate: '2022-09-27',
    },
    {
        idx: 2,
        category: '한식',
        name: '일차돌 뚝섬역점',
        star: '4.0',
        review: '1',
        favorite: '1',
        wdate: '2022-09-27',
    },
];
