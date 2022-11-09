import React, {useState, useEffect, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, A11y} from 'swiper';
import axios from 'axios';

import {EmojiProvider, Emoji} from 'react-apple-emojis';
import emojiData from '../../lib/data.json';
import iconThinking from '../../assets/thinking_emoji.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

import 'styles/home.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    const navigate = useNavigate();

    // 슬롯머신 버튼
    const [lever, setLever] = useState(false);

    // 최신리뷰 데이터
    const [newReviewData, setNewReviewData] = useState([]);

    // swiper button custom
    const prevBtn = useRef(null);
    const nextBtn = useRef(null);

    // 슬롯머신 메뉴
    const menuList = [
        '제육볶음',
        '순대국',
        '보쌈',
        '짜장면',
        '떡볶이',
        '우동',
        '햄버거',
        '냉면',
        '짬뽕',
        '쌀국수',
        '돈까스',
        '피자',
        '뚝배기 불고기',
    ];

    // 카테고리 리스트
    const categoryArr = [
        {
            idx: 0,
            name: '전체보기',
            icon: ['face-savoring-food', 'fork-and-knife'],
        },
        {
            idx: 1,
            name: '한식',
            icon: 'cooked-rice',
        },
        {
            idx: 2,
            name: '중식',
            icon: 'dumpling',
        },
        {
            idx: 3,
            name: '일식',
            icon: 'sushi',
        },
        {
            idx: 4,
            name: '양식',
            icon: 'spaghetti',
        },
        {
            idx: 5,
            name: '분식',
            icon: 'fried-shrimp',
        },
        {
            idx: 6,
            name: '아시안 매장',
            icon: 'steaming-bowl',
        },
    ];

    useEffect(() => {
        // get 최신리뷰 데이터
        axios.get('http://place-api.weballin.com/main').then(res => {
            if (res.status === 200) {
                setNewReviewData(res.data.data.reviews);
            }
        });
        SwiperCore.use([Navigation]);
    }, []);

    // 최신리뷰 별점
    const handleStar = star => {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < star) arr.push(true);
            else arr.push(false);
        }
        return arr;
    };

    // 슬롯머신
    const handleLever = e => {
        const lever = e.currentTarget;
        const slot = document.querySelector('.slot-box');

        // button diabled
        setLever(true);

        // animation start
        slot.classList.add('animation');
        lever.classList.add('animation');

        // random idx
        const randIdx = Math.floor(Math.random() * menuList.length);

        setTimeout(() => {
            // 랜덤메뉴
            slot.firstElementChild.textContent = `${menuList[randIdx]}`;

            // 초기화
            lever.classList.remove('animation');
            slot.classList.remove('animation');
            setLever(false);
        }, 1000);
    };

    return (
        <>
            <div className="pt-[100px] pb-[30px] md:pt-40 md:pb-20 font-sans-g pb-20 bg-orange-100">
                <div className="container-wb relative my-10 py-0 sm:px-0 flex flex-col justify-center items-center gap-10 w-full ">
                    <img
                        src={iconThinking}
                        alt="thinking_food"
                        className="md:absolute w-20 md:w-36 md:-top-20 md:left-10 animate-spin-wb"
                    />
                    <img
                        src={iconThinking}
                        alt="thinking_food"
                        className="hidden md:block absolute w-36 -bottom-20 md:right-10 right-0 animate-reverse-spin"
                    />
                    <h3
                        className="text-4xl md:text-5xl font-semibold text-orange-400 mb-6 md:mb-10"
                        style={{textShadow: '1px 1px 0px #ea580c'}}
                    >
                        오늘의 메뉴는?
                    </h3>
                    <div className="relative flex items-center w-full w-lg:w-1/3 max-w-[500px]">
                        <div className="w-10/12 p-6 py-8 bg-orange-400 rounded-lg shadow-md">
                            <div className="relative h-[120px] overflow-hidden bg-white rounded-lg shadow-inner shadow-gray-300 text-4xl font-bold text-orange-500 text-center">
                                <ul className="slot-box absolute w-full">
                                    <li className="h-[150px] leading-[120px]">START!</li>
                                    <li className="h-[120px] leading-[120px]">냉면</li>
                                    <li className="h-[120px] leading-[120px]">햄버거</li>
                                    <li className="h-[120px] leading-[120px]">보쌈</li>
                                    <li className="h-[120px] leading-[120px]">떡볶이</li>
                                    <li className="h-[120px] leading-[120px]">제육볶음</li>
                                    <li className="h-[120px] leading-[120px]">냉면</li>
                                    <li className="h-[120px] leading-[120px]">햄버거</li>
                                    <li className="h-[120px] leading-[120px]">보쌈</li>
                                    <li className="h-[120px] leading-[120px]">떡볶이</li>
                                </ul>
                            </div>
                        </div>
                        <div className="absolute right-[1px] bottom-2 w-2/12 h-3/5 overflow-visible">
                            <div className="absolute right-0 bottom-0 w-full h-full bg-orange-500 rounded-r-lg z-1"></div>
                            <button
                                id="lever"
                                onClick={handleLever}
                                disabled={lever}
                                className="absolute -top-[110px] left-1/2 -translate-x-1/2 z-10 flex flex-col-reverse items-center cursor-pointer"
                            >
                                <div className="w-[10px] h-[30px] bg-orange-600 shadow-inner"></div>
                                <div className="bar w-[10px] h-[75px] -mt-[5px] bg-stone-300"></div>
                                <div className="relaitve z-10 circle w-[40px] h-[40px]">
                                    <svg viewBox="0 0 114 355" version="1.1">
                                        <g>
                                            <circle fill="#F0A830" cx="57" cy="57" r="57"></circle>
                                            <path
                                                d="M102.570209,40.1833305 C102.676794,40.0838119 102.777304,39.9779482 102.871517,39.8656698 C105.889032,36.2695351 101.304331,27.4546828 92.6313004,20.177146 C83.9582698,12.8996092 74.4812099,9.91524313 71.4636947,13.5113778 C71.3644458,13.629658 71.273421,13.753584 71.1904954,13.8829152 C76.2444491,16.5602964 82.1808506,20.6036755 88.1462014,25.6091992 C94.0729258,30.5823114 99.0593916,35.6922002 102.570209,40.1833305 Z"
                                                id="highlight"
                                                fill="#FFFFFF"
                                                transform="translate(87.494931, 26.085223) rotate(7.000000) translate(-87.494931, -26.085223) "
                                            ></path>
                                        </g>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-wb mt-0 pb-8 lg:pb-12">
                <div className="flex gap-2 items-center my-4 relative -mb-[29px] z-10 max-w-[135px]">
                    <h3 className="text-xl font-bold">최신 리뷰</h3>
                    <Link
                        to={'/category/0'}
                        className="font-semibold p-[1px] px-2 pb-1 rounded-full text-xs text-white bg-stone-400 hover:bg-orange-400 transition-colors"
                    >
                        more
                    </Link>
                </div>
                <Swiper
                    className="flex flex-col-reverse"
                    style={{paddingBottom: '20px'}}
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={1.2}
                    spaceBetween={25}
                    navigation={{
                        prevEl: prevBtn.current,
                        nextEl: nextBtn.current,
                    }}
                    breakpoints={{
                        768: {
                            width: 768,
                            slidesPerView: 2.1,
                        },
                    }}
                >
                    <div className="flex justify-end gap-2 mb-3">
                        <button
                            type="button"
                            className="swiper-custom-button w-[30px] h-[30px] flex justify-center items-center bg-orange-400 text-white rounded-full transition hover:bg-orange-400/[.8] disabled:opacity-50"
                            ref={prevBtn}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button
                            type="button"
                            className="swiper-custom-button w-[30px] h-[30px] flex justify-center items-center bg-orange-400 text-white rounded-full transition hover:bg-orange-400/[.8] disabled:opacity-50"
                            ref={nextBtn}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                    {newReviewData.map((data, idx) => (
                        <SwiperSlide className="main-slide bg-white rounded-lg shadow-md" key={idx}>
                            <Link to={`/detail/${data.idx}`} className="block p-5 py-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="inline-block text-xs p-1 px-3 bg-orange-400 text-white rounded-full">
                                        {data.menu}
                                    </span>
                                    <span className="text-sm">{data.wdate}</span>
                                </div>
                                <span className="text-[15px] mb-3">
                                    {handleStar(data.star).map((item, idx) => (
                                        <span key={idx} className={`text-${item ? 'yellow' : 'gray'}-400`}>
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                    ))}
                                </span>
                                <h4 className="text-xl font-bold text-gray-900 truncate w-full mb-2">{data.name}</h4>
                                <p className="truncate w-full text-gray-800">"{data.comment}"</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex gap-2 items-center my-4 mt-6">
                    <h3 className="text-xl font-bold">카테고리</h3>
                    <Link
                        to={'/category/0'}
                        className="font-semibold p-[1px] px-2 pb-1 rounded-full text-xs text-white bg-stone-400 hover:bg-orange-400 transition-colors"
                    >
                        more
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-4 text-center text-lg font-semibold text-orange-500">
                    {categoryArr.map(item => (
                        <Link
                            to={`/category/${item.idx}`}
                            className={`${
                                item.idx <= 0 ? 'col-span-2 ' : ''
                            } bg-white shadow-md rounded-lg p-5 lg:p-10`}
                            key={item.idx}
                        >
                            {item.name}
                            <p className="mt-2 lg:mt-6 text-3xl lg:text-5xl">
                                <EmojiProvider data={emojiData}>
                                    <Emoji
                                        name={item.idx !== 0 ? item.icon : item.icon[0]}
                                        className="mx-auto w-[40px] lg:w-[65px]"
                                    />
                                </EmojiProvider>
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
