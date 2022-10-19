import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import dropdown from '../../assets/dropdown.svg';
import dropdownActive from '../../assets/dropdownActive.svg';

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

    // 카테고리 리스트 클릭 시, 카테고리 변경
    useEffect(() => {
        setOnlyLike(false);
        setIsDrop(false);
        setSelectedSorting(SORTING[0].name);
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
                fetch(`${API.categoryList}?token=${token}&favorite="true"&filter=${switchedValue}&category=${id}`, {
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
            } else {
                fetch(`${API.categoryList}?token=${token}&filter=${switchedValue}&category=${id}`, {
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

    // 진열방식 값 변경
    const changeSortingVal = selectedSorting => {
        // 최신순 눌렀을 때는 빈값
        // 별점높은순을 눌렀을 때 sales
        // 가까운순을 눌렀을 때 low
        // 리뷰많은순을 눌렀을 때 high
        // 찜많은순을 눌렀을 때 review
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
        console.log('key', key);
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
            fetch(`${API.categoryList}?token=${token}&favorite="true"&filter=${switchedValue}&category=${id}`, {
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
        } else {
            fetch(`${API.categoryList}?filter=${switchedValue}&category=${id}`, {
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

    return (
        <div className="flex-col">
            <section className="category-nav">
                <ul className="container-wb max-w-6xl py-4 mx-auto my-0 h-full flex overflow-auto">
                    {categoryList?.map(data => {
                        const {idx, name} = data;
                        return (
                            <Link
                                key={idx}
                                to={`/category/${idx}`}
                                className="w-fit mx-[5px] px-[5px] py-[5px] rounded-[20px] bg-orange-400 text-white hover:bg-orange-700"
                            >
                                {name}
                            </Link>
                        );
                    })}
                </ul>
            </section>

            <section className="max-w-6xl mx-auto my-0 flex w-full p-[20px]">
                <div className="max-w-6xl flex">
                    {/* <div className="flex w-[95px] justify-between" onClick={handleDrop}>
                        <span className="font-semibold">{selectedSorting}</span>
                        <div className="flex">
                            {!isDrop ? (
                                <img alt="dropdown" src={dropdown} />
                            ) : (
                                <img alt="dropdown" src={dropdownActive} />
                            )}
                        </div>
                    </div> */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button
                                onClick={handleDrop}
                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            >
                                {selectedSorting}
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <ul className="py-1">
                                    {SORTING.map((data, key) => {
                                        return (
                                            // <li
                                            //     key={key}
                                            //     onClick={e => handleSorting(e, key)}
                                            //     value={data.name}
                                            //     className={newSorting[key] === true ? 'font-semibold' : ''}
                                            // >
                                            //     <div className="row justify-between">
                                            //         <p className="R13 black-80">{data.name}</p>
                                            //         {newSorting[key] === true}
                                            //     </div>
                                            // </li>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <li
                                                        key={key}
                                                        onClick={e => handleSorting(e, key)}
                                                        className={newSorting[key] === true ? 'font-semibold' : ''}
                                                    >
                                                        <div className="row justify-between">
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {data.name}
                                                            </p>
                                                            {newSorting[key] === true}
                                                        </div>
                                                    </li>
                                                )}
                                            </Menu.Item>
                                        );
                                    })}

                                    <Menu.Item>
                                        {({active}) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Account settings
                                            </div>
                                        )}
                                    </Menu.Item>
                                </ul>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* <div className={isDrop ? 'drop-background' : null} onClick={() => setIsDrop(false)} />
                    {isDrop && (
                        <div className="absolute drop-box bg-zinc-100 rounded">
                            <ul className="">
                                {SORTING.map((data, key) => {
                                    return (
                                        <li
                                            key={key}
                                            onClick={e => handleSorting(e, key)}
                                            value={data.name}
                                            className={newSorting[key] === true ? 'font-semibold' : ''}
                                        >
                                            <div className="row justify-between">
                                                <p className="R13 black-80">{data.name}</p>
                                                {newSorting[key] === true}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )} */}
                    <button className="mx-[20px]" onClick={e => showOnlyLike(e)}>
                        {onlyLike ? '💘 찜한가게' : '🖤 찜한가게'}
                    </button>
                    <div className="mx-[20px]">해쉬태그들</div>
                </div>
            </section>
            <section className="category max-w-6xl mx-auto">
                <section className="flex grow flex-wrap mt-[20px] mb-[20px]">
                    {storeList?.length > 0 ? (
                        storeList.map(data => {
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
                        })
                    ) : onlyLike ? (
                        <p>찜한 가게가 없습니다😭</p>
                    ) : (
                        <p>작성된 리뷰가 없습니다😭</p>
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
