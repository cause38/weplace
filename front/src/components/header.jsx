import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from '../../node_modules/react-router-dom/dist/index';
import {tokenValue, profileImgValue, nameValue} from 'atoms/state';
import {useRecoilState} from '../../node_modules/recoil/';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {EmojiProvider, Emoji} from 'react-apple-emojis';
import emojiData from '../lib/data.json';

const Header = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  // 로그인 정보
  const [isLogin, setisLogin] = useState(true);

  // 프로필 메뉴
  const [isMenuOn, setIsMenuOn] = useState(true);

  // 프로필 이미지
  const [token, setToken] = useRecoilState(tokenValue);
  const [profile, setProfile] = useRecoilState(profileImgValue);
  const [nickName, setNickname] = useRecoilState(nameValue);

  useEffect(() => {
    const wrap = document.getElementById('wrapContents');
    pathname !== '/write' ? wrap.classList.add('xl:-mt-[50px]') : wrap.classList.remove('xl:-mt-[50px]');
  }, [pathname]);

  // logout
  const goLogOut = () => {
    const isHome = pathname === '/';
    const msg = !isHome ? '\n메인페이지로 이동하시겠습니까?' : '';

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('profileImg');
    sessionStorage.removeItem('name');
    setToken(null);
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
    token !== null ? setisLogin(true) : setisLogin(false);
    setProfile(profile);
    setNickname(nickName);

    document.addEventListener('click', e => handleBodyClick(e));
    return () => {
      document.removeEventListener('click', e => handleBodyClick(e));
    };
  }, [token, profile, nickName]);

  return (
    <header className="h-20 fixed w-full bg-white border-b z-50">
      <div className="container-wb my-0 py-0 h-full flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-orange-600">
            <Link
              to="/"
              className="text-2xl font-bold text-orange-600 transition-colors duration-300 transform lg:text-3xl"
            >
              Weplace
            </Link>
          </div>
        </div>
        <div className={`hidden ${isLogin && 'sm:flex'} gap-1 justify-center items-center text-gray-700`}>
          <strong className="bg-orange-100 px-1 text-orange-500">{nickName}</strong>님, 안녕하세요!
          {/* TODO: 애플 이모지 라이브러리 오류로 인해 임시 주석처리
          <EmojiProvider data={emojiData}>
              <Emoji name={'waving-hand'} className="mx-auto w-[22px]" />
          </EmojiProvider> */}
        </div>
        <div className="flex items-end gap-3">
          <button
            onClick={() => navigate('/login', {state: {pathname: pathname}})}
            className={`${
              isLogin ? 'hidden' : ''
            } flex justify-center items-center gap-2 px-4 py-2 min-w-[105px] font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-full hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80`}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
          </button>

          <div className={`${isLogin ? '' : 'hidden'} relative flex gap-2 justify-center items-center`}>
            <button
              onClick={() => setIsMenuOn(!isMenuOn)}
              type="button"
              className="profileBtn flex items-center focus:outline-none"
            >
              <div className="profileBtn w-11 h-11 overflow-hidden border-orange-400 rounded-full">
                <img src={profile} className="profileBtn w-full h-full object-cover" alt="profileImg" />
              </div>
            </button>
            <div className={(!isMenuOn ? '' : 'hidden ') + 'absolute w-32 bottom-0 right-0 translate-y-full pt-2 z-30'}>
              <div className="px-3 py-1 bg-white shadow-lg border rounded-md font-medium text-gray-500 text-base text-center">
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
      </div>
    </header>
  );
};

export default Header;
