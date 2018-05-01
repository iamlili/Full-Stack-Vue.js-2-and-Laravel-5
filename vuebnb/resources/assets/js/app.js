

import Vue from 'vue';
//import sample from './data'; /* While Laravel has opted to use CommonJS syntax for including modules, that is require, we will use native ES module syntax, that is import. This is because ES modules are making their way into the JavaScript standard, and it's more consistent with the syntax used by Vue. */
import "core-js/fn/object/assign";
import { populateAmenitiesAndPrices } from './helpers'; // we import a helper function to structure the model (from the database) into the format we want, ie amenities and prices as arrays (as per original object from data.js file)

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

import ImageCarousel from '../components/ImageCarousel.vue';
import ModalWindow from '../components/ModalWindow.vue';


var app = new Vue({
    el: '#app',

    /* Instead of manually assigning the properties below with the same name from another object
    we can use Object.assign and merge the two objects. Then add a pollyfill to ensure code will run in old browsers, by installing the core-js dependency, a library of polyfills */
    data: Object.assign(model, {
        headerImageStyle: {
            'background-image': `url(${model.images[0]})`
        },
        contracted: true
    }),

    components: {
        ModalWindow,
        ImageCarousel
    },

    /* Now that we've decoupled the modal window from the main app, we need a method of sending data from the main app to the component to open the modal ie. when we click on the header image
     * An 'event' won't work, as events can only flow up (to parents), not down.
     * Instead we use a 'ref'. A special property allowing you to reference a child component's data. To use it: declare it on the component declaration markup and assign a unique value. Now the root instance has access to this specific components data via the $refs object eg. $refs.uniquevalue
     * note: it is anti-pattern to user ref when the other normal methods of interacting are sufficient. Ref is only required for communicating with elements that fall outside of the normal flow of a page, as a modal does */
    methods: {
        openModal() {
            this.$refs.imagemodal.modalOpen = true;
        }
    }
});
