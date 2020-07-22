const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const Glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

function getEntryAndHtml(){
	const entries = {}
	const HtmlWebpackPlugins = []
	const filePaths = Glob.sync('./src/*/index.js')
	filePaths.forEach((filePath,index) => {
		const pageName = filePath.match(/src\/(.+)\/index/)[1]
		// console.log('pageName',pageName)
		entries[pageName] = filePath
		HtmlWebpackPlugins.push(
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname,`src/${pageName}/index.html`),
				filename:`${pageName}.html`,
				chunks: [pageName]
			})
		)
	})
	return { entries,HtmlWebpackPlugins }
}

const { entries, HtmlWebpackPlugins } = getEntryAndHtml()

module.exports = {
	mode: 'production',
	entry: {
		test1: './src/test1.js',
		test2: './src/test2.js'
	},
	// entry: entries,
	output: {
		path: path.resolve(__dirname,'dist'),
		filename:'[name]_[chunkhash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test:/\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							plugins: ()=>[
								require('autoprefixer')({
									browsers:['last 2 version','>1%','ios 7']
								})
							]
						}
					},
					{
						loader: 'px2rem-loader',
						options: {
							remUni: 75,
							remPrecision: 8
						}
					}
				]
			},
			{
				test:/\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			},
			{
				test:/\.(jpg|jpeg|gif|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]_[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name]_[contenthash:8].css'
		}),
		new OptimizeCssAssetsWebpackPlugin({
			assetNameRegExp:/\.css$/g,
			cssProcessor: require('cssnano')
		}),
		new HtmlWebpackPlugin({
		    template: path.resolve(__dirname,'src/test1.html'),
		    filename:'test1.html',
		    chunks: ['common','test1']
		}),
		new HtmlWebpackPlugin({
		    template: path.resolve(__dirname,'src/test2.html'),
		    filename:'test2.html',
		    chunks: ['common','test2']
		}),
		new CleanWebpackPlugin(),
		// 构建失败捕获，可做日志上传
		function() {
			this.hooks.done.tap('done',(stats)=> {
				if (stats.compilation.errors && stats.compilation.errors.length > 0) {
					console.log('build error')
					process.exit(1)
				}
			})
		}
		// new HtmlWebpackExternalsPlugin({
		// 	externals: [
		// 		{
		// 			module: 'react',
		// 			entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
		// 			global: 'React',
		// 		},
		// 		{
		// 			module: 'react-dom',
		// 			entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
		// 			global: 'ReactDOM',
		// 		}
		// 	]
		// })
	],//.concat(HtmlWebpackPlugins)
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					minChunks: 2,
					name: 'common',
					chunks: 'all'
				}
			}
		}
	}
}