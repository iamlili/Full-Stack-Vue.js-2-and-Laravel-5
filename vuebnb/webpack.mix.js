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


