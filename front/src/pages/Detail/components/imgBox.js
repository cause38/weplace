import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons';

const ImgBox = ({item, handleImg}) => {
    const [visible, setVisible] = useState(false);
    return (
        <div
            className="imgBox relative w-[100px] h-[100px] border p-2 hover:bg-orange-200 cursor-pointer"
            onClick={() => handleImg(item)}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{background: `url('${item}') no-repeat center/auto 90%`}}
        >
            <div
                className={`${
                    visible ? 'opacity-100' : 'opacity-0'
                } transition absolute w-full h-full bg-gray-300/50 text-orange-400 top-0 left-0 flex justify-center items-center`}
            >
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </div>
        </div>
    );
};

export default ImgBox;
