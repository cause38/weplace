import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import dropdown from '../../assets/dropdown.svg';
import dropdownActive from '../../assets/dropdownActive.svg';
import selected from '../../assets/selected.svg';

import API from 'config';

import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Category = () => {
    const {id} = useParams();

    const token = sessionStorage.getItem('token') || '';

    const [categoryList, setCategoryList] = useState();
    const [tagList, setTagList] = useState();
    const [storeList, setStoreList] = useState();
    const [sendTagList, setSendTagList] = useState([]);

    // 진열방식
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
            });
    }, []);

    // 카테고리 리스트 클릭 시, 카테고리 변경 & 필터기능 리셋
    useEffect(() => {
        let _newSorting = [...SORTING];

        const getTrue = _newSorting.map((data, key) => {
            if (data.id !== 0) {
                _newSorting[key] = false;
            } else {
                _newSorting[key] = true;
            }
        });

        const selectedSorting = SORTING[0].name;

        setSelectedSorting(selectedSorting);
        setNewSorting(_newSorting);
        setOnlyLike(false);
        setIsDrop(false);

        fetch(`${API.categoryList}?category=${id}&token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setStoreList(data.data);
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
                alert('로그인 창으로 이동');
                window.location.href = '/login';
            } else {
                return;
            }
        } else {
            setOnlyLike(!onlyLike);
            if (!onlyLike) {
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
                        } else {
                            console.log(data.state);
                        }
                    });
            } else {
                fetch(
                    `${API.categoryList}?token=${token}&filter=${switchedValue}&category=${id}&tag=[${sendTagList}]`,
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
                        } else {
                            console.log(data.state);
                        }
                    });
            }
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

        console.log('datadatdtat', sendTagList);

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
                    } else {
                        console.log(data.state);
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
                    } else {
                        console.log(data.state);
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
            e.target.classList.remove('border-orange-300');
            e.target.classList.add('bg-orange-500', 'border-transparent', 'text-white');

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
                        } else {
                            console.log(data.state);
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
                        } else {
                            console.log(data.state);
                        }
                    });
            }
        } else {
            e.target.classList.remove('bg-orange-500', 'border-transparent', 'text-white');
            e.target.classList.add('border-orange-300');

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
                        } else {
                            console.log(data.state);
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
                        } else {
                            console.log(data.state);
                        }
                    });
            }
        }
    };

    return (
        <div className="flex-col">
            <section className="category-nav">
                <ul className="container-wb max-w-6xl py-4 mx-auto my-0 h-full flex gap-1.5 overflow-x-scroll">
                    {categoryList?.map(data => {
                        const {idx, name} = data;
                        return (
                            <Link
                                key={idx}
                                to={`/category/${idx}`}
                                className="min-w-fit p-2 rounded-full bg-orange-400 text-white hover:bg-orange-700"
                            >
                                {name}
                            </Link>
                        );
                    })}
                </ul>
            </section>

            <section className="max-w-6xl mx-auto my-0 flex w-full p-[20px] overflow-hidden">
                <div className="max-w-6xl flex">
                    <div
                        className="cursor-pointer flex w-[120px] justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        onClick={handleDrop}
                    >
                        <span className="">{selectedSorting}</span>
                        <div className="flex">
                            {!isDrop ? (
                                <img alt="dropdown" src={dropdown} />
                            ) : (
                                <img alt="dropdown" src={dropdownActive} />
                            )}
                        </div>
                    </div>
                    <div className={isDrop ? '' : null} onClick={() => setIsDrop(false)} />
                    {isDrop && (
                        <div className="absolute top-[235px] z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

                    <button className="mx-[20px]" onClick={e => showOnlyLike(e)}>
                        {onlyLike ? '💘 찜한가게' : '🖤 찜한가게'}
                    </button>

                    <div className="mx-[20px] w-[calc(100%-300px)] flex items-center flex-wrap h-11 overflow-y-scroll">
                        {tagList?.map(data => {
                            return (
                                <button
                                    onClick={e => handleTag(e, data.idx)}
                                    key={data.idx}
                                    value={data.name}
                                    className="min-w-fit mr-5 hover:underline underline-offset-4"
                                >
                                    #{data.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="category max-w-6xl mx-auto">
                <section
                    className={
                        storeList?.length > 0
                            ? 'flex grow flex-wrap mb-[20px] '
                            : 'flex justify-center items-center h-[calc(100vh-352px)]'
                    }
                >
                    {storeList?.length > 0 ? (
                        storeList.map(data => {
                            const {idx, category, name, distance, star, review, favorite, isFavorite, tag} = data;
                            return (
                                <Link key={idx} to={`/detail/${idx}`}>
                                    <div
                                        className={
                                            'h-[170px] w-[265px] min-w-[265px] my-[10px] mx-[5px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                        }
                                    >
                                        <div className="p-[10px] h-full flex flex-col justify-between">
                                            <div className="flex justify-between">
                                                <h3 className="w-fit px-[5px] py-[2px] rounded bg-orange-400 text-white text-[14px]">
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
                                            <div className="h-11 overflow-y-scroll">
                                                <div className="flex gap-1 flex-wrap max-h-fit">
                                                    {tag.map((data, id) => {
                                                        return (
                                                            <span
                                                                key={id}
                                                                className="rounded min-w-fit p-1 bg-orange-600 text-white text-[12px]"
                                                            >
                                                                #{data}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : onlyLike ? (
                        <p className="h-[calc(100vh-352px)]">찜한 가게가 없습니다😭</p>
                    ) : (
                        <p className="h-[calc(100vh-352px)]">작성된 리뷰가 없습니다😭</p>
                    )}
                </section>
            </section>
        </div>
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
