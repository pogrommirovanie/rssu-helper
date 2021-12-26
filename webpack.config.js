const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const pjson = require('./package.json')

const appVersion = pjson.version

//#region replace userscript.config.js field placeholders with values from package.json
let bannerStr = fs.readFileSync('userscript.config.js', { encoding: 'utf-8' })

const scriptInfoInjectFields = {
    name: { placeholder: '*SCRIPT_INFO_NAME_PLACEHOLDER*', value: pjson.displayName },
    version: { placeholder: '*SCRIPT_INFO_VERSION_PLACEHOLDER*', value: pjson.version },
    description: { placeholder: '*SCRIPT_INFO_DESCRIPTION_PLACEHOLDER*', value: pjson.description },
    updateURL: { placeholder: '*SCRIPT_INFO_UPDATE_URL_PLACEHOLDER*', value: pjson.updateURL },
    downloadURL: { placeholder: '*SCRIPT_INFO_DOWNLOAD_URL_PLACEHOLDER*', value: pjson.updateURL }
}

Object.values(scriptInfoInjectFields).forEach(({ placeholder, value }) => (bannerStr = bannerStr.replace(placeholder, value)))
//#endregion

module.exports = {
    entry: './src/index.ts',
    target: 'web',
    // NOTE: BannerPlugin does not work in production mode
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'rssu-helper.user.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // adds bannerStr to the top of compiled budnle.js file
        new webpack.BannerPlugin({
            banner: bannerStr,
            raw: true
        }),
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(appVersion)
        })
    ]
}
