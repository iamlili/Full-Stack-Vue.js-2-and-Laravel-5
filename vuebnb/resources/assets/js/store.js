import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // the state property stores any data we want to be globally available to all out components 
        saved: []
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
        }
    }
});