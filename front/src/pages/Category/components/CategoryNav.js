import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

const CategoryNav = ({data, currentCategory}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [curIdx, setCurIdx] = useState(0);

    useEffect(() => {
        if (currentCategory !== undefined) {
            const current = document.querySelector(`.navItem[data-id="${currentCategory}"] span`);
            handleCurrentClass(current, currentCategory);
        } else {
            return;
        }
    }, [currentCategory]);

    // 카테고리 선택 시, 카테고리 변경
    const handleCategoryId = (e, category) => {
        handleCurrentClass(e.currentTarget.querySelector('span'), category.idx);
        navigate(`/category/${category.idx}`, {state: {pathname: pathname}});
    };

    const handleCurrentClass = (current, idx) => {
        const items = document.querySelectorAll('.navItem span');
        items.forEach(item => {
            item.classList.remove('bg-orange-400', 'text-white', 'border-transparent');
            item.classList.add('text-orange-400', 'border-orange-400');
        });
        current.classList.remove('text-orange-400', 'border-orange-400');
        current.classList.add('bg-orange-400', 'text-white', 'border-transparent');

        current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });

        setCurIdx(idx);
    };

    // category list scroll
    // const categoryRef = useRef(null);
    // const categoryScroll = useState(0);
    // useEffect(() => {
    //     if (categoryRef) {
    //         categoryRef.current.addEventListener('scroll', e => {
    //             console.log(e);
    //         });
    //     } else {
    //         return;
    //     }
    // }, [categoryScroll]);

    const handleScroll = e => {
        console.log(e);
    };

    return (
        <div
            className={`relative ${
                curIdx > 3 &&
                "before:content-[''] before:block before:w-6 before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r from-white to-transparent "
            } 
                            ${
                                curIdx < data.length - 4 &&
                                "after:content-[''] after:block after:w-6 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-l from-white to-transparent"
                            }`}
        >
            <ScrollContainer
                onScroll={e => handleScroll}
                className="scroll-container overflow-auto flex gap-2 whitespace-nowrap cursor-pointer"
            >
                {data.map((category, i) => {
                    return (
                        <button
                            type="button"
                            key={i}
                            data-id={category.idx}
                            onClick={e => handleCategoryId(e, category)}
                            className="navItem"
                        >
                            <span className="inline-block font-semibold py-1 sm:py-2 px-4 sm:px-6 rounded-full text-orange-400 border border-orange-400">
                                {category.name}
                            </span>
                        </button>
                    );
                })}
            </ScrollContainer>
        </div>
    );
};

export default CategoryNav;
