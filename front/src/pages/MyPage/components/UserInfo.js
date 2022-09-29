import React from 'react';
import Button from 'components/button';
import InputBox from 'components/inputBox';

const UserInfo = ({
    userImg,
    imageInput,
    onImgChange,
    handleProfileImg,
    userId,
    isChangeNickName,
    nickName,
    setNickName,
    nameInput,
    handleCheckedName,
    handleNickName,
}) => {
    return (
        <div className="flex mt-[20px] max-w-[890px] bg-white rounded-[20px] p-[20px] shadow-md">
            <div className="min-w-[120px] w-[15%]">
                <img
                    className="min-w-[100%] max-h-[130px] min-h-[130px] rounded-[50%] overflow-hidden "
                    src={userImg}
                />
                <form className="h-[30px] mt-[10px]" encType="multipart.form-data">
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
                    <Button contents="프로필 사진 변경" onClick={handleProfileImg} />
                </form>
            </div>
            <div className="userInfo flex ml-[10%] mb-[50px] items-end w-[85%] justify-between">
                <div className="flex flex-col justify-center w-[80%]">
                    <div className="flex items-center">
                        <div className="min-w-[70px] w-[20%]">아이디</div>
                        <div className="w-full">
                            <p className="ml-[5px]">{userId}</p>
                        </div>
                    </div>
                    <div className="flex mt-[20px] items-center">
                        <div className="min-w-[70px] w-[20%]">
                            <p>닉네임</p>
                        </div>
                        {isChangeNickName ? (
                            <div className="w-full">
                                <InputBox
                                    id="nickName"
                                    type="text"
                                    value={nickName || ''}
                                    ariaLabel="name"
                                    placeholder={nickName}
                                    onChange={setNickName}
                                    ref={nameInput}
                                />
                            </div>
                        ) : (
                            <div className="w-full">
                                <InputBox
                                    id="nickName"
                                    type="text"
                                    value={nickName || ''}
                                    ariaLabel="name"
                                    onChange={setNickName}
                                    readOnly="readOnly"
                                />
                            </div>
                        )}
                    </div>
                </div>
                {isChangeNickName ? (
                    <div className="h-[40px] w-[20%] ml-[5%] min-w-[100px]">
                        <Button contents="중복 확인" onClick={handleCheckedName} />
                    </div>
                ) : (
                    <div className="h-[40px] w-[20%] ml-[10px] min-w-[100px]">
                        <Button contents="닉네임 변경" onClick={handleNickName} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
