import React from 'react';

const Pagination = ({total, limit, page, setPage}) => {
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <article className="flex justify-end items-center m-2.5 gap-2.5">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer hover:text-white"
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
                            className="py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer hover:text-white"
                        >
                            {i + 1}
                        </button>
                    ))}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === numPages}
                    className="py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer hover:text-white"
                >
                    &gt;
                </button>
            </article>
        </>
    );
};

export default Pagination;
