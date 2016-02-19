var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'assets/jsx/Index.jsx'),
    output: {
        path: path.resolve(__dirname, 'gae/src/static/build'),
        publicPath: 'http://localhost:8989/static/build',
        filename: 'flexitime.js'
    },
    // Require the webpack and react-hot-loader plugins
    plugins: [
        //    new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel?cacheDirectory,presets[]=react,presets[]=es2015']
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};