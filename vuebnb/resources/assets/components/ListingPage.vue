<template>
    <div>
        <header-image v-bind:image-url="images[0]" @header-clicked="openModal"></header-image>
        <div class="container">
            <div class="heading">

            <!-- When Blade processes this, it will think the double curly brackets are its own syntax and will generate a PHP error as neither title nor address are defined functions.
            There is a simple solution: escape these double curly brackets to let Blade know to ignore them. This can be done by placing an @ symbol as a prefix. -->
            <!-- NOTE: The comment above only applied when this template string was in the app.blade.php file (before we created this SFC)
                - adding the @ infront of the variable eg @{{variablename}}, told blade that they a 'vue' variables, and not treat them as php blade variables
                - We have removed all the @ as now this template is in it's own vue file  -->

            <h1>{{ title }}</h1>
            <p>{{ address }}</p>
            </div>
        ￼￼    <hr>
            <div class="about">
            <h3>About this listing</h3>
            <expandable-text>{{ about }}</expandable-text>
            </div>
            <div class="lists">
            <feature-list title="Amenities" v-bind:items="amenities">
                <!-- Scoped Slots allow us to pass in this template. The template will have access to any props in the child.
                eg amenity (in the lines below) is an alias object (we can call it anything) It will be an alias of 'item' from our component list item loop -->
                <template slot-scope="amenity">
                    <i class="fa fa-lg" v-bind:class="amenity.icon"></i>
                    <span>{{ amenity.title }}</span>
                </template>
            </feature-list>
            <feature-list title="Prices" :items="prices" >
                <template slot-scope="price">
                    {{ price.title }}: <strong>{{ price.value }}</strong>
                </template>
            </feature-list>
            </div>
        </div>
        <modal-window ref="imagemodal"> <!-- 'ref' is a special property allowing you to reference a child component's data. To use it: declare it and assign a unique value. Now the root instance has access to this specific ModalWindow components data via the $refs object. -->
            <image-carousel v-bind:images="images"></image-carousel> <!-- Note: image-carousel is a sibling of modal-window (not a child) because of the use of the slot -->
        </modal-window>
    </div>
</template>
<script>

    import { populateAmenitiesAndPrices } from '../js/helpers'; // we import a helper function to structure the model (from the database) into the format we want, ie amenities and prices as arrays (as per original object from data.js file)

    let serverData = JSON.parse(window.vuebnb_server_data);
    let model = populateAmenitiesAndPrices(serverData.listing);

    import HeaderImage from './HeaderImage.vue';
    import ImageCarousel from './ImageCarousel.vue';
    import ModalWindow from './ModalWindow.vue';
    import FeatureList from './FeatureList.vue';
    import ExpandableText from './ExpandableText.vue';

    export default {
        data(){
            /* Instead of manually assigning the properties below with the same name from another object
            we can use Object.assign and merge the two objects. Then add a pollyfill to ensure code will run in old browsers, by installing the core-js dependency, a library of polyfills */
            return Object.assign(model, {  })
        },

        components: {
            HeaderImage,
            ModalWindow,
            ImageCarousel,
            FeatureList,
            ExpandableText
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
    }
</script>

<style>
    .about {
        margin-top: 2em;
    }
    .about h3 {
        font-size: 22px;
    }
</style>