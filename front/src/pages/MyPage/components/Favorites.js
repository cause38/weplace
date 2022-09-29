import React, {Fragment, useState} from 'react';
import Pagination from './Pagination';

const Favorites = ({favoriteList, handleDeleteFavorite, goToDetail}) => {
    // 화면에 보여줄 티켓 수
    const limit = 3;

    // 페이지
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;

    return (
        <div className=" mt-[20px] flex flex-col max-w-[890px] w-fit">
            <div className="flex overflow-hidden grow mb-[5px]">
                {favoriteList?.slice(offset, offset + limit).map(data => {
                    const {idx, favorite, category, name, review, star, wdate} = data;
                    return (
                        <Fragment key={idx}>
                            <div
                                className={
                                    idx > 1
                                        ? ' flex w-[280px] min-w-[280px] mb-[10px] ml-[10px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                        : ' flex w-[280px] min-w-[280px] mb-[10px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                }
                            >
                                <div
                                    className="absolute cursor-pointer hover:opacity-50"
                                    onClick={e => handleDeleteFavorite(e, idx)}
                                >
                                    <span className="text-red-600 text-[60px]">&#128150; </span>
                                </div>
                                <div
                                    className="w-full ml-[77px] p-[10px] cursor-pointer hover:bg-orange-400 hover:text-white"
                                    onClick={goToDetail}
                                >
                                    <div className="flex justify-between">
                                        <span className="w-fit px-[6px] py-[1px] rounded-[20px] bg-orange-400 text-white">
                                            {category}
                                        </span>
                                        <span>{wdate}</span>
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold">{name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>⭐{star}</span>
                                        <span>&#128221;{review}</span>
                                        <span>💘{favorite}</span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
            <Pagination total={favoriteList.length} limit={limit} page={page} setPage={setPage} />
        </div>
    );
};

export default Favorites;
