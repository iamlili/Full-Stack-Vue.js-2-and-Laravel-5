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
    import routeMixin from '../js/route-mixin'; // mixins store functionality common between components. A mixin is an object like a component object. To use it declare it in an array assigned to the component config property 'mixin'. When the component in instantiated, any mixins will be merged with what else is in the component

    /* These lines moved to Route navigation guard below */
    //let serverData = JSON.parse(window.vuebnb_server_data);
    //let listing_groups = groupByCountry(serverData.listings);

    export default {
        data() {
            return { listing_groups: [] } // now that we've moved serverData into the navigation guard and we are getting listing_groups after the component is created, we must initialise it as an empty array, as Vue must know the names of all reactive data properties
        },
        components: { ListingSummary },
        mixins: [ routeMixin ],
        methods: {
            assignData( { listings } ){ // this method is used from our routeMixin
                console.log("assigning data in HomePage component"); console.log(listings);
                this.listing_groups = groupByCountry(listings);
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

