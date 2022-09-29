import React from 'react';
import {Link} from 'react-router-dom';

const Category = () => {
    return (
        <>
            <section className="category-nav">
                <ul className="flex gap-[10px] mx-[10px] my-[5px] px-[10px]">
                    {CATEGORY_LIST?.map(data => {
                        const {id, name, url} = data;
                        return (
                            <Link
                                to={url}
                                className="px-[10px] py-[5px] min-w-[81px] rounded-[20px] bg-orange-400 text-white hover:bg-orange-700"
                            >
                                <li key={id} className="text-center">
                                    {name}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </section>
            <section className="category flex">
                <div>최신순</div>
                <div>찜한가게</div>
                <div>해쉬태그들</div>
            </section>
            <section>매장리스트</section>
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

export default Category;
