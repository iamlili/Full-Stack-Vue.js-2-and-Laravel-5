import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from '../components/HomePage.vue';
import ListingPage from '../components/ListingPage.vue';

export default new VueRouter ({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage, name: 'home' },
        { path: '/listing/:listing', component: ListingPage, name: 'listing' }
    ],
    /* Before adding these lines, if we changed routes, the scroll position would remain the same eg.if you were at the bottom of a page, clicked to go to another route, you would still be at the bottom of the screen  */
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 } // we're keeping it simple, and now will always be at the top of the page when changing routes
    }
});