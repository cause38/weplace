module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [require('@tailwindcss/line-clamp')],
    theme: {
        fontFamily: {
            'sans-g': ['Gmarket Sans'],
        },
        extend: {
            fontFamily: {
                'sans-g': ['Gmarket Sans'],
            },
            animation: {
                'reverse-spin': 'reverse-spin 3s linear infinite',
                'spin-wb': 'spin-wb 3s linear infinite',
            },
            keyframes: {
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)',
                    },
                },
                'spin-wb': {
                    to: {
                        transform: 'rotate(360deg)',
                    },
                },
            },
        },
    },
};
