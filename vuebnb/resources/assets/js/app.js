

import Vue from 'vue';
//import sample from './data'; /* While Laravel has opted to use CommonJS syntax for including modules, that is require, we will use native ES module syntax, that is import. This is because ES modules are making their way into the JavaScript standard, and it's more consistent with the syntax used by Vue. */
import "core-js/fn/object/assign";
import { populateAmenitiesAndPrices } from './helpers'; // we import a helper function to structure the model (from the database) into the format we want, ie amenities and prices as arrays (as per original object from data.js file)

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

var app = new Vue({
    el: '#app',

    /* Instead of manually assigning the properties below with the same name from another object
    we can use Object.assign and merge the two objects. Then add a pollyfill to ensure code will run in old browsers, by installing the core-js dependency, a library of polyfills */
    data: Object.assign(model, {
        headerImageStyle: {
            'background-image': `url(${model.images[0]})`
        },
        contracted: true,
        modalOpen: false
    }),
    
    /*  We want to prevent bkg scrolling when the modal is open, so we need to add overflow hidden on the body tag
        Vue can't update the body tag because it only has dominion over the element it's mounted on eg '#app'
        Therefore we use a 'watcher' to update the body tag with regular js when the variable 'modalOpen' changes
        (Watchers allow us to write custom logic that hooks into reactive data changes) */
    watch: { 
        modalOpen: function() {
            var className = 'modal-open';
            if (this.modalOpen) {
                document.body.classList.add(className);
            } else {
                document.body.classList.remove(className);
            }
        }  
    },

    /*  We want to close the nodal by Pressing the escape key.
        Vue has key event listeners like eg. <input v-on:keyup.esc="handler">
        However in this modal case, on what element would we add the directive? Unfortunately, unless an input is focused on, key events are dispatched from the body element (which is outside of Vue's jurisdiction)
        Therefore (like the modalOpen watcher above we have to resort to the Web API again)
        But instead of using a Watcher, we hook into one of vue's Lifecycle Hooks (ie 'created' - which is run after the data is proxied) ie our eventlisteners will be created during Vue's initialisation
        (this way we are guaranteed that the modalOpen variable is defined - we could have added the event listener outside of our Vue app config, but a user might press escape before Vue has proxied the data resulting in app.modalOpen being undefined )
         */
    created: function() {
        document.addEventListener('keyup', this.escapeKeyListener);
    },

    /*  Using the 'Destroy' lifecycle hook, we use removeEventListener to get rid of the listener when the Vue instance is torn down, to avoid any memory leaks */
    destroyed: function () {
        document.removeEventListener('keyup', this.escapeKeyListener);
    },

    methods: {
        /* We had this function originally outside of Vue, but the advantage to Vue methods is that they are passed the Vue instance as context and therefore have easy access to your other properties and methods. */
        escapeKeyListener: function(evt) {
            if (evt.keyCode === 27 && this.modalOpen) {
                this.modalOpen = false;
            }
        }
    }
});

/* We've turned this function into a Vue instance method above, and call it using this.escapeKeyListener within the instance */
/*
function escapeKeyListener(evt) {
    if (evt.keyCode === 27 && app.modalOpen) {
      app.modalOpen = false;
    }
}
 */