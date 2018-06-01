import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: { // the state property stores any data we want to be globally available to all out components 
        saved: [],
        listing_summaries: [],
        listings: []
    },
    mutations: {
        toggleSaved(state, id){
            console.log("in mutator");
            let index = state.saved.findIndex(saved => saved === id);
            if(index === -1){
                state.saved.push(id);
            }else{
                state.saved.splice(index, 1);
            }
        },

        /* populate our listing & listing_summaries data */
        addData( state, { route, data }){ console.log("in addData mutator");
            if (route === 'listing') {
                state.listings.push(data.listing);
            } else {
                state.listing_summaries = data.listings;
            }
        }
    },
    /* getters are used to get stuff from the store that is not a direct value, but a derived value (they are like computed properties for the Store)
     * Generally when several components need the same derived value, to save repeating code
     * note: unlike mutations, they don't accept a payload. If you want to pass a value to a getter, you need to return a function where the payload is an argument */
    getters: {
        getListing(state){
            return id => state.listings.find(listing => id == listing.id );
        },
        savedSummaries(state) {
            return state.listing_summaries.filter(
              item => state.saved.indexOf(item.id) > -1
            );
        }
    }
});