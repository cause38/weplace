const BASE_URL = 'http://place-api.weballin.com';

const API = {
    //로그인
    login: `${BASE_URL}/auth/login`,
    //회원가입
    registerCode: `${BASE_URL}/auth/registerCode`,
    nickName: `${BASE_URL}/auth/nickname`,
    register: `${BASE_URL}/auth/register`,
    //카테고리
    categoryfilters: `${BASE_URL}/review/lists/filters`,
    categoryList: `${BASE_URL}/review/lists/`,
    favorite: `${BASE_URL}/favorite`,
    //마이페이지
    myInfo: `${BASE_URL}/mypage/myInfo`,
    changeName: `${BASE_URL}/mypage/changeName`,
    changeProfile: `${BASE_URL}/mypage/chagneProfileImg`,
    deleteReview: `${BASE_URL}/mypage/deleteReview`,
    deleteFavorite: `${BASE_URL}/mypage/deleteFavorite`,
};

export default API;
