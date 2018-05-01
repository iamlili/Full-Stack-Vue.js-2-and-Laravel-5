<template>
    <div class="image-carousel">
        <img v-bind:src="image"/>
        <div class="controls">
            <carousel-control dir="left" v-on:change-image="changeImage"></carousel-control>
            <carousel-control dir="right" v-on:change-image="changeImage" ></carousel-control>
        </div>
    </div>
</template>


<script>

    import CarouselControl from './CarouselControl.vue';

    export default {
        //Props allow us to send data into (and out of) a component though the html. They allow components to communicate with other parts of the app.        
        //we declare 'images' a prop, and let the root instance pass in the image URLS. The image-carousel componenet will just be resonsible for displaying them
        props: ['images'],
        data() {
            return {
                index: 0
            }
        },
        computed: { // computed properties: can be thought of as reactive methods which are rerun whenever a deventent value is changed.
            image() {
                return this.images[this.index];
            }
        },
        methods: {
            changeImage(val){         
                let newVal = this.index + parseInt(val);
                if (newVal < 0) {
                    this.index = this.images.length -1;
                } else if (newVal === this.images.length) {
                    this.index = 0;
                } else {
                    this.index = newVal;
                }
            }
        },
        components: {
            CarouselControl
        }
    }
</script>

<style>
    /* This css ends up being included in the js bundle as string. Webpacks bootstrapping code will inline this css string into the head of the document when the app runs
     * Inlining is the default behaviour of Vue Loader. We can override this and get webpack to write SFC (single file component) styles to their own file. We do this by updating the Mix config and adding the mix.options block to the bottom of the file
     * then we have to include the compiled file in our head
     */
    .image-carousel img {
        width: 100%;
    }
    .image-carousel {
        height: 100%;
        margin-top: -12vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .image-carousel .controls {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>