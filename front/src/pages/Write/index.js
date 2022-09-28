import {React, useState, useEffect} from 'react';
import {useNavigate} from '../../../node_modules/react-router-dom/dist/index';
import InputBox from './components/InputBox';
import SelectBox from './components/SelectBox';
import Modal from 'components/Modal';

const Write = () => {
    const navigate = useNavigate();
    const storeScoreArr = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'];
    const categoryArr = ['한식', '일식', '중식', '분식'];

    const getToken = sessionStorage.getItem('token');

    useEffect(() => {
        if (getToken === null) {
            navigate('/login');
        }
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    if (modalVisible) {
        document.body.classList.add('overflow-y-hidden');
    } else {
        document.body.classList.remove('overflow-y-hidden');
    }

    const handleTag = e => {};
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
                                placeholder="등록하실 매장 명을 입력해주세요"
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

            <h2 className="text-3xl font-bold mb-10 text-orange-600">Review</h2>
            <form className="bg-white p-8 rounded-lg shadow-lg">
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
                        <InputBox label="상세 주소" id="addressDetail" />
                    </div>

                    <SelectBox label="카테고리" id="category" arr={categoryArr} />

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
                        <div className="flex flex-wrap gap-4">
                            <InputBox label="맛있는" id="tag_1" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_2" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_3" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_4" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_5" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_6" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_7" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_8" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_9" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_10" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_11" checkBox="true" onClick={handleTag} />
                            <InputBox label="맛있는" id="tag_12" checkBox="true" onClick={handleTag} />
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex justify-center md:justify-end gap-4 mt-10">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-600"
                >
                    취소
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
                >
                    저장
                </button>
            </div>
        </div>
    );
};

export default Write;
