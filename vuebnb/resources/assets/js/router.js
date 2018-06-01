import Vue from 'vue';
import axios from 'axios';
import store from './store';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from '../components/HomePage.vue';
import ListingPage from '../components/ListingPage.vue';

let router =  new VueRouter ({
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


/* This is a Route navigation guard, similar to vue lifecycle hooks, allowing you to hook into particular pointsduring the routing
 * they can be applied to components, specific routes or all routes */
/* We were previously using the nav guard 'beforeRouteEnter' before we started using vuex and restructured our app architecture, it was in a separate file called route-mixin.js */
router.beforeEach((to, from, next) => {
    let serverData = JSON.parse(window.vuebnb_server_data);

    if(to.name ==='listing' ? store.getters.getListing(to.params.listing) : store.state.listing_summaries.length > 0 ){ // we need to check if we have already got the full listing in our listings array or already have the listing summaries otherwise it'll refetch the data each time we switch between routes

        next();
    } else if (!serverData.path || to.path !== serverData.path) {
        console.log("We need new data!!! We will ajax it now");
        axios.get(`/api${to.path}`).then(({data}) => { console.log(data);
            store.commit('addData', {route: to.name, data});
            next(); // next() function: important in navigation guards. Everything is stopped until this is called, allowing asynchronous code to by executed before navigation continues. Pass it a false to prevent navigation. If nothing is passed navigation will be assume confirmed.
        });
    } else {
        console.log("Already have the data injected in our head");
        store.commit('addData', {route: to.name, data: serverData});
        next();
    }
});


export default router;

