import React, {useEffect, useState, useRef} from 'react';
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom';

import CategoryNav from './components/CategoryNav';
import Store from './components/Store';

import {EmojiProvider, Emoji} from 'react-apple-emojis';
import emojiData from '../../lib/data.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar, faLocationDot, faFileLines} from '@fortawesome/free-solid-svg-icons';
import dropdown from '../../assets/dropdown.svg';
import dropdownActive from '../../assets/dropdownActive.svg';
import selected from '../../assets/selected.svg';

import API from 'config';

const Category = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const tagRef = useRef();
    const token = sessionStorage.getItem('token') || '';

    const qs = require('qs');

    const [categoryList, setCategoryList] = useState([]);
    const [currentCategory, setCurrentCategory] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [storeList, setStoreList] = useState();
    const [sendTagList, setSendTagList] = useState([]);

    // 필터 진열방식
    const [isDrop, setIsDrop] = useState(false);
    const [selectedSorting, setSelectedSorting] = useState(SORTING[0].name);
    const [newSorting, setNewSorting] = useState([]);

    // 찜리스트 체크
    const [onlyLike, setOnlyLike] = useState(false);

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
                const defaultAll = [{idx: '0', name: '전체보기'}];
                const categoryDate = [...defaultAll, ...data.data.category];
                setCategoryList(categoryDate);
                setTagList(data.data.tag);

                const current = categoryDate.filter(function (data) {
                    return data.idx === id ? true : false;
                });
                setCurrentCategory(current);
            });

        document.addEventListener('click', e => handleBodyClick(e));
        return () => {
            document.removeEventListener('click', e => handleBodyClick(e));
        };
    }, []);

    // 카테고리 리스트 클릭 시, 카테고리 변경 & 필터기능 리셋
    useEffect(() => {
        let _newSorting = [...SORTING];

        const getTrue = _newSorting.map((data, key) => {
            if (data.id !== 0) {
                return (_newSorting[key] = false);
            } else {
                return (_newSorting[key] = true);
            }
        });

        const selectedSorting = SORTING[0].name;

        const resetClassName = document.getElementsByClassName('hash');

        for (let i = 0; i < resetClassName.length; i++) {
            resetClassName[i].className =
                'hash bg-white text-orange-400 p-1 px-4 rounded-full shadow-sm shadow-orange-300';
        }

        setSelectedSorting(selectedSorting);
        setNewSorting(_newSorting);
        setOnlyLike(false);
        setIsDrop(false);
        setSendTagList([]);

        fetch(`${API.categoryList}?category=${id}&token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.state === 200) {
                    setStoreList(data.data);
                } else if (data.state === 400) {
                    console.error(data.msg);
                    alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                }
            });
    }, [id]);

    // 찜 리스트만 보기
    const showOnlyLike = e => {
        e.preventDefault();
        const switchedValue = changeSortingVal(selectedSorting);

        if (id === undefined) {
            return;
        }

        if (token === '') {
            setOnlyLike(false);
            if (window.confirm('로그인 후 이용 가능합니다. 로그인 하시겠습니까?')) {
                navigate('/login', {state: {pathname: pathname}});
            } else {
                return;
            }
        } else {
            setOnlyLike(!onlyLike);
            fetch(
                `${
                    API.categoryList
                }?token=${token}&favorite=${!onlyLike}&filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (data.state === 200) {
                        setStoreList(data.data);
                    } else if (data.state === 400) {
                        console.error(data.msg);
                        alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                    }
                });
        }
    };

    // 진열방식 값 변경
    const changeSortingVal = selectedSorting => {
        // 최신순 눌렀을 때는 recent
        // 별점높은순 눌렀을 때 star
        // 가까운순을 눌렀을 때 distance
        // 리뷰많은순을 눌렀을 때 review
        // 찜많은순을 눌렀을 때 favorite
        if (selectedSorting === '최신순') {
            return 'recent';
        } else if (selectedSorting === '별점높은순') {
            return 'star';
        } else if (selectedSorting === '가까운순') {
            return 'distance';
        } else if (selectedSorting === '리뷰많은순') {
            return 'review';
        } else if (selectedSorting === '찜많은순') {
            return 'favorite';
        }
    };

    // filter list dropdown
    const handleDrop = () => {
        setIsDrop(!isDrop);
    };

    // filter 선택 시,
    const handleSorting = (e, key) => {
        e.preventDefault();

        let value = SORTING.filter(data => data.id === key);

        let newSorting = [...SORTING];

        if (newSorting[key] !== value.id) {
            newSorting[key] = true;
        } else {
            newSorting[key] = !newSorting[key];
        }

        const selectedSorting = value[0].name;

        const switchedValue = changeSortingVal(selectedSorting);
        setSelectedSorting(selectedSorting);
        setIsDrop(!isDrop);
        setNewSorting(newSorting);

        if (id === undefined) {
            return;
        }

        if (onlyLike) {
            fetch(
                `${API.categoryList}?token=${token}&favorite="true"&filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (data.state === 200) {
                        setStoreList(data.data);
                    } else if (data.state === 400) {
                        console.error(data.msg);
                        alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                    }
                });
        } else {
            fetch(`${API.categoryList}?filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.state === 200) {
                        setStoreList(data.data);
                    } else if (data.state === 400) {
                        console.error(data.msg);
                        alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                    }
                });
        }
    };

    // 태그 선택 시, api 호출
    const handleTag = (e, key) => {
        const tagValue = key;
        let newTagList = sendTagList;

        const switchedValue = changeSortingVal(selectedSorting);
        e.target.classList.toggle('on');

        if (e.target.classList.contains('on')) {
            e.target.classList.remove('bg-white', 'text-orange-400');
            e.target.classList.add('bg-orange-400', 'text-white', 'font-semibold');

            newTagList.push(parseInt(tagValue));
            setSendTagList(newTagList);

            // 토큰이 있는 경우, 찜한가게 여부 포함
            if (token !== '') {
                fetch(
                    `${API.categoryList}?token=${token}&favorite${onlyLike}&filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        },
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.state === 200) {
                            setStoreList(data.data);
                        } else if (data.state === 400) {
                            console.error(data.msg);
                            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        }
                    });
            } else {
                fetch(`${API.categoryList}?filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.state === 200) {
                            setStoreList(data.data);
                        } else if (data.state === 400) {
                            console.error(data.msg);
                            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        }
                    });
            }
        } else {
            e.target.classList.add('bg-white', 'text-orange-400');
            e.target.classList.remove('bg-orange-400', 'text-white', 'font-semibold');

            const filtered = newTagList.filter(item => item !== parseInt(tagValue));
            setSendTagList(filtered);

            if (token !== '') {
                fetch(
                    `${API.categoryList}?token=${token}&favorite${onlyLike}&filter=${switchedValue}&category=${id}&tag=[${filtered}]`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        },
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.state === 200) {
                            setStoreList(data.data);
                        } else if (data.state === 400) {
                            console.error(data.msg);
                            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        }
                    });
            } else {
                fetch(`${API.categoryList}?filter=${switchedValue}&category=${id}&tag=[${filtered}]`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.state === 200) {
                            setStoreList(data.data);
                        } else if (data.state === 400) {
                            console.error(data.msg);
                            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        }
                    });
            }
        }
    };

    const handleBodyClick = e => {
        if (!e.target.closest('div').classList.contains('dropMenu')) {
            setIsDrop(false);
        }
    };

    // 개별 찜 선택
    const handleCheckeLike = (e, idx, isFavorite) => {
        e.preventDefault();
        const switchedValue = changeSortingVal(selectedSorting);

        if (id === undefined) {
            return;
        }

        if (token === '') {
            setOnlyLike(false);
            if (window.confirm('로그인 후 이용 가능합니다. 로그인 하시겠습니까?')) {
                navigate('/login', {state: {pathname: pathname}});
            } else {
                return;
            }
        } else {
            if (isFavorite === false) {
                fetch(`${API.favorite}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    body: qs.stringify({idx: idx, token: token}),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.state === 200) {
                            fetch(
                                `${API.categoryList}?token=${token}&favorite=${onlyLike}&filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`,
                                {
                                    method: 'GET',
                                    headers: {
                                        'Content-type': 'application/x-www-form-urlencoded',
                                    },
                                }
                            )
                                .then(res => res.json())
                                .then(data => {
                                    if (data.state === 200) {
                                        setStoreList(data.data);
                                    } else if (data.state === 400) {
                                        console.error(data.msg);
                                        alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                                    }
                                });
                        } else if (data.state === 400) {
                            console.error(data.msg);
                            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        }
                    });
            } else {
                fetch(`${API.favorite}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    body: qs.stringify({idx: idx, token: token}),
                })
                    .then(res => res.json())
                    .then(data => {
                        alert(data.msg);
                        if (data.state === 200) {
                            fetch(
                                `${API.categoryList}?token=${token}&favorite=${onlyLike}&filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`,
                                {
                                    method: 'GET',
                                    headers: {
                                        'Content-type': 'application/json',
                                    },
                                }
                            )
                                .then(res => res.json())
                                .then(data => {
                                    if (data.state === 200) {
                                        setStoreList(data.data);
                                    } else if (data.state === 400) {
                                        console.error(data.msg);
                                        alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                                    }
                                });
                        } else if (data.state === 400) {
                            console.error(data.msg);
                            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        }
                    });
            }
        }
    };

    return (
        <>
            <div className="flex flex-col category-container bg-orange-100">
                <section className="category-nav mt-[80px] bg-white">
                    <div className="container-wb py-4 my-0">
                        <CategoryNav data={categoryList} currentCategory={currentCategory[0]?.idx} />
                    </div>
                </section>

                <section className="container-wb h-[104px] mx-auto my-0 py-4 scrollbar flex items-center flex-wrap gap-4 gap-y-3 overflow-auto">
                    {tagList?.map(data => {
                        return (
                            <button
                                ref={tagRef}
                                onClick={e => handleTag(e, data.idx)}
                                key={data.idx}
                                value={data.name}
                                className="hash bg-white text-orange-400 p-1 px-4 rounded-full shadow-sm shadow-orange-300"
                            >
                                # {data.name}
                            </button>
                        );
                    })}
                </section>
            </div>
            <section
                className="category container-wb py-6 mt-0 flex flex-col gap-4"
                style={{minHeight: 'calc(100vh - 340px)'}}
            >
                <div className="flex justify-between items-center">
                    <div
                        className="dropMenu relative cursor-pointer flex w-[130px] justify-between items-center rounded-md border bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        onClick={handleDrop}
                    >
                        <span className="">{selectedSorting}</span>
                        <div className="dropMenu flex">
                            {!isDrop ? (
                                <img alt="dropdown" src={dropdown} />
                            ) : (
                                <img alt="dropdown" src={dropdownActive} />
                            )}
                        </div>
                        {isDrop && (
                            <div className="dropMenu absolute top-[45px] left-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <ul className="">
                                    {SORTING.map((data, key) => {
                                        return (
                                            <li
                                                key={key}
                                                onClick={e => handleSorting(e, key)}
                                                value={data.name}
                                                className={
                                                    newSorting[key] === true
                                                        ? 'font-semibold cursor-pointer'
                                                        : 'cursor-pointer'
                                                }
                                            >
                                                <div className="block px-4 py-2 text-sm flex justify-between">
                                                    <p className="">{data.name}</p>
                                                    {newSorting[key] === true && <img alt="selected" src={selected} />}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button
                        className="border bg-white rounded px-4 py-2 shadow-sm rounded-md hover:bg-gray-50"
                        onClick={e => showOnlyLike(e)}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`${onlyLike ? 'text-red-400' : 'text-gray-400'} mr-2`}
                        />
                        찜한 가게
                    </button>
                </div>
                <div
                    className={`${
                        storeList?.length > 0
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'
                            : 'flex justify-center items-center grow'
                    }`}
                >
                    {storeList?.length > 0 ? (
                        storeList.map((data, key) => {
                            const {idx, category, name, distance, star, review, favorite, isFavorite, tag} = data;
                            return (
                                <Store
                                    key={idx}
                                    idx={idx}
                                    category={category}
                                    name={name}
                                    distance={distance}
                                    star={star}
                                    review={review}
                                    favorite={favorite}
                                    isFavorite={isFavorite}
                                    tag={tag}
                                    handleCheckeLike={handleCheckeLike}
                                />
                            );
                        })
                    ) : (
                        <div className="flex gap-1">
                            {onlyLike ? '찜한 가게' : '작성된 리뷰'}가 없습니다
                            <EmojiProvider data={emojiData}>
                                <Emoji name={'crying-face'} className="w-[24px] h-[24px]" />
                            </EmojiProvider>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Category;

const SORTING = [
    {id: 0, name: '최신순', value: 'recent'},
    {id: 1, name: '별점높은순', value: 'star'},
    {id: 2, name: '가까운순', value: 'distance'},
    {id: 3, name: '리뷰많은순', value: 'review'},
    {id: 4, name: '찜많은순', value: 'favorite'},
];
