import React from 'react';
import Button from 'components/button';
import InputBox from 'components/inputBox';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';

const UserInfo = ({
    userImg,
    imageInput,
    onImgChange,
    handleProfileImg,
    userId,
    isChangeNickName,
    nickName,
    setChangedNickName,
    nameInput,
    handleCheckedName,
    handleFocusingName,
}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 mt-24 md:mt-28 bg-white rounded-lg p-8 pt-0 shadow-md">
            <div
                onClick={handleProfileImg}
                className="relative -mt-16 w-32 h-32 md:-mt-[90px] md:w-[180px] md:h-[180px] cursor-pointer"
            >
                <img
                    className="w-full h-full rounded-full overflow-hidden object-cover"
                    src={userImg}
                    alt="profile_image"
                />
                <span className="absolute right-0 top-0 translate-x-2 translate-y-2 md:translate-x-0 md:translate-y-5 w-8 h-8 bg-orange-400 rounded-full text-white text-xs flex justify-center items-center">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </span>
            </div>
            <form encType="multipart.form-data">
                <input
                    id="file"
                    type="file"
                    style={{display: 'none'}}
                    ref={imageInput}
                    accept="image/*"
                    name="file"
                    onChange={e => onImgChange(e)}
                    multiple="multiple"
                />
            </form>

            <div className="flex flex-col gap-4 justify-center items-center">
                <p>{userId}</p>
                <div className="flex items-center gap-4">
                    <div className="w-full min-w-fit min-w-[180px]">
                        <InputBox
                            id="nickName"
                            type="text"
                            value={nickName || ''}
                            ariaLabel="name"
                            placeholder={isChangeNickName ? nickName : ''}
                            onChange={setChangedNickName}
                            nameInput={nameInput}
                            readOnly={isChangeNickName ? false : true}
                        />
                    </div>
                    <div className="h-10 w-full min-w-[100px] md:w-5">
                        <Button
                            contents="닉네임 변경"
                            onClick={isChangeNickName ? handleCheckedName : handleFocusingName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
