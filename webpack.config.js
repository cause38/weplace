const path = require('path');

module.exports = {
    entry: './front/src/App.js',
    output: {
        path: path.resolve(__dirname, 'front/build'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-proposal-nullish-coalescing-operator'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    mode: 'development'
}