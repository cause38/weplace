import {atom} from '../../node_modules/recoil/';

export const tokenValue = atom({
    key: 'token',
    default: sessionStorage.getItem('token'),
});

export const profileImgValue = atom({
    key: 'profileImg',
    default: sessionStorage.getItem('profileImg'),
});

export const nameValue = atom({
    key: 'name',
    default: sessionStorage.getItem('name'),
});
