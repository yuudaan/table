const path = require('path');
const webpack = require('webpack');
// const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { NODE_ENV, ANALYZER } = process.env;

function resolve(dir) {
    return path.join(__dirname, dir);
}

const plugins = [
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
];

const config = {
    output: {
        path: resolve('out'),
        library: 'Plugin',
        libraryTarget: 'var',
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.common.js',
            '@': resolve('src'),
        },
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                use: ['babel-loader', {
                    loader: path.join(__dirname, './loader.js'),
                    options: {
                        enabled: !!process.env.PUBLISH,
                    },
                }],

                include: [resolve('src'), resolve('../../src')],
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /(\.postcss$)|(\.css$)/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    optimization: {
        // minimizer: [new TerserPlugin()],
        minimizer: [],
        splitChunks: {
            chunks: 'all',
        },
    },
};

if (NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
    }));
    config.externals = {
        vue: 'Vue',
    };
    config.entry = './src/index.js';
} else {
    config.entry = './index.js';
    config.devtool = '#cheap-module-eval-source-map';
    plugins.push(
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
    );

    config.devServer = {
        clientLogLevel: 'warning',
        hot: true,
        // contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        // host: HOST || config.dev.host,
        port: 9000,
        open: false,
        overlay: { warnings: false, errors: true },
        quiet: true, // necessary for FriendlyErrorsPlugin
        // watchOptions: {
        //     poll: config.dev.poll,
        // },
    };
}

if (ANALYZER) {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
