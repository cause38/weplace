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
    setChangedNickName,
    nameInput,
    handleCheckedName,
    handleFocusingName,
}) => {
    return (
        <div className="flex flex-col justify-center items-center md:flex-row md:flex md:justify-evenly gap-8 mt-4 bg-white rounded-lg p-5 shadow-md">
            <div>
                <div className="w-36 h-36">
                    <img className="w-full h-full rounded-full overflow-hidden" src={userImg} />
                </div>
                <form className="h-8 mt-5" encType="multipart.form-data">
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
            <div className="flex-col justify-between align-center md:flex-row md:flex md:items-center">
                <div className=" flex-col mb-10 items-center md:flex-row ">
                    <div className="flex flex-col justify-center w-4/5 mr-7">
                        <div className="flex items-center">
                            <div className="min-w-[70px] w-1/5">아이디</div>
                            <div className="w-full">
                                <p className="ml-1.5">{userId}</p>
                            </div>
                        </div>
                        <div className="flex mt-5 items-center">
                            <div className="min-w-[70px] w-1/5">
                                <p>닉네임</p>
                            </div>
                            {isChangeNickName ? (
                                <div className="w-full min-w-fit min-w-[180px]">
                                    <InputBox
                                        id="nickName"
                                        type="text"
                                        value={nickName || ''}
                                        ariaLabel="name"
                                        placeholder={nickName}
                                        onChange={setChangedNickName}
                                        nameInput={nameInput}
                                    />
                                </div>
                            ) : (
                                <div className="w-full w-full min-w-[180px]">
                                    <InputBox
                                        id="nickName"
                                        type="text"
                                        value={nickName || ''}
                                        ariaLabel="name"
                                        onChange={setChangedNickName}
                                        nameInput={nameInput}
                                        readOnly="readOnly"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isChangeNickName ? (
                    <div className="h-10 w-full min-w-[100px] md:w-5">
                        <Button contents="닉네임 변경" onClick={handleCheckedName} />
                    </div>
                ) : (
                    <div className="h-10 w-full min-w-[100px] md:w-5">
                        <Button contents="닉네임 변경" onClick={handleFocusingName} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
