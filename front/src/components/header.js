import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from '../../node_modules/react-router-dom/dist/index';
import profile from '../assets/sample_profile.png';

const Header = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const getToken = sessionStorage.getItem('token');

    const [isLogin, setisLogin] = useState(true);
    const [isMenuOn, setIsMenuOn] = useState(true);

    // logout
    const goLogOut = () => {
        const isHome = pathname === '/';
        const msg = !isHome ? '\n메인페이지로 이동하시겠습니까?' : '';

        sessionStorage.removeItem('token');
        if (window.confirm('로그아웃 되었습니다.' + msg)) {
            navigate('/');
        }
    };

    // 프로필 메뉴 제외 클릭시 메뉴 숨김
    const handleBodyClick = e => {
        if (!e.target.classList.contains('profileBtn')) {
            setIsMenuOn(true);
        }
    };

    useEffect(() => {
        getToken !== null ? setisLogin(true) : setisLogin(false);
        document.addEventListener('click', e => handleBodyClick(e));

        return () => {
            document.removeEventListener('click', e => handleBodyClick(e));
        };
    }, [getToken]);

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

                        <button
                            onClick={() => setIsMenuOn(!isMenuOn)}
                            type="button"
                            className={(isLogin ? '' : 'hidden ') + 'profileBtn flex items-center focus:outline-none'}
                        >
                            <div className="profileBtn w-11 h-11 overflow-hidden border-2 p-1 border-orange-400 rounded-full">
                                <img src={profile} className="profileBtn object-cover w-full h-full" alt="avatar" />
                            </div>
                        </button>
                    </div>
                    <div
                        className={
                            (!isMenuOn ? '' : 'hidden ') + 'absolute bottom-0 right-0 translate-y-full pt-2 z-30'
                        }
                    >
                        <div className="px-2 pt-4 pb-3 bg-white shadow-lg border rounded-md font-semibold text-gray-500 text-base">
                            <Link to="/mypage" className="block pb-2 px-4 border-b hover:text-orange-500">
                                마이페이지
                            </Link>
                            <button onClick={goLogOut} className="block w-full pt-3 px-4 hover:text-orange-500">
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
