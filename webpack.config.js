const path = require('path')

module.exports = {
    entry: './src/main.tsx',
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
                test: /\.module.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /^(?!.*\.module\.css$).*\.css/i,
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
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
    },
}
