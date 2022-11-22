import {React, useEffect, useRef} from 'react';
import {EmojiProvider, Emoji} from 'react-apple-emojis';
import emojiData from '../lib/data.json';

const Toast = ({visible, setToastVisible, msg}) => {
    const toast = useRef(null);
    useEffect(() => {
        if (visible) {
            toast.current.classList.remove('opacity-0');
            toast.current.classList.add('opacity-100');
            toast.current.classList.remove('translate-y-24');

            setTimeout(() => {
                toast.current.classList.add('translate-y-24');
                toast.current.classList.add('opacity-0');
                toast.current.classList.remove('opacity-100');
                setToastVisible(false);
            }, 1000);
        }
    }, [visible, setToastVisible]);

    return (
        <div
            ref={toast}
            className={`opacity-0 translate-y-24 container-wb fixed whitespace-nowrap bottom-[50px] left-1/2 -translate-x-1/2 text-center m-0 py-0 mt-2 z-[1001] transition ease-in delay-200	duration-400`}
        >
            <span className="bg-stone-500/90 text-white rounded-full py-3 px-7 shadow-md">
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
