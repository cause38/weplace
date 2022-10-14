import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y} from 'swiper';
import axios from 'axios';
import iconThinking from '../../assets/thinking_emoji.png';

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
        axios.get('http://place-api.weballin.com/main').then(response => {
            if (response.status === 200) {
                console.log(response);
                setNewReviewData(response.data.data.reviews);
            }
        });
    }, []);

    const handleDetailView = idx => {
        navigate('/detail', {state: {idx: idx}});
    };

    return (
        <>
            <div className="pt-28 pb-8 md:pt-40 md:pb-20 font-sans-g pb-20 bg-orange-100">
                <div className="container-wb relative py-0 flex flex-col justify-center items-center gap-10 w-full ">
                    <img
                        src={iconThinking}
                        alt="thinking_food"
                        className="md:absolute w-20 md:w-36 md:-top-20 md:left-10 animate-spin-wb"
                    />
                    <img
                        src={iconThinking}
                        alt="thinking_food"
                        className="hidden md:block absolute w-36 -bottom-20 right-0 animate-reverse-spin"
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
                        <div className="absolute right-0 bottom-2 w-2/12 h-3/5 bg-orange-500 rounded-r-lg">
                            <span className="absolute left-1/2 -translate-x-1/2 block w-3 h-8 bg-orange-600"></span>
                            <svg
                                viewBox="0 0 114 355"
                                version="1.1"
                                className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 w-2/4 cursor-pointer"
                            >
                                <g id="lever">
                                    <rect id="socket" fill="#3A6255" x="43" y="355" width="28" height="91.5"></rect>
                                    <rect id="rod" fill="#D8D8D8" x="43" y="57" width="28" height="298"></rect>
                                    <g id="top">
                                        <circle fill="#F0A830" cx="57" cy="57" r="57"></circle>
                                        <path
                                            d="M102.570209,40.1833305 C102.676794,40.0838119 102.777304,39.9779482 102.871517,39.8656698 C105.889032,36.2695351 101.304331,27.4546828 92.6313004,20.177146 C83.9582698,12.8996092 74.4812099,9.91524313 71.4636947,13.5113778 C71.3644458,13.629658 71.273421,13.753584 71.1904954,13.8829152 C76.2444491,16.5602964 82.1808506,20.6036755 88.1462014,25.6091992 C94.0729258,30.5823114 99.0593916,35.6922002 102.570209,40.1833305 Z"
                                            id="highlight"
                                            fill="#FFFFFF"
                                            transform="translate(87.494931, 26.085223) rotate(7.000000) translate(-87.494931, -26.085223) "
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-wb py-10">
                <div className="">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-xl font-bold">💖최신 리뷰</h3>
                        <Link to="/category" className="text-sm font-semibold text-gray-600 hover:text-orange-500">
                            더보기 +
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
                        {newReviewData.map(data => (
                            <SwiperSlide className="bg-white rounded-lg p-5 shadow-lg" key={data.idx}>
                                <Link to="/detail">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="inline-block	text-xs p-1 px-3 bg-orange-400 text-white rounded-full">
                                            {data.menu}
                                        </span>
                                        <span className="text-sm">{data.wdate}</span>
                                    </div>
                                    <div className="mt-6">
                                        <span className="text-xs mb-1">{'⭐'.repeat(data.star)}</span>
                                        <h4 className="text-xl font-bold text-gray-900 truncate w-full">{data.name}</h4>
                                        <p className="truncate w-full text-gray-800">{data.comment}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center text-lg font-semibold text-orange-500">
                    {categoryArr.map(item => (
                        <Link
                            to={`/category/${item.idx}`}
                            className={`${item.idx <= 0 ? 'col-span-2 ' : ''} bg-white shadow-lg rounded-lg p-10`}
                            key={item.idx}
                        >
                            {item.name}
                            <p className="mt-6 text-5xl">{item.icon}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
