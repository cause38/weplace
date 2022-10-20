import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Keyboard, Mousewheel} from 'swiper';

import {useRecoilState} from '../../../../node_modules/recoil/';

const CategoryNav = ({data, currentCategory}) => {
    console.log('data', data);
    const router = useParams();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const categoryQuery = router.id;

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

    useEffect(() => {
        if (tabRef.current[scrollOnCategory] === undefined) {
            return;
        }
        tabRef.current[scrollOnCategory]?.scrollIntoView({
            // behavior: "smooth",
            block: 'center',
            inline: 'center',
        });
    }, [scrollOnCategory]);

    const handleCategoryId = (e, category) => {
        console.log('cate', category);
        e.preventDefault();
        // if (pathName === "/category") {
        // router.push({
        //   pathname: `/category/${category.id}`,
        // });
        window.location.href = `/category/${category.idx}`;

        // navigate(`/category/${category.idx}`, {state: {pathname: pathname}});

        // useStore.setState({
        //     categoryList: [category],
        // });
        // } else if (pathName === "/FAQ") {
        //   console.log(category.id);
        //   setCurrentName(category.name);
        // }
    };

    return (
        <article className="header-slide row max-width flex justify-center" key={data.idx}>
            {data.map((category, i) => {
                return (
                    <div className="header-slide-name-box link" key={i} onClick={e => handleCategoryId(e, category)}>
                        {currentName === category.name ? (
                            <h1
                                ref={el => (tabRef.current[category.name] = el)}
                                className="font-semibold min-w-fit p-2 rounded-full bg-orange-400 text-white bg-orange-700"
                            >
                                {category.name}
                            </h1>
                        ) : (
                            <h1 className="min-w-fit p-2 rounded-full bg-orange-400 text-white hover:bg-orange-700">
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
