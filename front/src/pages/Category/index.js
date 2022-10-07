import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Category = () => {
    return (
        <>
            <section className="category-nav">
                <ul className="container-wb max-w-6xl py-4 mx-auto my-0 h-full flex ">
                    {CATEGORY_LIST?.map(data => {
                        const {id, name, url} = data;
                        return (
                            <Link
                                key={id}
                                to={url}
                                className="mx-[15px] px-[10px] py-[5px] min-w-[81px] rounded-[20px] bg-orange-400 text-white hover:bg-orange-700"
                            >
                                <li key={id} className="text-center">
                                    {name}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </section>
            <section className="max-w-6xl mx-auto my-0 flex w-full">
                <div className="max-w-6xl flex">
                    <div className="mx-[20px]">최신순</div>
                    <div className="mx-[20px]">찜한가게</div>
                    <div className="mx-[20px]">해쉬태그들</div>
                </div>
            </section>
            <section className="category max-w-6xl mx-auto">
                <section className="flex grow flex-wrap mt-[20px] mb-[20px]">
                    {storeList?.map(data => {
                        const {idx, category, destMin, name, star, review, favorite, hash} = data;
                        return (
                            <Fragment key={idx}>
                                <div
                                    className={
                                        'h-[170px] w-[280px] min-w-[280px] my-[10px] mx-[5px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                    }
                                >
                                    <div className="p-[10px] h-full flex flex-col justify-between">
                                        <div className="flex justify-between">
                                            <h3 className="w-fit px-[5px] py-[2px] rounded-[20px] bg-orange-400 text-white text-[14px]">
                                                {category}
                                            </h3>
                                            <p className="flex items-center text-[14px]">&#128681; {destMin}분</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{name}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>⭐{star}</span>
                                            <span>&#128221;{review}</span>
                                            <span>💘{favorite}</span>
                                        </div>
                                        <div className="h-[50px]">
                                            <div className="flex gap-[5px] flex-wrap">
                                                {hash.map(data => {
                                                    const {id, content} = data;
                                                    return (
                                                        <span
                                                            key={id}
                                                            className="rounded-[10px] px-[5px] py-[2px] bg-orange-600 text-white text-[12px]"
                                                        >
                                                            #{content}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                </section>
            </section>
        </>
    );
};

const CATEGORY_LIST = [
    {id: 1, name: '전체보기', url: '/category'},
    {id: 2, name: '한식', url: '/category'},
    {id: 3, name: '중식', url: '/category'},
    {id: 4, name: '일식', url: '/category'},
    {id: 5, name: '양식', url: '/category'},
    {id: 6, name: '분식', url: '/category'},
    {id: 7, name: '아시안', url: '/category'},
];

const storeList = [
    {
        idx: 1,
        category: '한식',
        destMin: '5',
        name: '일차돌',
        star: '4',
        review: '1',
        favorite: '3',
        hash: [
            {id: 1, content: '가성비'},
            {id: 2, content: '맛있는'},
            {id: 3, content: '넓은'},
            {id: 4, content: '가까운'},
            {id: 5, content: '포장'},
            {id: 6, content: '서비스'},
        ],
    },
    {
        idx: 2,
        category: '한식',
        destMin: '5',
        name: '일차돌',
        star: '4',
        review: '1',
        favorite: '3',
        hash: [
            {id: 1, content: '가성비'},
            {id: 2, content: '맛있는'},
        ],
    },
    {
        idx: 3,
        category: '한식',
        destMin: '5',
        name: '일차돌',
        star: '4',
        review: '1',
        favorite: '3',
        hash: [
            {id: 1, content: '가성비'},
            {id: 2, content: '맛있는'},
        ],
    },
    {
        idx: 4,
        category: '한식',
        destMin: '5',
        name: '일차돌',
        star: '4',
        review: '1',
        favorite: '3',
        hash: [
            {id: 1, content: '가성비'},
            {id: 2, content: '맛있는'},
        ],
    },
];

export default Category;
