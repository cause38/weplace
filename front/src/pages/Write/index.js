import {React, useState, useEffect, useRef} from 'react';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import InputBox from './components/InputBox';
import SelectBox from './components/SelectBox';
import Modal from 'components/Modal';
import axios from 'axios';

const Write = () => {
    const navigate = useNavigate();
    const getToken = sessionStorage.getItem('token');
    const storeScoreArr = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'];
    const locationArr = ['성동구'];

    const [modalVisible, setModalVisible] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [tagData, setTagData] = useState([]);
    const [searhStoreLocation, setSearhStoreLocation] = useState('성동구');
    const [searhStoreName, setSearhStoreName] = useState();
    const searchBtn = useRef(null);

    useEffect(() => {
        if (getToken === null) {
            navigate('/login');
        } else {
            // get 카테고리, 태그 목록
            axios.get('http://place-api.weballin.com/review/write').then(response => {
                if (response.status === 200) {
                    setCategoryData(response.data.data.category);
                    setTagData(response.data.data.tag);
                }
            });
        }
    }, []);

    // modal 오픈 시 바디 스크롤 제어
    if (modalVisible) {
        document.body.classList.add('overflow-y-hidden');
    } else {
        document.body.classList.remove('overflow-y-hidden');
    }

    // tag toggle css 제어
    const handleTag = e => {
        e.target.classList.toggle('on');

        if (e.target.classList.contains('on')) {
            e.target.classList.remove('bg-white', 'text-orange-600', 'border-orange-300');
            e.target.classList.add('bg-orange-500', 'border-transparent', 'text-white');
        } else {
            e.target.classList.remove('bg-orange-500', 'border-transparent', 'text-white');
            e.target.classList.add('bg-white', 'text-orange-600', 'border-orange-300');
        }
    };

    // 매장 검색
    const handleStoreSearch = e => {
        e.preventDefault();

        const data = `${searhStoreLocation} ${searhStoreName}`;

        // 검색 버튼 진행현황 반영
        searchBtn.current.innerText = '검색중...';
        searchBtn.current.setAttribute('disabled', true);

        axios
            .get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${data}`, {
                headers: {Authorization: 'KakaoAK 940b8053d629afc997a3a283dd999724'},
            })
            .then(res => {
                searchBtn.current.innerText = '검색';
                searchBtn.current.removeAttribute('disabled');

                if (res.status === 200) {
                    console.log(res);
                    if (res.data.documents.length > 0) {
                        console.log(res.data.documents);
                    } else {
                        alert('검색된 데이터가 없습니다');
                    }
                } else {
                    alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                    setModalVisible(false);
                }
            });
    };

    const handleSubmit = e => {};

    const [showImages, setShowImages] = useState([]);
    const handleAddImage = e => {
        const imageLists = e.target.files;
        let imageUrlLists = [...showImages];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }

        if (imageUrlLists.length > 3) {
            imageUrlLists = imageUrlLists.slice(0, 3);
        }

        setShowImages(imageUrlLists);
    };

    const handleDeleteImage = id => {
        setShowImages(showImages.filter((_, index) => index !== id));
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
                                <div className="w-2/4">
                                    <div className="relative w-full">
                                        <select
                                            id="storeSearch"
                                            disabled
                                            onChange={e => setSearhStoreLocation(e.target.value)}
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
                                    onChange={e => setSearhStoreName(e.target.value)}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                />
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
                        저장
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
                                    readOnly
                                    onClick={() => setModalVisible(true)}
                                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(true)}
                                    className="min-w-[175px] w-full sm:w-1/5 h-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                                >
                                    매장 검색
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4">
                            <InputBox label="주소" id="address" onClick={() => setModalVisible(true)} />
                            <SelectBox
                                label="상세 주소"
                                id="addressDetail"
                                arr={['지상', '지하']}
                                contents={
                                    <>
                                        <input
                                            type="number"
                                            min={1}
                                            step="1"
                                            placeholder="층수를 입력해주세요."
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                        />
                                    </>
                                }
                            />
                        </div>

                        <SelectBox label="카테고리" id="category" arr={categoryData} />

                        <div className="grid grid-cols-2 gap-4">
                            <InputBox label="메뉴명" id="menuName" />
                            <SelectBox label="별점" id="storeScore" arr={storeScoreArr} />
                        </div>

                        <InputBox label="한줄평" id="review" />

                        <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4">
                            <InputBox label="장점" id="reviewGood" />
                            <InputBox label="단점" id="reviewBad" />
                        </div>

                        <div>
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="image">
                                    이미지 첨부
                                </label>

                                <input
                                    type="file"
                                    onChange={handleAddImage}
                                    multiple
                                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-500 file:text-white file:transition-colors hover:file:cursor-pointer hover:file:bg-orange-400 active:file:bg-orange-500 "
                                />
                                <div className="flex gap-4 mt-6">
                                    {showImages.map((image, id) => (
                                        <div
                                            className="relative w-24 h-24 border"
                                            key={id}
                                            style={{background: `url(${image}) no-repeat center/cover`}}
                                        >
                                            <button
                                                className="block absolute flex justify-center items-center right-0 top-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-gray-400 font-bold text-center rounded-full z-10 hover:bg-gray-400"
                                                onClick={() => handleDeleteImage(id)}
                                            >
                                                <span className="block w-2/5 h-[1.5px] rounded-full bg-white"></span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="inline-block text-gray-700 mb-3" htmlFor="addrDetail">
                                태그
                            </span>
                            <div className="flex flex-wrap justify-center gap-2 gap-y-6 bg-orange-100 rounded-lg px-4 py-6">
                                {tagData.map(item => (
                                    <span key={item.idx}>
                                        <label
                                            onClick={handleTag}
                                            htmlFor={`tag_${item.idx}`}
                                            className="w-full h-full rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium transition-colors cursor-pointer hover:bg-orange-500 hover:border-transparent hover:text-white"
                                        >
                                            {`# ${item.name}`}
                                        </label>
                                        <input type="checkbox" name="tags" id={`tag_${item.idx}`} className="hidden" />
                                    </span>
                                ))}
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
