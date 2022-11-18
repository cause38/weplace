import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Review from './components/review';
import Modal from 'components/Modal';
import Share from './components/Share';
import defaultSNSThumb from 'assets/weplace_sns.jpg';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faStar,
    faLocationDot,
    faArrowUpRightFromSquare,
    faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import {isMacOs, isMobile} from 'react-device-detect';

const Detail = () => {
    const idx = parseInt(useParams().id);
    const token = sessionStorage.getItem('token');
    const qs = require('qs');

    // store data
    const [review, setReview] = useState([]);
    const [store, setStore] = useState({
        address: '',
        base: '',
        category: '',
        distance: '',
        favorite: '',
        floor: '',
        idx: '',
        name: '',
        review: [],
        star: '',
        tag: [],
        url: '',
    });

    // 이미지 모달
    const [modalVisible, setModalVisible] = useState(false);

    // 이미지 모달 src
    const [modalImg, setModalImg] = useState('');

    // 리뷰 more
    const [moreToggle, setMoreToggle] = useState(false);

    // 찜 관리
    const [isFavorite, setIsFavorite] = useState(false);

    // img 모달 / alert 창 구분
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('삭제 시 복구가 불가능합니다<br>정말 삭제하시겠습니까?');
    const [alertType, setAlertType] = useState('delete');

    // toast
    const [toastVisible, setToastVisible] = useState(false);

    // 리뷰 삭제
    const [delIdx, setDelIdx] = useState(null);
    // 공유하기 모달
    const [isShare, setIsShare] = useState(false);

    // 백그라운드 블락처리
    // const [toggleShareLink, setToggleShareLink] = useState(false);

    // 리뷰 데이터
    const getReviewData = isDel => {
        axios.get(`http://place-api.weballin.com/review/view`, {params: {idx, token}}).then(res => {
            if (res.status === 200) {
                setIsFavorite(res.data.data.isFavorite);
                setStore(res.data.data.shopInfo);
                setReview(res.data.data.review);
            }
        });

        if (isDel) {
            setTimeout(() => {
                setToastVisible(true);
            }, 300);
        }
    };

    useEffect(() => {
        getReviewData(false);
    }, []);

    // 리뷰 more 버튼 관리
    const handleReviewToggle = e => {
        const more = e.currentTarget.previousElementSibling.querySelector('.moreData');
        setMoreToggle(!moreToggle);
        more.classList.toggle('hidden');
    };

    // 이미지 확대
    const handleImg = () => {
        setIsAlert(false);
        setModalVisible(true);
    };

    // 찜 목록
    const handleFavorite = e => {
        const url = 'http://place-api.weballin.com/favorite';
        const data = {token, idx};

        if (!isFavorite) {
            // 추가
            axios.post(url, data).then(async res => await setFavorite(res));
        } else {
            // 삭제
            const options = {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(data),
            };
            axios.delete(url, options).then(async res => await setFavorite(res));
        }
    };

    // 찜 목록 추가 / 삭제 공통 함수
    const setFavorite = res => {
        if (res.status === 200) {
            getReviewData(false);
        } else if (res.data.state === 400 || res.data.state === 401) {
            alert(res.data.msg);
        } else {
            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
        }
    };

    const handleDelete = ridx => {
        setModalVisible(false);

        const url = 'http://place-api.weballin.com/mypage/deleteReview';
        const data = {token: token, idx: parseInt(ridx)};
        const options = {
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
        };

        axios
            .delete(url, options)
            .then(response => {
                if (response.data.state === 200) {
                    getReviewData(true);
                } else {
                    alert(response.data.msg);
                }
            })
            .catch(function (error) {
                console.error(error);
                alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
            });
    };

    //공유하기 드롭다운
    const handleShareList = e => {
        e.preventDefault();
        setIsShare(!isShare);
    };

    // 공유하기
    const handleShare = async (e, item) => {
        e.preventDefault();
        // setToggleShareLink(true);
        const thumbImage = getReviewImage();
        const {Kakao, location} = window;
        const copyUrl = location.href;

        // url 미리 복사
        const MobileCopyUrl = () => {
            const textArea = document.createElement('textarea');
            document.body.appendChild(textArea);
            textArea.value = copyUrl;
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        };

        // 사파리에서 clipboard가 적용되지 않아 분기처리
        // if(isMacOs){
        // if(navigator.userAgent.match(/ipad|iphone/i)){

        if (item === 'kakao') {
            if (navigator.userAgent.match(/ipad|iphone/i)) {
                MobileCopyUrl();
                let _a = document.createElement('a');
                _a.target = '_blank';
                _a.href = `kakaotalk://launch`;
                document.body.appendChild(_a);
                _a.click();
            } else {
                Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: `${store.name}`,
                        description: `${store.tag}`,
                        imageUrl: `${thumbImage}`,
                        link: {mobileWebUrl: copyUrl, webUrl: copyUrl},
                    },
                    buttons: [{title: '웹으로 보기', link: {mobileWebUrl: copyUrl, webUrl: copyUrl}}],
                });
            }
        } else if (item === 'url') {
            if (navigator.userAgent.match(/ipad|iphone/i)) {
                MobileCopyUrl();
                alert('URL 복사가 되었습니다.');
                setIsShare(false);
            } else {
                navigator.clipboard.writeText(copyUrl).then(() => {
                    alert('URL 복사가 되었습니다.');
                    setIsShare(false);
                });
            }
        } else if (item === 'slack') {
            if (navigator.userAgent.match(/ipad|iphone/i)) {
                MobileCopyUrl();
                let _a = document.createElement('a');
                _a.target = '_blank';
                _a.href = `slack://open`;
                document.body.appendChild(_a);
                _a.click();
            } else {
                navigator.clipboard.writeText(copyUrl).then(() => {
                    location.href = `slack://open`;
                });
            }
        }
    };

    useEffect(() => {
        initKakao();
    }, []);

    //자바스크립키로 카카오 init
    const initKakao = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init(process.env.REACT_APP_KAKAO_KEY);
            }
        }
    };

    //리뷰이미지 축출
    const getReviewImage = () => {
        let imageUrl = 'defaultSNSThumb';
        review?.map(data => {
            const {image} = data;
            if (data.image.length > 1) {
                return (imageUrl = image[0]);
            } else {
                return;
            }
        });
        return imageUrl;
    };

    return (
        <div className="container-wb max-w-full p-0">
            <div className="bg-orange-200 bg-opacity-50">
                <div className="container-wb py-10 lg:py-16 mt-0">
                    <div className="flex justify-between items-center relative">
                        <span className="rounded-full px-4 py-1 bg-orange-500 text-white font-medium">
                            {store.category}
                        </span>
                        <div>
                            <button
                                onClick={handleFavorite}
                                className={`${token === null ? 'hidden' : ''} w-8 h-8 translate-x-[6px]`}
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`${isFavorite ? 'text-red-400' : 'text-stone-500'} text-xl`}
                                />
                            </button>
                            <button className="ml-5 relative" onClick={e => handleShareList(e)}>
                                <FontAwesomeIcon
                                    icon={faShareNodes}
                                    className={`${isShare ? 'text-red-400' : ' text-stone-500'} text-xl`}
                                />
                            </button>
                            {isShare && (
                                <div className="absolute bottom-0 right-0 translate-y-full pt-2 z-30">
                                    <Share handleShare={handleShare} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-stone-800">
                        <h3 className="text-2xl font-bold mt-3 mb-1">{store.name}</h3>
                        <p>{`${store.address} ${store.base} ${store.floor}층`}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5">
                        {store.tag.length > 0 &&
                            store.tag.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 shadow-sm shadow-orange-300 font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                    </div>
                </div>
            </div>

            <div className="container-wb mt-0 pt-0">
                <div className="flex gap-3 sm:gap-5 my-5 sm:my-6">
                    <div className="flex sm:flex-col justify-between sm:justify-center items-center gap-2 sm:gap-1 w-full px-3 py-3 sm:p-5 bg-white rounded-lg shadow-md">
                        <span className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 text-yellow-400 rounded-full flex justify-center items-center text-center text-xs">
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <p
                            className="sm:text-lg sm:font-bold text-gray-700 text-center"
                            style={{width: 'calc(100% - 40px)'}}
                        >
                            {store.star}
                        </p>
                        <p className="hidden sm:block">별점</p>
                    </div>
                    <div className="flex sm:flex-col justify-between sm:justify-center items-center gap-2 sm:gap-1 w-full px-3 py-3 sm:p-5 bg-white rounded-lg shadow-md">
                        <span className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 text-red-400 rounded-full flex justify-center items-center text-center text-xs">
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <p
                            className="sm:text-lg sm:font-bold text-gray-700 text-center"
                            style={{width: 'calc(100% - 40px)'}}
                        >
                            {store.favorite}
                        </p>
                        <p className="hidden sm:block">찜</p>
                    </div>
                    <div className="flex sm:flex-col justify-between sm:justify-center items-center gap-2 sm:gap-1 w-full px-3 py-3 sm:p-5 bg-white rounded-lg shadow-md">
                        <a
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 text-teal-400 rounded-full flex justify-center items-center text-cente text-xsr"
                        >
                            <FontAwesomeIcon icon={faLocationDot} />
                            <FontAwesomeIcon
                                className="absolute text-sm -right-[1px] -top-[1px]"
                                icon={faArrowUpRightFromSquare}
                            />
                        </a>
                        <p
                            className="sm:text-lg sm:font-bold text-gray-700 text-center"
                            style={{width: 'calc(100% - 40px)'}}
                        >
                            {store.distance}분
                        </p>
                        <p className="hidden sm:block">예상 거리</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    {review.length > 0 &&
                        review.map((item, index) => (
                            <Review
                                key={index}
                                token={token}
                                sIdx={store.idx}
                                data={item}
                                more={moreToggle}
                                setIsAlert={setIsAlert}
                                setModalVisible={setModalVisible}
                                getReviewData={() => getReviewData()}
                                handleReviewToggle={e => handleReviewToggle(e)}
                                handleImg={() => handleImg()}
                                setModalImg={setModalImg}
                                setDelIdx={setDelIdx}
                            />
                        ))}
                </div>
            </div>

            {isShare && (
                <div className="w-[300px] h-[300px] absolute top-2/4 border-1 left-0">
                    <Share handleShare={handleShare} />
                </div>
            )}
            <Toast visible={toastVisible} setToastVisible={setToastVisible} msg={'삭제 완료되었습니다!'} />

            <Modal
                alert={isAlert}
                msg={alertMsg}
                type={alertType}
                visible={modalVisible}
                setModalVisible={setModalVisible}
                handleAlert={() => handleDelete(delIdx)}
                contents={
                    <>
                        <div className="min-h-[50vh] max-h-[70vh] overflow-auto scrollbar flex flex-col">
                            <div className="grow flex flex-col justify-center border rounded-lg p-2 box-border">
                                <img src={modalImg} alt="리뷰이미지" className="w-full h-auto mx-auto" />
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default Detail;
