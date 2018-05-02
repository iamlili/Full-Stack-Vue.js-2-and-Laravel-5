require('dotenv').config(); // for using BrowserSync - Require the dotenv module use the config method to load .env. Any environment variables will then be available as properties of the process.env object.
let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   //.sass('resources/assets/sass/app.scss', 'public/css');
   //.styles('resources/assets/css/style.css', 'public/css/style.css');
   .styles([
        'node_modules/open-sans-all/css/open-sans.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'resources/assets/css/style.css'
    ], 'public/css/style.css')
    .copy('node_modules/open-sans-all/fonts',  'public/fonts') //the copy method, which tells Mix to copy the fonts from their home directory into the public folder where they can be accessed by the frontend app
    .copy('node_modules/font-awesome/fonts',  'public/fonts')
    .copy('resources/assets/images', 'public/images')
    .browserSync({ //Similar to watch mode, BrowserSync monitors your files for changes, and when one occurs inserts the change into the browser. This saves you from having to do a manual browser refresh after every build.
        proxy: process.env.APP_URL,
        open: false
    })
;

mix.options({
    extractVueStyles: 'public/css/vue-style.css'
});


/* There are different builds of vue (see in the vue dist folder), eg Full Builds (which include a template compiler) or Runtime-only builds,
 * aswell as some that use a different module pattern eg CommonJs or as we have using used thoughout our app the ES Module pattern (importing files with es6 syntax)
 * The default that Mix uses is the vue.common.js build (which is a Full build)
 * But now that we have converted all out components into SFC including the main app template we don't need a template compiler so we can change to a runtime only
 * build, which will result in a smaller app.js browser file.
 * We can choose between vue.runtime.common.js (commonJS pattern) or vue.runtime.esm.js (ES Module pattern), either will work (as webpack will process them the same way)
 * however to be consitent with our use of ES Modules we'll go with vue.runtime.esm.js
 * 
 * To override Mix's default add the following lines.
 * our app.js file reduced to 272kb from 350kb  */
mix.webpackConfig({
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    }
});


