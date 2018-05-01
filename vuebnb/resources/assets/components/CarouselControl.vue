<template>
    <i :class="classes" @click ="clicked" ></i>
</template>

<script>
    export default {
        props: [ 'dir' ],
        computed: {
            classes() {
                return 'carousel-control fa fa-2x fa-chevron-' + this.dir;
            }
        },
        methods: {
            clicked() {
                this.$emit('change-image', this.dir === 'left' ? -1 : 1); // custom events can be emmitted from a child component and listened to by its parent. To do this we use the $emit instance in the child, first arg is the event name, then the remaining arbitrary number of additional args is used for any data to be sent with the event. The parent can then use the v-on directive to listen to this event.
            }
        }
    }
</script>

<style>
    .carousel-control {
        padding: 1rem;
        color: #ffffff;
        opacity: 0.85
    }
    @media (min-width: 744px) {
        .carousel-control {
            font-size: 3rem;
        }
    }
</style>