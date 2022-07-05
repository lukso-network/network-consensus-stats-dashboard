var webpack = require('webpack');
var path = require('path');
var fs = require("fs");
var TerserPlugin = require('terser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('interpolate-html-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

function getConfig(isProduction) {
    var isDebug = !isProduction;

    var sourceRoot = path.join(__dirname, "src");
    var appRoot = path.join(__dirname, "src/app");
    var nodeModulesPath = path.join(__dirname, "node_modules");
    var sourcePublicRoot = path.join(__dirname, "src/public");
    var assetsRoot = path.join(__dirname, "src/assets");
    var outputRoot = path.join(__dirname, "dist");
    var tsConfigJsonFilename = "tsconfig.webpack.json";
    var tsConfigPath = path.join(__dirname, tsConfigJsonFilename);

    var localesInfo = JSON.parse(fs.readFileSync(path.join(appRoot, "translation", "locales.json"), "utf8"));
    var defaultLocale = localesInfo.find(l => !!l.default).locale;
    var availableLocales = localesInfo.map(l => l.locale);

    var translation = require(path.join(appRoot, "translation", defaultLocale + ".json"));


    var plugins = [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: tsConfigPath
            }
        }),
        // These are preprocessor constants which are replaced inline (that's why the extra quotes)
        new webpack.DefinePlugin({
            // This is needed to be able to activate some features for development (like ReduxDevTools)
            // and, also, some libs (like React) have an optimized (smaller&faster) builds
            // if NODE_ENV is set to "production"
            'process.env.NODE_ENV': JSON.stringify(isDebug ? 'development' : 'production'),

            'APP_AVAILABLE_LOCALES': JSON.stringify(availableLocales.join(",")),
            'APP_DEFAULT_LOCALE': JSON.stringify(defaultLocale)
        }),
        new CopyWebpackPlugin([
            {
                from: sourcePublicRoot,
                to: outputRoot,
                ignore: ["index.html"]
            }
        ]),
        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            title: translation["title"],
            description: translation["description"],
            template: path.join(sourcePublicRoot, "index.html")
        }),
        new InterpolateHtmlPlugin({
            'APP_DEFAULT_LOCALE': defaultLocale
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(assetsRoot, "ethstats.svg"),
            title: translation["title"]
        })
    ];

    return {
        mode: isDebug ? "development" : "production",
        context: appRoot,
        entry: {
            // Entry points (bundles)
            // The key is a bundle name, the value is the entry file
            // If you are using async require, you also need to add
            // __webpack_public_path__ to the top of the entry file
            "js/app": './index'
        },
        output: {
            path: outputRoot,
            sourcePrefix: '',
            crossOriginLoading: "anonymous",
            filename: "[name].bundle.js",
            chunkFilename: "js/[contentHash].bundle.js",
            pathinfo: !!isDebug,
            publicPath: "/"
        },
        optimization: isDebug ? void 0 : {
            moduleIds: 'deterministic',
            minimize: true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    // Don't merge statements with comma. This makes breakpoints unusable in debugger.
                    compress: {
                        sequences: false,
                        join_vars: false,
                        // Dropping unused variables causes problems with libraries such as MobX
                        unused: false,
                        if_return: false,
                        properties: false
                    },
                    mangle: {
                        safari10: true
                    },
                    sourceMap: true
                },
            })]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    enforce: "pre",
                    use: "source-map-loader"
                },
                {
                    test: /\.(t)sx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: tsConfigJsonFilename
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: {
                        loader: 'url-loader',
                         options: {
                            limit: 8192,
                            outputPath: "img/"
                        }
                    }
                },
                {
                    test: /\.p?css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
                },
            ]
        },
        resolve: {
            alias: {
            },
            modules: [
                sourceRoot,
                nodeModulesPath
            ],
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
        },
        // If incremental build performance becomes an issue, this option can be enabled
        // to generate faster source maps
        devtool: /*isDebug ? 'eval-source-map' : */'source-map',
        // Uncomment this to use polling instead of file watchers (e.g. too few available
        // from environment)
        watchOptions: {
            aggregateTimeout: 0,
            poll: 1000,
            ignored: ['node_modules/**']
        },
        plugins: plugins
    };

}

module.exports = getConfig;
