import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from '../../node_modules/react-router-dom/dist/index';
import iconHandshake from '../assets/waving-hand.png';

import {profileImgValue, nameValue} from 'atoms/state';
import {useRecoilState} from '../../node_modules/recoil/';

const Header = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const getToken = sessionStorage.getItem('token');
    const getName = sessionStorage.getItem('name');
    const getProfileImg = sessionStorage.getItem('profileImg');

    // 로그인 정보
    const [isLogin, setisLogin] = useState(true);

    // 프로필 메뉴
    const [isMenuOn, setIsMenuOn] = useState(true);

    // 프로필 이미지
    const [profile, setProfile] = useRecoilState(profileImgValue);
    const [nickName, setNickname] = useRecoilState(nameValue);

    // logout
    const goLogOut = () => {
        const isHome = pathname === '/';
        const msg = !isHome ? '\n메인페이지로 이동하시겠습니까?' : '';

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('profileImg');
        sessionStorage.removeItem('name');
        if (window.confirm('로그아웃 되었습니다.' + msg)) {
            navigate('/');
        }
    };

    // 프로필 메뉴 영역 외 클릭 시 메뉴 숨김
    const handleBodyClick = e => {
        if (!e.target.classList.contains('profileBtn')) {
            setIsMenuOn(true);
        }
    };

    useEffect(() => {
        getToken !== null ? setisLogin(true) : setisLogin(false);
        setProfile(profile);
        setNickname(nickName);

        document.addEventListener('click', e => handleBodyClick(e));
        return () => {
            document.removeEventListener('click', e => handleBodyClick(e));
        };
    }, [getToken, profile, nickName]);

    return (
        <header className="h-20 fixed w-full bg-white border-b z-50">
            <div className="container-wb max-w-6xl px-6 py-4 mx-auto my-0 h-full">
                <div className="relative h-full flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold text-orange-600">
                            <Link
                                to="/"
                                className="text-2xl font-bold text-orange-600 transition-colors duration-300 transform lg:text-3xl hover:text-orange-700"
                            >
                                Weplace
                            </Link>
                        </div>
                    </div>
                    <div className={`hidden ${isLogin && 'sm:flex'} gap-1 justify-center items-center text-gray-700`}>
                        <strong className="bg-orange-100 px-1 text-orange-500">{nickName}</strong>님, 안녕하세요!
                        <img src={iconHandshake} className="inline-block w-6" />
                    </div>
                    <div className="flex items-end gap-3">
                        <button
                            onClick={() => navigate('/login', {state: {pathname: pathname}})}
                            className={
                                (isLogin ? 'hidden ' : '') +
                                'flex items-center px-3 py-1 sm:px-4 sm:py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-full hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80'
                            }
                        >
                            <img
                                className="w-5"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB0UlEQVRIie3Wz25NYRQF8H3MBBOhoU3boAkjr+ABxESK0CdANRLepSWRiEQIrYToCzCQ0BEJRgz8G6qOSt3+DO5uetHb+91zSyddw3PWXmvvfb5vnx2xhf+EqpSIwYg4FxHHIuJoROyOiOWI+BAR7yNiNiIeVlX1cUMywxBuoaEzlnAd/b2ansF8ii7iNk5hGNuxA4dxFnfxPbkLOFHXdALLKXQfQwUxBzGdMQ2Md2s6mqYNXKqR9BX8zPiyyjGQrYKJbk3/MIdv2F8ScCMDpuuatmjNpNa1EvIkPuf1acd5gjn0ddA6lAduCQM1cv9L8HlW8qrA/F5yL2yEcV+adjTHWPIe92ycgnvxMkXftDtAec/h7XpiT9XHXBvNXfl+ofX5tp7K3gys0ep9bXhHkvN6I0w353DhRYlpcleu0/lOopP4Yv0B8kzZABlROkCsjsyZdYkFwIPUmioh92sOdrjcg+nV1Jhvd/DWCjqp+VtcrmOepiu/xePdBo9bXQSmMVwQM9LS3gYudpv0itAovqbQIu7gNA5orj47856OaW4pP1ra212la5gP4ma2rhOWMFXyTbtZbwfi9/V2T0Q0ornevovmevuoqqpPtSrcwr/CL+M4DzTsEXbEAAAAAElFTkSuQmCC"
                                alt="login"
                            />
                            <span className="mx-1">Login</span>
                        </button>

                        <div className="flex gap-2 justify-center items-center">
                            <button
                                onClick={() => setIsMenuOn(!isMenuOn)}
                                type="button"
                                className={
                                    (isLogin ? '' : 'hidden ') + 'profileBtn flex items-center focus:outline-none'
                                }
                            >
                                <div className="profileBtn w-11 h-11 overflow-hidden border-orange-400 rounded-full">
                                    <img
                                        src={profile}
                                        className="profileBtn w-full h-full object-cover"
                                        alt="profileImg"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div
                        className={
                            (!isMenuOn ? '' : 'hidden ') + 'absolute bottom-0 right-0 translate-y-full pt-2 z-30'
                        }
                    >
                        <div className="px-3 py-1 bg-white shadow-lg border rounded-md font-medium text-gray-500 text-base">
                            <Link to="/mypage" className="block p-2 border-b hover:text-orange-500">
                                마이페이지
                            </Link>
                            <button onClick={goLogOut} className="block p-2 w-full hover:text-orange-500">
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
