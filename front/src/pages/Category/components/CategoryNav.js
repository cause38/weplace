import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Keyboard, Mousewheel} from 'swiper';

const CategoryNav = ({data, currentCategory}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const tabRef = useRef([]);
    const [scrollOnCategory, setScrollOnCategory] = useState();
    const [currentName, setCurrentName] = useState();

    useEffect(() => {
        if (currentCategory !== undefined) {
            setScrollOnCategory(currentCategory);
            setCurrentName(currentCategory);
        } else {
            return;
        }
    }, [currentCategory]);

    // 해당 카테고리가 가운데에 보이게
    useEffect(() => {
        if (tabRef.current[scrollOnCategory] === undefined) {
            return;
        }
        tabRef.current[scrollOnCategory]?.scrollIntoView({
            block: 'center',
            inline: 'center',
        });
    }, [scrollOnCategory]);

    // 카테고리 선택 시, 카테고리 변경
    const handleCategoryId = (e, category) => {
        e.preventDefault();

        navigate(`/category/${category.idx}`, {state: {pathname: pathname}});
        setCurrentName(category.name);
    };

    return (
        <article
            className="category-nav-container my-0 mx-auto overflow-hidden overflow-x-auto flex max-w-6xl p-2 cursor-pointer"
            key={data.idx}
        >
            {data.map((category, i) => {
                return (
                    <div
                        className="header-slide-name-box link min-w-fit"
                        key={i}
                        onClick={e => handleCategoryId(e, category)}
                    >
                        {currentName === category.name ? (
                            <h1
                                ref={el => (tabRef.current[category.name] = el)}
                                className="font-semibold min-w-fit p-2 rounded-full text-white bg-orange-500 m-1"
                            >
                                {category.name}
                            </h1>
                        ) : (
                            <h1 className="min-w-fit p-2 rounded-full bg-white text-orange-600 border border-orange-300 m-1 hover:bg-orange-500 hover:text-white">
                                {category.name}
                            </h1>
                        )}
                    </div>
                );
            })}
        </article>
    );
};

export default CategoryNav;
