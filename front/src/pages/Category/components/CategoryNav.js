import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

const CategoryNav = ({data, currentCategory}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        if (currentCategory !== undefined) {
            const current = document.querySelector(`.navItem[data-id="${currentCategory}"] span`);
            handleCurrentClass(current);
        } else {
            return;
        }
    }, [currentCategory]);

    // 카테고리 선택 시, 카테고리 변경
    const handleCategoryId = (e, category) => {
        handleCurrentClass(e.currentTarget.querySelector('span'));
        navigate(`/category/${category.idx}`, {state: {pathname: pathname}});
    };

    const handleCurrentClass = current => {
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
    };

    return (
        <ScrollContainer className="scroll-container container-wb py-4 px-0 my-0 overflow-auto flex gap-2 whitespace-nowrap cursor-pointer">
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
    );
};

export default CategoryNav;
