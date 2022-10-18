import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import API from 'config';

const Category = () => {
    const {id} = useParams();
    const [categoryList, setCategoryList] = useState();
    const [storeList, setStoreList] = useState();

    const [tagList, setTagList] = useState();

    // category list
    useEffect(() => {
        fetch(`${API.categoryfilters}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                return setCategoryList(data.data.category), setTagList(data.data.tag);
            });
    }, []);

    // 카테고리 리스트 클릭 시, 카테고리 변경
    useEffect(() => {
        console.log('adadf', `${API.categoryList}?category=${id}`);
        fetch(`${API.categoryList}?category=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setStoreList(data.data));
    }, [id]);

    return (
        <>
            <section className="category-nav">
                <ul className="container-wb max-w-6xl py-4 mx-auto my-0 h-full flex overflow-auto">
                    {categoryList?.map(data => {
                        const {idx, name} = data;
                        return (
                            // <Swiper
                            //     modules={[Navigation, Pagination, A11y]}
                            //     spaceBetween={5}
                            //     slidesPerView={1.2}
                            //     navigation
                            //     breakpoints={{
                            //         768: {
                            //             width: 768,
                            //             slidesPerView: 2.1,
                            //         },
                            //     }}
                            // >
                            //     <SwiperSlide className="" key={idx}>
                            <Link
                                key={idx}
                                to={`/category/${idx}`}
                                className="mx-[15px] px-[10px] py-[5px] min-w-[81px] rounded-[20px] bg-orange-400 text-white hover:bg-orange-700"
                            >
                                {name}
                            </Link>
                            //     </SwiperSlide>
                            // </Swiper>
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
                        const {idx, category, name, distance, star, review, favorite, isFavorite, tag} = data;
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
                                            <p className="flex items-center text-[14px]">&#128681; {distance}분</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{name}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>⭐{star}</span>
                                            <span>&#128221;{review}</span>
                                            <span>{isFavorite === true ? '💘' : '🖤'}</span>
                                        </div>
                                        <div className="h-[50px]">
                                            <div className="flex gap-[5px] flex-wrap">
                                                {tag.map((data, id) => {
                                                    return (
                                                        <span
                                                            key={id}
                                                            className="rounded-[10px] px-[5px] py-[2px] bg-orange-600 text-white text-[12px]"
                                                        >
                                                            #{data}
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

export default Category;

const SORTING = [
    {id: 1, name: '최신순'},
    {id: 2, name: '별점 높은 순'},
    {id: 3, name: '가까운 순'},
    {id: 4, name: '리뷰 많은 순'},
    {id: 5, name: '찜 많은 순'},
];
