const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const Components = require('../components.json');
const config = require('./config');


const webpackConfig = {
    mode: 'production',
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), './lib'), // 返回 Node.js 进程的当前工作目录
        publicPath: '/dist/',
        filename: '[name].js',  // 来对应多入口文件。
        // 优先对应于上面[name].
        chunkFilename: '[id].js',  // https://webpack.docschina.org/configuration/output/#outputchunkfilename
        // 入口起点的返回值 将会被赋值给 module.exports。 也就是说是在node.js环境下使用的。
        // 如果我们指定 output.library.name 为 type: commmonjs2，
        // 你的入口起点的返回值将会被赋值给 module.exports.[output.library.name]
        libraryTarget: 'commonjs2' // 等同于output.library.type，配置将库暴露的方式
    },
    resolve: {
        //尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        extensions: ['.js', '.vue', '.json'],
        // 创建 import 或 require 的别名，来确保模块引入变得更简单。
        alias: config.alias,
        //告诉 webpack 解析模块时应该搜索的目录。
        modules: ['node_modules']
    },
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
    // 如 jQuery
    //这里是将src/下面的一些路径加入到了不打包到bundle中。
    externals: config.externals,
    performance: {
        // 打开/关闭提示
        hints: false
    },

    stats: 'none',  // webpack 有一些特定的预设选项给统计信息输出
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,  //排除所有符合条件的模块。
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};

module.exports = webpackConfig;
