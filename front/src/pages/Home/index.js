import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y} from 'swiper';
import axios from 'axios';
import iconThinking from '../../assets/thinking_emoji.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faCirclePlus} from '@fortawesome/free-solid-svg-icons';

import 'styles/home.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'styles/swiper-custom.css';

const Home = () => {
    const navigate = useNavigate();
    const [newReviewData, setNewReviewData] = useState([]);
    const categoryArr = [
        {
            idx: 0,
            name: '전체보기',
            icon: '😋🍴',
        },
        {
            idx: 1,
            name: '한식',
            icon: '🍚',
        },
        {
            idx: 2,
            name: '중식',
            icon: '🥟',
        },
        {
            idx: 3,
            name: '일식',
            icon: '🍣',
        },
        {
            idx: 4,
            name: '양식',
            icon: '🍝',
        },
        {
            idx: 5,
            name: '분식',
            icon: '🥠',
        },
        {
            idx: 6,
            name: '아시안 매장',
            icon: '🍜',
        },
    ];

    useEffect(() => {
        // get 최신리뷰 데이터
        axios.get('http://place-api.weballin.com/main').then(res => {
            if (res.status === 200) {
                setNewReviewData(res.data.data.reviews);
            }
        });
    }, []);

    const handleDetailView = idx => {
        navigate('/detail', {state: {idx: idx}});
    };

    const handleLever = e => {
        const lever = e.currentTarget;
        lever.classList.add('animation');
        setTimeout(() => {
            lever.classList.remove('animation');
        }, 1000);
    };

    const handleStar = star => {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < star) arr.push(true);
            else arr.push(false);
        }
        return arr;
    };

    return (
        <>
            <div className="pt-28 pb-8 md:pt-40 md:pb-20 font-sans-g pb-20 bg-orange-100">
                <div className="container-wb relative my-10 py-0 flex flex-col justify-center items-center gap-10 w-full ">
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
                        className="text-4xl md:text-5xl font-semibold text-orange-400 mb-0 md:mb-10"
                        style={{textShadow: '1px 1px 0px #ea580c'}}
                    >
                        오늘의 메뉴는?
                    </h3>
                    <div className="relative flex items-center w-full w-lg:w-1/3 max-w-[500px]">
                        <div className="w-10/12 p-6 py-8 bg-orange-400 rounded-lg shadow-md">
                            <div className="p-8 py-10 bg-white rounded-lg shadow-inner text-4xl font-bold text-orange-500 text-center">
                                제육볶음
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-2 w-2/12 h-3/5 overflow-visible">
                            <div className="absolute right-0 bottom-0 w-full h-full bg-orange-500 rounded-r-lg z-1"></div>
                            <div
                                id="lever"
                                onClick={handleLever}
                                className="absolute -top-[110px] left-1/2 -translate-x-1/2 w-[40px] z-10 flex flex-col-reverse items-center cursor-pointer"
                            >
                                <div className="w-[10px] h-[30px] bg-orange-600"></div>
                                <div className="bar w-[10px] h-[70px] bg-stone-300"></div>
                                <div className="circle w-[40px] h-[40px] bg-yellow-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-wb mt-0 pb-8 lg:pb-12">
                <div className="flex gap-2 justify-between items-center my-4">
                    <h3 className="text-xl font-bold">최신 리뷰</h3>
                    <Link
                        to={'/category/0'}
                        className="font-semibold p-[1px] px-2 pb-1 rounded-full text-xs text-white bg-orange-400 hover:bg-orange-300 transition-colors"
                    >
                        more
                    </Link>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={25}
                    slidesPerView={1.2}
                    navigation
                    breakpoints={{
                        768: {
                            width: 768,
                            slidesPerView: 2.1,
                        },
                    }}
                >
                    {newReviewData.map((data, idx) => (
                        <SwiperSlide className="bg-white rounded-lg p-5 py-6 shadow-lg" key={idx}>
                            <Link to={`/detail/${data.idx}`}>
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 text-center text-lg font-semibold text-orange-500">
                    {categoryArr.map(item => (
                        <Link
                            to={`/category/${item.idx}`}
                            className={`${
                                item.idx <= 0 ? 'col-span-2 ' : ''
                            } bg-white shadow-lg rounded-lg p-5 lg:p-10`}
                            key={item.idx}
                        >
                            {item.name}
                            <p className="mt-2 lg:mt-6 text-3xl lg:text-5xl">{item.icon}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
