import React, {Fragment, useEffect, useState, useRef} from 'react';

import UserInfo from './components/UserInfo';
import Reviews from './components/Reviews';
import Favorites from './components/Favorites';

import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from '/node_modules/axios/index';

import {profileImgValue, nameValue} from 'atoms/state';
import {useRecoilState} from '/node_modules/recoil/';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faUser, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faFileLines} from '@fortawesome/free-regular-svg-icons';
import {EmojiProvider, Emoji} from 'react-apple-emojis';
import emojiData from 'lib/data.json';
import API from 'config';

const MyPage = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const qs = require('qs');

  //  토큰
  const [token, setToken] = useState(0);

  // 유저 이미지
  const [userImg, setUserImg] = useRecoilState(profileImgValue);

  // 유저 아이디
  const [userId, setUserId] = useState();

  // 유저 닉네임 상태관리
  const [nickName, setNickName] = useRecoilState(nameValue);

  // 유저 변경된 닉네임
  const [changedNickName, setChangedNickName] = useState();

  // 닉네임 변경 설정
  const [isChangeNickName, setIsChangeNickName] = useState(false);

  // 리뷰박스
  const [reviews, setReviews] = useState();

  // 찜목록
  const [favoriteList, setFavoriteList] = useState();

  // 이미지 인풋창
  const imageInput = useRef(null);

  // 닉네임 인풋창
  const nameInput = useRef(null);

  // 토큰이 없으면 메인페이지로 이동, 있으면 유저데이터 불러오기
  useEffect(() => {
    let getToken = sessionStorage.getItem('token');
    if (getToken === null) {
      setToken(0);
      alert('로그인 후 이용 바랍니다.');
      navigate('/login', {state: {pathname: pathname}});
    } else {
      setToken(getToken);
      axios
        .get(`${API.myInfo}`, {
          params: {
            token: getToken,
          },
        })
        .then(res => {
          if (res.data.state === 200) {
            console.log(res);
            setChangedNickName(res.data.data.basic.name);
            setUserId(res.data.data.basic.uid);
            setUserImg(res.data.data.basic.thumb);
            setReviews(res.data.data.reviews);
            setFavoriteList(res.data.data.favorites);
          } else if (res.data.state === 400) {
            alert(res.data.data.msg);
          }
        });
    }
  }, []);

  // 닉네임 인풋창 활성화
  const handleFocusingName = e => {
    setIsChangeNickName(true);
    setChangedNickName(e.target.value);
    nameInput.current?.focus();
  };

  // 닉네임 변경
  const handleCheckedName = () => {
    const name = changedNickName.toString();

    // 문자열 사이 다중공백 -> 한개 공백으로 변경
    let removeMultiSpace = name.replace(/\s+/g, ' ');

    // 문자열 앞 뒤 공백 -> 제거
    let removeSpace = removeMultiSpace.replace(/^\s+|\s+$/g, '');

    if (changedNickName.length <= 0) {
      alert('닉네임을 입력 해 주세요.');
      nameInput.current?.focus();
    } else {
      fetch(`${API.changeName}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token, name: removeSpace}),
      })
        .then(res => res.json())
        .then(response => {
          if (response.state === 200) {
            alert(response.msg);
            setChangedNickName(removeSpace);
            setIsChangeNickName(false);
            axios
              .get(`${API.myInfo}`, {
                params: {
                  token: token,
                },
              })
              .then(res => {
                if (res.data.state === 200) {
                  sessionStorage.setItem('name', res.data.data.basic.name);
                  setNickName(res.data.data.basic.name);
                } else if (res.data.state === 400) {
                  alert(res.data.data.msg);
                }
              });
          } else if (response.state === 400) {
            alert(response.msg);
            setIsChangeNickName(true);
            return nameInput.current?.focus();
          } else if (response.state === 401) {
            alert(response.msg);
            setIsChangeNickName(true);
            return nameInput.current?.focus();
          } else if (response.state === 402) {
            alert(response.msg);
            setIsChangeNickName(true);
            return nameInput.current?.focus();
          }
        });
    }
  };

  // 유저 이미지 수정 영역 클릭
  const handleProfileImg = () => {
    imageInput.current.click();
  };

  // 유저 이미지 수정 완료
  const onImgChange = e => {
    e.preventDefault();
    const file = e.target.files[0];

    const ImageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append('profileImg', file);
    formData.append('token', token);

    axios
      .post(`${API.changeProfile}`, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then(res => {
        if (res.data.state === 200) {
          alert(res.data.msg);
          axios
            .get(`${API.myInfo}`, {
              params: {
                token: token,
              },
            })
            .then(res => {
              if (res.data.state === 200) {
                setUserImg(res.data.data.basic.thumb);
                sessionStorage.setItem('profileImg', res.data.data.basic.thumb);
              } else if (res.data.state === 400) {
                alert(res.data.data.msg);
              }
            });
        } else if (res.data.state === 400) {
          alert(res.data.msg);
        } else if (res.data.state === 401) {
          alert(res.data.msg);
        }
      });
  };

  // 리뷰삭제
  const handleDeleteReview = (e, idx) => {
    e.preventDefault();

    const data = {token: token, idx: parseInt(idx)};
    const url = `${API.deleteReview}`;
    const options = {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data),
    };

    axios.delete(url, options).then(response => {
      if (response.data.state === 200) {
        alert(response.data.msg);
        axios
          .get(`${API.myInfo}`, {
            params: {
              token: token,
            },
          })
          .then(res => {
            if (res.data.state === 200) {
              setReviews(res.data.data.reviews);
            } else if (res.data.state === 400) {
              alert(res.data.data.msg);
            }
          });
      } else if (response.data.state === 400) {
        alert(response.data.msg);
      } else if (response.data.state === 401) {
        alert(response.data.msg);
      } else if (response.data.state === 402) {
        alert(response.data.msg);
      }
    });
  };

  // 찜목록 삭제
  const handleDeleteFavorite = (e, idx) => {
    e.preventDefault();

    const data = {token: token, idx: parseInt(idx)};
    const url = `${API.deleteFavorite}`;
    const options = {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data),
    };
    // axios(options);
    if (window.confirm('찜목록에서 삭제하시겠습니까?')) {
      axios.delete(url, options).then(response => {
        if (response.data.state === 200) {
          alert(response.data.msg);
          axios
            .get(`${API.myInfo}`, {
              params: {
                token: token,
              },
            })
            .then(res => {
              if (res.data.state === 200) {
                setFavoriteList(res.data.data.favorites);
              } else if (res.data.state === 400) {
                alert(res.data.data.msg);
              }
            });
        } else if (response.data.state === 400) {
          alert(response.data.msg);
        } else if (response.data.state === 401) {
          alert(response.data.msg);
        } else if (response.data.state === 402) {
          alert(response.data.msg);
        }
      });
    } else {
      return;
    }
  };

  // 가게 상세 페이지
  const goToDetail = () => {
    navigate('/detail');
  };

  return (
    <Fragment>
      {token !== 0 ? (
        <main className="container-wb">
          <h2 className="-indent-[999px] h-[0px]">마이페이지</h2>
          <section>
            <p className="flex gap-2 items-center text-lg font-semibold text-stone-700">
              <span className="w-8 h-8 bg-sky-200 text-sky-500 rounded-full flex justify-center items-center text-center text-xs">
                <FontAwesomeIcon icon={faUser} />
              </span>
              기본 정보
            </p>
            <UserInfo
              userImg={userImg}
              imageInput={imageInput}
              onImgChange={onImgChange}
              handleProfileImg={handleProfileImg}
              userId={userId}
              isChangeNickName={isChangeNickName}
              nickName={changedNickName}
              setChangedNickName={setChangedNickName}
              nameInput={nameInput}
              handleCheckedName={handleCheckedName}
              handleFocusingName={handleFocusingName}
            />
          </section>
          <section className="mt-12">
            <p className="flex gap-2 items-center text-lg font-semibold text-stone-700">
              <span className="w-8 h-8 bg-violet-200 text-violet-500 rounded-full flex justify-center items-center text-center text-xs">
                <FontAwesomeIcon icon={faFileLines} />
              </span>
              내 리뷰
            </p>
            {reviews?.length > 0 ? (
              <Reviews reviews={reviews} handleDeleteReview={handleDeleteReview} />
            ) : (
              <div className="flex flex-col gap-3 justify-center items-center mt-4 p-5 bg-stone-200 text-center rounded-lg">
                <div className="flex gap-1 justify-center">
                  작성한 리뷰가 없습니다😥
                  {/* TODO: 애플 이모지 라이브러리 오류로 인해 임시 주석처리
                    <EmojiProvider data={emojiData}>
                      <Emoji name={'crying-face'} className="w-6 h-6" />
                    </EmojiProvider> */}
                </div>

                <Link
                  to="/write"
                  className="bg-orange-400 text-white p-5 py-1.5 rounded-full text-sm transition-colors hover:bg-orange-500 focus:outline-none focus:bg-orange-600"
                >
                  리뷰 작성하기 <FontAwesomeIcon icon={faAngleRight} />
                </Link>
              </div>
            )}
          </section>
          <section className="mt-8">
            <p className="flex gap-2 items-center text-lg font-semibold text-stone-700">
              <span className="w-8 h-8 bg-red-200 text-red-500 rounded-full flex justify-center items-center text-center text-xs">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              찜 목록
            </p>
            {favoriteList?.length > 0 ? (
              <Favorites
                favoriteList={favoriteList}
                handleDeleteFavorite={handleDeleteFavorite}
                goToDetail={goToDetail}
              />
            ) : (
              <div className="flex flex-col gap-3 justify-center items-center mt-4 p-5 bg-stone-200 text-center rounded-lg">
                <div className="flex gap-1 justify-center">
                  찜한 가게가 없습니다😥
                  {/* TODO: 애플 이모지 라이브러리 오류로 인해 임시 주석처리
                  <EmojiProvider data={emojiData}>
                    <Emoji name={'crying-face'} className="w-6 h-6" />
                  </EmojiProvider> */}
                </div>

                <Link
                  to={'/category/0'}
                  className="bg-orange-400 text-white p-5 py-1.5 rounded-full text-sm transition-colors hover:bg-orange-500 focus:outline-none focus:bg-orange-600"
                >
                  카테고리 이동 <FontAwesomeIcon icon={faAngleRight} />
                </Link>
              </div>
            )}
          </section>
        </main>
      ) : null}
    </Fragment>
  );
};

export default MyPage;
