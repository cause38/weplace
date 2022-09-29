import React from 'react';

const Pagination = ({total, limit, page, setPage}) => {
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <article className="flex justify-end items-center m-[10px] gap-[7px]">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="pagination-button bg-gray-300 hover:bg-orange-400 hover:text-white rounded-[20px]"
                >
                    &lt;
                </button>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? 'page' : null}
                            className="pagination-button bg-gray-300 hover:bg-orange-400 hover:text-white rounded-[20px]"
                        >
                            {i + 1}
                        </button>
                    ))}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === numPages}
                    className="pagination-button bg-gray-300 hover:bg-orange-400 hover:text-white rounded-[20px]"
                >
                    &gt;
                </button>
            </article>
        </>
    );
};

export default Pagination;
