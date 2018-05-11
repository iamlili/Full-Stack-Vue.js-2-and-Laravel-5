<template>
    <div class="home-container">
        <div v-for="(group, country) in listing_groups" class="listing-summary-group">
            <h1>Places in {{country}}</h1>
            <div class="listing-summaries">
                <listing-summary v-for="(listing) in group"
                    :key="listing.id"
                    :listing="listing">
                </listing-summary>
            </div>
        </div>
    </div>
</template>
<script>
    import { groupByCountry } from '../js/helpers'; // we import a helper function to group the listing by country
    import ListingSummary from './ListingSummary.vue';

    import axios from 'axios'; //for performing ajax. Already included in Laravel's default frontend code. eg axios.get('my-url'); To get the response chain a 'then' callback

    /* These lines moved to Route navigation guard below */
    //let serverData = JSON.parse(window.vuebnb_server_data);
    //let listing_groups = groupByCountry(serverData.listings);

    export default {
        data() {
            return { listing_groups: [] } // now that we've moved serverData into the navigation guard and we are getting listing_groups after the component is created, we must initialise it as an empty array, as Vue must know the names of all reactive data properties
        },
        components: { ListingSummary },

        /* This is a Route navigation guard, similar to vue lifecycle hooks, allowing you to hook into particular pointsduring the routing
         * they can be applied to components, specific routes or all routes
         *  */
        beforeRouteEnter(to, from, next){
            let serverData = JSON.parse(window.vuebnb_server_data); // moved this line into this navigation guard, (which was originally outside of the component default block), so that we can update the data when we switch between routes

            console.log(`server data path = ${serverData.path}`);
            console.log(to);

            if(to.path === serverData.path){
                let listing_groups = groupByCountry(serverData.listings); console.log("We have correct data for new route");
                next(component => component.listing_groups = listing_groups); // next() function: important in navigation guards. Everything is stopped until this is called, allowing asynchronous code to by executed before navigation continues. Pass it a false to prevent navigation. If nothing is passed navigation will be assume confirmed.
                //in the beforeRouteEnter nav guard the next() function allows you to pass in a callback function, for example in this line 'component' is the page component instance. The CB function is not triggered until the route is confirmed, and will have access to the scope of the surrounding code where it was called
            } else {
                console.log("We need new data!!! We will ajax it.");

                // this is my version // see below for es6's destructuring syntax to just extract the 'data' variable form the response object  
                axios.get('/api/').then(response => {
                    let listing_groups = groupByCountry(response.data.listings);
                    console.log(response.data.listings);
                    next(component => component.listing_groups = listing_groups);
                });
                // same as above but showing es6's destructuring syntax to just extract the 'data' variable form the response object  
                // axios.get(`/api/`).then(({ data }) => {
                //     let listing_groups = groupByCountry(data.listings);
                //     next(component => component.listing_groups = listing_groups);
                // });
            }
            

        }
    }
</script>
<style>
    .home-container {
        margin: 0 auto;
        padding: 0 25px;
    }
    @media (min-width: 1131px) {
        .home-container {
            width: 1080px;
        }
    }
    .listing-summary-group {
        padding-bottom: 20px;
    }
    .listing-summaries {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: hidden;
    }
    .listing-summaries > .listing-summary {
        margin-right: 15px;
    }
    .listing-summaries > .listing-summary:last-child {
        margin-right: 0;
    }
</style>

