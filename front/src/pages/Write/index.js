import {React, useState, useEffect} from 'react';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import InputBox from './components/InputBox';
import SelectBox from './components/SelectBox';
import Modal from 'components/Modal';
import axios from 'axios';

const Write = () => {
    const navigate = useNavigate();
    const getToken = sessionStorage.getItem('token');
    const storeScoreArr = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'];

    // 매장검색 modal
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [tagData, setTagData] = useState([]);

    useEffect(() => {
        if (getToken === null) {
            navigate('/login');
        } else {
            // get 최신리뷰 데이터
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
    const handleSubmit = e => {};

    return (
        <div className="container-wb">
            <Modal
                visible={modalVisible}
                setModalVisible={setModalVisible}
                title="매장 검색"
                contents={
                    <>
                        <form className="w-full flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="등록하실 매장 명을 입력해주세요."
                                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                            <button
                                type="submit"
                                className="min-w-[100px] w-full sm:w-1/5 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
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
