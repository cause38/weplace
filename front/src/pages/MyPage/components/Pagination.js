import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({total, limit, page, setPage}) => {
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <article className="flex justify-end items-center mt-2.5">
                <ul className="flex items-center gap-2.5 text-gray-500 font-light">
                    <li>
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="w-8 h-8 cursor-pointer hover:text-orange-400 transition-colors"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                    </li>
                    {Array(numPages)
                        .fill()
                        .map((_, i) => (
                            <li key={i + 1}>
                                <button
                                    onClick={() => setPage(i + 1)}
                                    aria-current={page === i + 1 ? 'page' : null}
                                    className={`${
                                        page === i + 1 ? 'bg-orange-400 text-white' : 'hover:text-orange-400'
                                    } w-8 h-8 rounded-full font-bold cursor-pointer transition-colors`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    <li>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === numPages}
                            className="w-8 h-8 cursor-pointer hover:text-orange-400 transition-colors"
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </li>
                </ul>
            </article>
        </>
    );
};

export default Pagination;
