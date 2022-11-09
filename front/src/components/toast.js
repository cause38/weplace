import {React, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {EmojiProvider, Emoji} from 'react-apple-emojis';
import emojiData from '../lib/data.json';

const Toast = ({visible, setToastVisible, msg}) => {
    const toast = useRef(null);
    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                toast.current.classList.remove('opacity-0');
                toast.current.classList.add('opacity-100');
                setTimeout(() => {
                    toast.current.classList.add('opacity-0');
                    toast.current.classList.remove('opacity-100');
                    setToastVisible(false);
                }, 1500);
            }, 150);
        }
    }, [visible]);

    return (
        <div
            ref={toast}
            className={`${
                !visible ? 'hidden' : 'opacity-0'
            } container-wb fixed whitespace-nowrap left-1/2 -translate-x-1/2 bottom-24 text-center sm:bottom-auto sm:top-[90px] m-0 py-0 mt-2 sm:text-right z-[1001] transition`}
        >
            <span className="bg-orange-400 text-white rounded-full py-2 px-6 shadow-md sm:rounded-md">
                <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
                {msg}
                <EmojiProvider data={emojiData}>
                    <Emoji
                        name={'clapping-hands-light-skin-tone'}
                        className="inline-block w-[18px] h-[18px] ml-1 -mt-1"
                    />
                </EmojiProvider>
            </span>
        </div>
    );
};

export default Toast;
