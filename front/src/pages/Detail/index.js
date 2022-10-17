import React from 'react';
import {profileImgValue} from 'atoms/state';

const Detail = () => {
    return (
        <div className="container-wb">
            <div className="bg-white rounded p-6 pt-7 shadow-lg">
                <span className="rounded-full px-4 py-1 bg-orange-500 text-white font-medium">한식</span>
                <h3 className="text-2xl font-bold mt-4">매장 이름</h3>
                <p>서울특별시 성동구 무슨1길 123</p>
                <div className="flex gap-2 mt-4">
                    <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                        #가까운
                    </span>
                    <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                        #맛있는
                    </span>
                    <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                        #넓은
                    </span>
                    <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                        #가성비
                    </span>
                </div>
            </div>
            <div className="flex gap-5 mt-4">
                <div className="flex flex-col items-center gap-1 w-full p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">⭐</span>
                    <p className="text-lg font-bold text-gray-700">4.2</p>
                    <p>별점</p>
                </div>
                <div className="flex flex-col items-center gap-1 w-full p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">💗</span>
                    <p className="text-lg font-bold text-gray-700">3</p>
                    <p>찜</p>
                </div>
                <div className="flex flex-col items-center gap-1 w-full p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">🏁</span>
                    <p className="text-lg font-bold text-gray-700">3분</p>
                    <p>예상 거리</p>
                </div>
            </div>
            <div className="relative flex flex-col gap-5 mt-4 p-4 bg-white shadow-lg rounded">
                <div className="flex gap-1 justify-between">
                    <div className="flex gap-4">
                        <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2"></span>
                        <div className="flex flex-col gap-2">
                            <p>JJ</p>
                            <div className="flex gap-2 items-center">
                                <span>⭐⭐⭐⭐</span>
                                <div className="w-[15px] h-[15px] border ms-2"></div>
                            </div>
                            <strong className="text-xl">또 가고 싶은 곳</strong>
                            <p className="mb-1">
                                <span className="text-sm rounded-full px-4 py-1 bg-orange-500 text-white">
                                    메뉴이름
                                </span>
                            </p>
                            <div className="flex gap-2">
                                <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                                    #저렴한
                                </span>
                                <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                                    #맛있는
                                </span>
                            </div>
                        </div>
                    </div>
                    <span>2022-10-18</span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3 items-center border p-2 rounded-full">
                        <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">👍</span>
                        <p>가깝고 맛있다</p>
                    </div>
                    <div className="flex gap-3 items-center border p-2 rounded-full">
                        <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">👎</span>
                        <p>가깝고 맛있다</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <div className="w-[100px] h-[100px] border"></div>
                        <div className="w-[100px] h-[100px] border"></div>
                        <div className="w-[100px] h-[100px] border"></div>
                    </div>
                </div>
                <span className="absolute right-3 bottom-3 text-center text-gray-600 cursor-pointer">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default Detail;
