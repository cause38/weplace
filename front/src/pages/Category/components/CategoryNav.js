import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Fragment} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const CategoryNav = ({data, currentCategory}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const swiperRef = useRef(null);
    const [swiper, setSwiper] = useState();
    const [cidx, setCidx] = useState(0);

    useEffect(() => {
        if (currentCategory !== undefined) {
            const current = document.querySelector(`.swiper-slide[data-id="${currentCategory}"]`);
            handleSwiperMove(current, currentCategory);
        } else {
            return;
        }
    }, [currentCategory]);

    // 카테고리 선택 시, 카테고리 변경
    const handleCategoryId = (e, category) => {
        handleSwiperMove(e.currentTarget, category.idx);
        navigate(`/category/${category.idx}`, {state: {pathname: pathname}});
    };

    useEffect(() => {
        if (swiperRef) {
            swiperRef.current.swiper.update();
        }
    }, [cidx]);

    const handleSwiperMove = (current, idx) => {
        setCidx(idx);

        const slides = document.querySelectorAll('.swiper-slide');
        slides.forEach(item => item.setAttribute('data-active', false));
        current.setAttribute('data-active', true);
    };

    return (
        <Fragment>
            {cidx > 6 ? (
                <article className="mx-auto overflow-auto scrollBar flex max-w-6xl p-2 cursor-pointer" key={data.idx}>
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={'auto'}
                        centeredSlides
                        onSwiper={swiper => setSwiper(swiper)}
                    >
                        {data.map((category, i) => {
                            return (
                                <SwiperSlide
                                    style={{width: 'auto'}}
                                    key={i}
                                    data-id={category.idx}
                                    onClick={e => handleCategoryId(e, category)}
                                >
                                    <span className="inline-block font-semibold py-1 sm:py-2 px-4 sm:px-6 rounded-full m-1">
                                        {category.name}
                                    </span>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </article>
            ) : (
                <article className="mx-auto overflow-auto scrollBar flex max-w-6xl p-2 cursor-pointer" key={data.idx}>
                    <Swiper ref={swiperRef} slidesPerView={'auto'} onSwiper={swiper => setSwiper(swiper)}>
                        {data.map((category, i) => {
                            return (
                                <SwiperSlide
                                    style={{width: 'auto'}}
                                    key={i}
                                    data-id={category.idx}
                                    onClick={e => handleCategoryId(e, category)}
                                >
                                    <span className="inline-block font-semibold py-1 sm:py-2 px-4 sm:px-6 rounded-full m-1">
                                        {category.name}
                                    </span>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </article>
            )}
        </Fragment>
    );
};

export default CategoryNav;
