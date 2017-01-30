const Webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
	HappyPack = require('happypack');

module.exports = {

    entry: {
        'polyfills': './client/polyfills.ts',
        'vendor': './client/vendor.ts',
        'main': './client/app/main.ts'
    },

    resolve: {

        extensions: ['', '.ts', '.js'],
        root: './',
        modulesDirectories: ['./node_modules'],
		unsafeCache: true
		
    },

    module: {

        preLoaders: [
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=sourcemaploader'				
            }
        ],

        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'				
            },
            {
                test: /\.css$/,
                loader: 'happypack/loader?id=raw'				
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)(\?v=.*)?$/,
                loader: "happypack/loader?id=file"				
            },
            {
                test: /\.json$/,
                loader: 'happypack/loader?id=json'				
            },
            {
                test: /\.html$/,
                loader: 'happypack/loader?id=raw',
                exclude: ['./client/index.html']
            }

        ]

    },

    plugins: [


        new Webpack.optimize.CommonsChunkPlugin({
            name: ["vendor","polyfills"]
        }),

        new CopyWebpackPlugin([
            { from: 'client/app/assets', to: 'assets' }
        ]),

        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            Hammer: "hammerjs/hammer"
        }),

        new HtmlWebpackPlugin({
            template: './client/index.html',
            chunksSortMode: 'auto'
        }),
		
		new HappyPack({
			id: 'raw',
			loaders: [ 'raw-loader' ]
		}),
		new HappyPack({
			id: 'json',
			loaders: [ 'json-loader' ]
		}),
		new HappyPack({
			id: 'file',
			loaders: [ 'file-loader' ]
		}),		
		new HappyPack({
			id: 'sourcemaploader',
			loaders: [ 'source-map-loader' ]
		}),
		
    ]

};
