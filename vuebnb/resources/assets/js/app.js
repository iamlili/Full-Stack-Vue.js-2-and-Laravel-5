

import Vue from 'vue';
//import sample from './data'; /* While Laravel has opted to use CommonJS syntax for including modules, that is require, we will use native ES module syntax, that is import. This is because ES modules are making their way into the JavaScript standard, and it's more consistent with the syntax used by Vue. */
import "core-js/fn/object/assign";

import router from './router';
import store from './store';

import App from '../components/App.vue'


/* in order for Vue to render components to a page, it transforms the template string into a JS object using it's internal template compiler library.
 * After that it's able to interface with the DOM to synchronize the page with the state of the component.
 * Instead of supplying a template string you could supply a 'render' function (to generate a semantically equivalent template)
 * Render functions are more efficient as they don't require Vue to compile the template string first, however not as easy to create and work with
 * 
 * Luckily Webpack via 'Vue Loader' is already transforming our Single File Componenets into render functions during the build process, as can be seen in the built app.js file
 * 
 * The only thing that's still being compiled is our app's root element (ie the content between #app container), which still requires the Vue template compiler (just like any other template string)
 * However we can abstract this template into another SFC (ie ListingPage.vue), meaning in the end: all our app templates will be built as render functions so we wont be invoking the compiler at all during runtime */

var app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
