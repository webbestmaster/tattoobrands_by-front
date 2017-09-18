/* global process, __dirname, module */
/* eslint no-process-env: 0 */
const path = require('path');

const webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

// I do not know how to build on windows
process.env.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
// process.env.NODE_ENV = process.env.NODE_ENV || PRODUCTION;

const NODE_ENV = process.env.NODE_ENV;

const IS_DEVELOPMENT = NODE_ENV === DEVELOPMENT;
const IS_PRODUCTION = NODE_ENV === PRODUCTION;

const CWD = __dirname;

const IS_MOBILE = false;

const autoprefixerOptions = {
    browsers: IS_MOBILE ? [
        'last 2 Samsung versions',
        'last 2 UCAndroid versions',
        'Android >= 4',
        'iOS >= 8',
        'ChromeAndroid > 4'
    ] : [
        'Chrome 20',
        'Safari 5',
        'Edge 12',
        'Explorer 8',
        'Firefox 15'
    ]
};

const styleLoaders = ['css-loader?' + JSON.stringify({minimize: IS_PRODUCTION}),
    'autoprefixer-loader?' + JSON.stringify(autoprefixerOptions),
    'sass-loader'];

const definePluginParams = {
    NODE_ENV: JSON.stringify(NODE_ENV),
    IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
    IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT)
};

if (IS_PRODUCTION) {
    definePluginParams['process.env'] = {NODE_ENV: JSON.stringify('production')};
}

const webpackConfig = {

    context: path.join(CWD, 'www'),
    entry: {
        common: './js/common.js',
        main: ['./js/index.js']
    },
    output: {
        path: path.join(CWD, '../tattoobrands_by/public/front'),
        filename: '[name].js'
    },

    watch: IS_DEVELOPMENT,

    devtool: IS_DEVELOPMENT ? 'source-map' : false,

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['es2015', 'stage-1', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader?name=img/img-[name]-[hash:6].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader?importLoaders=' + (styleLoaders.length - 1)
                })
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(styleLoaders)
            },
            {
                test: /\.raw$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(eot|ttf|otf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        // alias: {
        //     root: path.resolve(CWD, 'www', 'js'),
        //     mc: path.resolve(CWD, 'www', 'js', 'component', 'main')
        // },
        modules: ['www', 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(definePluginParams),

        /*
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
*/
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })
    ]

};

if (IS_PRODUCTION) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true // eslint-disable-line camelcase
            }
        })
    );
}

module.exports = webpackConfig;
