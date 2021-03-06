const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                minify: true
            }),
            new MiniCSSExtractPlugin()
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            {
                                plugins: [
                                    '@babel/plugin-proposal-class-properties'
                                ]
                            }
                        ]
                    }
                },

                // CSS
                {
                    test: /\.css$/,
                    use:
                        [
                            MiniCSSExtractPlugin.loader,
                            'css-loader'
                        ]
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/images/'
                                }
                            }
                        ]
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/fonts/'
                                }
                            }
                        ]
                },

                //GLSL
                {
                    test: /\.(glsl|vert|frag)$/,
                    loader: 'threejs-glsl-loader',
                    // Default values (can be omitted)
                    options: {
                        chunksPath: '../ShaderChunk', // if chunk fails to load with provided path (relative), the loader will retry with this one before giving up
                        chunksExt: 'glsl', // Chunks extension, used when #import statement omits extension
                    }
                }

            ]
    }
}
