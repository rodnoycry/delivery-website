const path = require('path')

module.exports = {
    entry: '/client/src/main.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.txt$/,
                use: 'raw-loader',
            },
            {
                test: /\.module.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName:
                                    '[name]__[local]--[hash:base64:8]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                exclude: /\.module.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true, // true outputs JSX tags
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@images': path.resolve(__dirname, 'public/images'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@mockData': path.resolve(__dirname, 'src/mockData'),
            '@shared': path.resolve(__dirname, 'src/components/shared'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@functions': path.resolve(__dirname, 'src/functions'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}
