import React from 'react';

const Pagination = ({total, limit, page, setPage}) => {
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <article className="flex justify-end items-center m-[10px] gap-[10px]">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="pagination-button bg-gray-300 "
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
                            className="pagination-button "
                        >
                            {i + 1}
                        </button>
                    ))}
                <button onClick={() => setPage(page + 1)} disabled={page === numPages} className="pagination-button ">
                    &gt;
                </button>
            </article>
        </>
    );
};

export default Pagination;
