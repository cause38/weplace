import {React, useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate, useParams} from '../../../node_modules/react-router-dom/dist/index';
import InputBox from './components/InputBox';
import SelectBox from './components/SelectBox';
import Modal from 'components/Modal';
import axios from 'axios';
import getMapData from '../../../node_modules/lodash/_getMapData';
import {isModuleDeclaration} from '../../../../../../Users/FNF09/AppData/Local/Microsoft/TypeScript/4.8/node_modules/@babel/types/lib/index';

const Write = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(useLocation().search);
    const sidx = searchParams.get('idx');
    const ridx = searchParams.get('ridx');
    const token = sessionStorage.getItem('token');
    const locationArr = ['성동구'];

    // 거리계산을 위한 현재 위치 좌표(현재 회사 위치로 설정)
    const myLocation = {
        x: '127.048455023259',
        y: '37.5464770743083',
    };

    // 카테고리 목록
    const [isModify, setIsModify] = useState(false);

    // 카테고리 목록
    const [categoryData, setCategoryData] = useState([]);

    // 태그 목록
    const [tagData, setTagData] = useState([]);

    // 선택한 태그 목록
    const [tagList, setTagList] = useState([]);

    // 미리보기 이미지 첨부
    const [files, setFiles] = useState([]);

    // 미리보기 이미지 -> base64 파일로 변환
    const [Base64s, setBase64s] = useState([]);

    // 매장검색 모달
    const [modalVisible, setModalVisible] = useState(false);

    // 매장검색 - 지역
    const [searhStoreLocation, setSearhStoreLocation] = useState('성동구');

    // 매장검색 - 매장명
    const [searhStoreName, setSearhStoreName] = useState('');

    // 매장검색 - 결과
    const [searhStoreListMain, setSearhStoreListMain] = useState(false);
    const [searhStoreListSub, setSearhStoreListSub] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);

    // form data
    const [value, setValue] = useState({
        token,
        idx: 0,
        name: '',
        address: '',
        distance: '',
        url: '',
        base: '지상',
        floor: 1,
        cidx: 1,
        menu: '',
        star: 1,
        comment: '',
        comment_good: '',
        comment_bad: '',
        tag: [],
        reviewImg: [],
    });

    const searchBtn = useRef(null);
    const tagBox = useRef();
    const fileInput = useRef();

    /**
     * =====:: default data get ::=====
     *
     * 로그인 체크 후
     * 등록 -> 카테고리, 태그 목록
     * 수정 -> 기존 리뷰 데이터
     *
     * ================================
     *  */
    useEffect(() => {
        const fetchData = async () => {
            if (token === null) {
                navigate('/login');
            } else {
                const modifyMode = sidx !== '' && sidx !== null ? true : false;

                if (modifyMode) {
                    setIsModify(true);
                    setIsReadOnly(true);
                }

                const url = `http://place-api.weballin.com/review/${modifyMode ? 'modify' : 'write'}`;
                const params = modifyMode ? {params: {token, idx: sidx, ridx: ridx}} : '';

                // 수정모드에서도 기본 카테고리 데이터 필요하여 세팅
                if (modifyMode) await getDefalutData('http://place-api.weballin.com/review/write', '', false);
                await getDefalutData(url, params, modifyMode);
            }
        };

        fetchData();
    }, []);

    const getDefalutData = (url, params, modifyMode) => {
        axios.get(url, params).then(res => {
            if (res.status === 200) {
                const data = res.data.data;
                if (modifyMode) {
                    setValue({...value, ...data.review});
                    setTagData(data.tag);
                } else {
                    setCategoryData(data.category);
                    setTagData(data.tag);
                }
            }
        });
    };

    // 첨부이미지 -> base64 파일로 변환
    useEffect(() => {
        if (files) {
            setBase64s([]);
            Array.from(files).forEach((image, idx) => {
                encodeFileToBase64(image).then(data => setBase64s(prev => [...prev, {image: image, url: data}]));
            });
            setValue({...value, ['reviewImg']: [...files]});
        }
    }, [files]);

    const encodeFileToBase64 = image => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = event => resolve(event.target.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleFormData = (id, e) => {
        const inputValue =
            id === 'idx' || id === 'cidx' || id === 'floor' || id === 'star'
                ? parseInt(e.target.value)
                : e.target.value;

        setValue({...value, [id]: inputValue});
    };

    // 첨부이미지 삭제
    const deleteImage = targetIdx => {
        const dataTranster = new DataTransfer();

        Array.from(files).forEach((file, idx) => {
            if (idx !== targetIdx) dataTranster.items.add(file);
        });

        setFiles(dataTranster.files);
        fileInput.current.files = dataTranster.files;
    };

    // 태그 토글 시 애니메이션
    useEffect(() => {
        const tagFunc = async () => {
            let newTagList = value['tag'];

            newTagList.forEach(id => {
                const tag = document.getElementById(`tag_${id}`);
                tag.setAttribute('checked', 'checked');
            });
            await handleTagClass();
        };
        tagFunc();
    }, []);

    const handleTag = e => {
        const tagFunc = async () => {
            const tagValue = e.target.nextSibling.value;
            let newTagList = value['tag'];

            e.target.classList.toggle('on');

            if (e.target.classList.contains('on')) {
                console.log('on 있음');
                newTagList = newTagList.filter(item => item !== tagValue);
            } else {
                console.log('on 없음');
                newTagList.push(parseInt(tagValue));
            }

            setTagList([...newTagList]);
            handleTagClass();
        };
        tagFunc();
    };

    const handleTagClass = () => {
        const tags = document.querySelectorAll('input[name="tags"]:checked');
        const labels = document.querySelectorAll('.tagLabel');
        // 초기화
        labels.forEach(item => item.classList.remove('on'));

        // 선택된 태그 리스트만 클래스 적용
        tags.forEach(tag => {
            const label = tag.previousSibling;
            label.classList.add('on');
            label.classList.remove('bg-white', 'text-orange-600', 'border-orange-300');
            label.classList.add('bg-orange-500', 'border-transparent', 'text-white');
        });
    };

    // 태그 목록 더보기 애니메이션
    const handleTagMore = e => {
        e.target.classList.toggle('on');

        if (e.target.classList.contains('on')) {
            tagBox.current.classList.remove('h-[100px]');
            tagBox.current.classList.add('pb-20');
            e.target.textContent = '-';
        } else {
            tagBox.current.classList.add('h-[100px]');
            tagBox.current.classList.remove('pb-20');
            e.target.textContent = '+';
        }
    };

    // 매장검색 - 버튼 활성화
    const handleSearchBtn = () => {
        searchBtn.current.innerText = '검색';
        searchBtn.current.removeAttribute('disabled');
    };

    // 매장검색 - api
    const handleStoreSearch = e => {
        e.preventDefault();
        if (searhStoreName.trim() === '') {
            alert('매장명을 입력해주세요');
        } else {
            // 매장검색 지역 & 매장명
            const data = `${searhStoreLocation} ${searhStoreName}`;

            // 검색 버튼 비활성화
            searchBtn.current.innerText = '검색중...';
            searchBtn.current.setAttribute('disabled', true);

            // 카카오 api 검색 (파라미터 x, y => 현 위치 좌표(현재 회사주소))
            axios
                .get(
                    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${data}&x=${myLocation.x}&y=${myLocation.y}`,
                    {
                        headers: {Authorization: 'KakaoAK 940b8053d629afc997a3a283dd999724'},
                    }
                )
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.documents.length > 0) {
                            // 지역 필터 적용
                            const result = res.data.documents.reduce((acc, cur) => {
                                if (cur.address_name.indexOf(searhStoreLocation) > -1) acc.push(cur);
                                return acc;
                            }, []);

                            // 재가공 데이터 get
                            getReviewData(result);
                        } else {
                            alert('검색된 데이터가 없습니다');
                            handleSearchBtn();
                        }
                    } else {
                        alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                        handleSearchBtn();
                        setModalVisible(false);
                    }
                });
        }
    };

    // 매장검색 재가공 데이터
    const getReviewData = data => {
        const url = 'http://place-api.weballin.com/review/write/mapInfo';

        axios
            .post(url, {
                json: JSON.stringify(data),
            })
            .then(function (res) {
                handleSearchBtn();

                if (res.data.state === 200) {
                    setSearhStoreListMain(res.data.data.main);
                    setSearhStoreListSub(res.data.data.sub);
                } else if (res.data.state === 400) {
                    alert(res.data.msg);
                } else {
                    alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                    setModalVisible(false);
                }
            })
            .catch(function (error) {
                console.error(error);
                alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
            });
    };

    // 매장 검색 후 선택 시 data 적용
    const setStoreData = (id, idx) => {
        let data = null;
        let newValue = {};

        if (id === 'main') {
            data = searhStoreListMain[idx];
            setIsReadOnly(true);
        } else {
            data = searhStoreListSub[idx];
            setIsReadOnly(false);
        }

        for (let key in data) {
            const dataValue =
                key === 'idx' || key === 'cidx' || key === 'floor' || key === 'star' ? parseInt(data[key]) : data[key];

            newValue = {...newValue, [key]: dataValue};
        }

        setValue({...value, ...newValue});
        setModalVisible(false);

        // 검색 모달 초기화
        setSearhStoreListMain(false);
        setSearhStoreListSub(false);
        setSearhStoreName('');
    };

    const handleSubmit = () => {
        const msg = isModify ? '수정' : '등록';
        const url = 'http://place-api.weballin.com/review/write';

        let formData = new FormData();
        for (let key in value) {
            if (key !== 'reviewImg') {
                formData.append(key, value[key]);
            } else {
                value[key].forEach(item => {
                    formData.append('reviewImg', item);
                });
            }
        }
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        axios
            .post(url, value)
            .then(function (res) {
                handleSearchBtn();
                console.log(res);
                if (res.data.state === 200) {
                    if (window.confirm(`리뷰가 ${msg}되었습니다`)) {
                        navigate(`/detail/${res.data.data.shopIdx}`);
                    }
                } else {
                    alert(res.data.msg);
                }
            })
            .catch(function (error) {
                console.error(error);
                alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
            });
    };

    return (
        <div className="container-wb">
            <Modal
                visible={modalVisible}
                setModalVisible={setModalVisible}
                title="매장 검색"
                contents={
                    <>
                        <form onSubmit={handleStoreSearch} className="flex flex-col gap-6">
                            <div className="w-full flex flex-col sm:flex-row gap-4 bg-gray-100 p-4 rounded-lg">
                                <div className="w-full sm:w-2/4">
                                    <div className="relative w-full">
                                        <select
                                            id="storeSearch"
                                            disabled
                                            className="w-full rounded border appearance-none border-gray-200 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10"
                                        >
                                            {locationArr.map((item, idx) => (
                                                <option key={idx}>{item}</option>
                                            ))}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="매장 명을 입력해주세요."
                                    value={searhStoreName}
                                    onChange={e => setSearhStoreName(e.target.value)}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                />
                            </div>
                            <div className="max-h-[45vh] overflow-auto scrollbar bg-gray-100 p-4 rounded-lg flex flex-col items-center gap-4">
                                {!searhStoreListMain && !searhStoreListSub && (
                                    <p className="flex justify-center items-center w-full h-full text-gray-500 font-light text-center">
                                        리뷰하실 매장을 검색해주세요.
                                    </p>
                                )}
                                {searhStoreListMain.length <= 0 && searhStoreListSub <= 0 && (
                                    <p className="flex justify-center items-center w-full h-full text-gray-500 font-light text-center">
                                        검색결과가 없습니다.
                                    </p>
                                )}
                                {searhStoreListMain.length > 0 &&
                                    searhStoreListMain.map((item, id) => (
                                        <div
                                            key={`main_${item.idx}`}
                                            className="flex justify-between gap-2 items-center w-full p-4 pr-5 pb-5 bg-white rounded-lg shadow-md"
                                        >
                                            <div>
                                                <p className="flex items-center mb-1">⭐ {item.star}</p>
                                                <p className="text-xl font-bold">{item.name}</p>
                                                <p className="mb-4 text-gray-600">{item.address}</p>
                                                <span className="text-xs p-1 px-3 bg-gray-400 text-white rounded-full mr-2">
                                                    {item.base} {item.floor}층
                                                </span>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs p-1 px-3 bg-orange-500 text-white rounded-full hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                                                >
                                                    지도 바로가기
                                                </a>
                                            </div>
                                            <button
                                                onClick={() => setStoreData('main', id)}
                                                type="button"
                                                className="block h-full min-w-[100px] w-1/5 px-6 md:px-8 py-2 md:py-2.5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                                            >
                                                선택
                                            </button>
                                        </div>
                                    ))}
                                {searhStoreListSub.length > 0 &&
                                    searhStoreListSub.map((item, id) => (
                                        <div
                                            key={`sub_${id}`}
                                            className="flex justify-between gap-2 items-center w-full p-4 pr-5 pb-5 bg-white rounded-lg shadow-md"
                                        >
                                            <div>
                                                <p className="text-xl font-bold">{item.name}</p>
                                                <p className="mb-4 text-gray-600">{item.address}</p>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs p-1 px-3 bg-orange-500 text-white rounded-full hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                                                >
                                                    지도 바로가기
                                                </a>
                                            </div>
                                            <button
                                                onClick={() => setStoreData('sub', id)}
                                                type="button"
                                                className="block h-full min-w-[100px] w-1/5 px-6 md:px-8 py-2 md:py-2.5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                                            >
                                                선택
                                            </button>
                                        </div>
                                    ))}
                            </div>
                            <button
                                ref={searchBtn}
                                type="button"
                                onClick={handleStoreSearch}
                                className="flex flex-col justify-center items-center min-w-[100px] w-full sm:w-auto px-8 py-2.5 mx-auto leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                            >
                                검색
                            </button>
                        </form>
                    </>
                }
            />

            <div className="flex justify-between items-center mb-5 md:mb-10">
                <h2 className="text-3xl font-bold text-orange-600">Review</h2>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 md:px-8 py-2 md:py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 md:px-8 py-2 md:py-2.5 leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                    >
                        {isModify ? '수정' : '저장'}
                    </button>
                </div>
            </div>

            <form name="frm">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="inline-block text-gray-700 mb-2" htmlFor="storeName">
                                매장 이름
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                                <input
                                    name="storeName"
                                    id="storeName"
                                    type="text"
                                    value={value.name}
                                    readOnly
                                    onClick={e => {
                                        isModify ? e.preventDefault() : setModalVisible(true);
                                    }}
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-0"
                                />
                                <button
                                    type="button"
                                    onClick={e => {
                                        isModify ? e.preventDefault() : setModalVisible(true);
                                    }}
                                    disabled={isModify}
                                    className={`min-w-[175px] w-full sm:w-1/5 h-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform rounded-md focus:outline-none ${
                                        isModify
                                            ? 'bg-gray-200'
                                            : 'bg-orange-500 hover:bg-orange-400 focus:outline-none focus:bg-orange-600'
                                    }`}
                                >
                                    매장 검색
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4">
                            <div>
                                <label className="inline-block text-gray-600 mb-2" htmlFor="address">
                                    주소
                                </label>
                                <input
                                    name="address"
                                    id="address"
                                    type="text"
                                    readOnly
                                    value={value.address}
                                    onClick={e => {
                                        isModify ? e.preventDefault() : setModalVisible(true);
                                    }}
                                    onChange={e => handleFormData('address', e)}
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-0"
                                />
                            </div>
                            <SelectBox
                                label="상세 주소"
                                id="addressDetail"
                                isReadOnly={isReadOnly}
                                onChange={e => handleFormData('base', e)}
                                value={value.base}
                                arr={['지상', '지하'].map((item, idx) => (
                                    <option key={idx} value={item}>
                                        {item}
                                    </option>
                                ))}
                                contents={
                                    <>
                                        <input
                                            type="number"
                                            min={1}
                                            step="1"
                                            value={value.floor || 0}
                                            readOnly={isReadOnly}
                                            onChange={e => handleFormData('floor', e)}
                                            placeholder="층수를 입력해주세요."
                                            className={`${
                                                isReadOnly ? 'bg-gray-100 ' : ''
                                            }block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring`}
                                        />
                                        층
                                    </>
                                }
                            />
                        </div>

                        <SelectBox
                            label="카테고리"
                            id="category"
                            value={value.cidx}
                            isReadOnly={isReadOnly}
                            arr={categoryData.map(item => (
                                <option key={item.idx} value={item.idx}>
                                    {item.name}
                                </option>
                            ))}
                            onChange={e => handleFormData('cidx', e)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputBox
                                label="메뉴명"
                                id="menuName"
                                value={value.menu}
                                onChange={e => handleFormData('menu', e)}
                            />
                            <div>
                                <SelectBox
                                    label="별점"
                                    id="star"
                                    value={value.star || 1}
                                    arr={[1, 2, 3, 4, 5].map(item => (
                                        <option key={item} value={item}>
                                            {'⭐'.repeat(item)}
                                        </option>
                                    ))}
                                    onChange={e => handleFormData('star', e)}
                                />
                            </div>
                        </div>

                        <InputBox
                            label="한줄평"
                            id="review"
                            value={value.comment}
                            onChange={e => handleFormData('comment', e)}
                        />

                        <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4">
                            <InputBox
                                label="장점"
                                id="reviewGood"
                                value={value.comment_good}
                                onChange={e => handleFormData('comment_good', e)}
                            />
                            <InputBox
                                label="단점"
                                id="reviewBad"
                                value={value.comment_bad}
                                onChange={e => handleFormData('comment_bad', e)}
                            />
                        </div>

                        <div>
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="reviewImage">
                                    이미지 첨부 <small className="text-gray-400">(최대 3장 첨부 가능합니다.)</small>
                                </label>

                                <input
                                    id="reviewImage"
                                    type="file"
                                    accept="image/*"
                                    ref={fileInput}
                                    onChange={e => setFiles(e.target.files)}
                                    multiple
                                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-500 file:text-white file:transition-colors hover:file:cursor-pointer hover:file:bg-orange-400 active:file:bg-orange-500 "
                                />
                                <div className="flex gap-4 mt-6 h-[130px] p-4 border border-dashed rounded-lg">
                                    {Base64s.length > 0 ? (
                                        Base64s.map((item, id) => (
                                            <div
                                                className="relative w-24 h-24 border"
                                                key={id}
                                                style={{background: `url(${item.url}) no-repeat center/cover`}}
                                            >
                                                <button
                                                    type="button"
                                                    className="block absolute flex justify-center items-center right-0 top-0 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-gray-400 transition-colors font-bold text-center rounded-full z-10 hover:bg-gray-500"
                                                    onClick={() => deleteImage(id)}
                                                >
                                                    <span className="absolute rotate-45 block w-2 h-[2px] bg-white"></span>
                                                    <span className="absolute -rotate-45 block w-2 h-[2px] bg-white"></span>
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <label
                                            htmlFor="reviewImage"
                                            className="flex justify-center items-center w-full h-full text-gray-500 font-light text-center cursor-pointer"
                                        >
                                            <div className="">
                                                <span className="inline-block w-5 h-5 bg-gray-100 rounded-full mr-1 leading-4 border border-dashed border-gray-300">
                                                    +
                                                </span>
                                                이미지를 첨부해주세요.
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="inline-block text-gray-700 mb-3" htmlFor="addrDetail">
                                태그
                            </span>
                            <div
                                ref={tagBox}
                                className="relative flex flex-wrap justify-center gap-2 gap-y-6 px-4 py-6 h-[100px] overflow-hidden bg-orange-100 rounded-lg transition-height"
                            >
                                {tagData.map(item => (
                                    <span key={item.idx}>
                                        <label
                                            onClick={handleTag}
                                            htmlFor={`tag_${item.idx}`}
                                            className="tagLabel w-full h-full rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium transition-colors cursor-pointer hover:bg-orange-500 hover:border-transparent hover:text-white"
                                        >
                                            {`# ${item.name}`}
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="tags"
                                            value={item.idx}
                                            id={`tag_${item.idx}`}
                                            className="hidden"
                                        />
                                    </span>
                                ))}
                                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full h-12 bg-gradient-to-t from-orange-400 to-trasparent">
                                    <button
                                        type="button"
                                        onClick={handleTagMore}
                                        className="w-5 h-5 bg-white rounded-full text-center leading-5 bg-opacity-75 text-orange-500 font-bold hover:bg-opacity-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 md:px-8 py-2 md:py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 md:px-8 py-2 md:py-2.5 leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Write;
