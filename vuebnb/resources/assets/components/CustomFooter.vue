<template>
     <div id="footer">
       <div class="hr"></div>
       <div :class="containerClass">
            <p>
                <img class="icon" src="/images/logo_grey.png">
                <span>
                    <strong>Vuebnb</strong>. A full-stack Vue.js and Laravel demo app
                </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    // the route object represents the state of the currently active route and can be accessed inside the root or component instance with this.$route
    created() { 
        console.log("footer component created");
        console.log(this.$route.fullPath); // /listing/1
        console.log(this.$route.params); // { listing: "1" }
    },
    computed: {
        containerClass() {
            return `${this.$route.name}-container`;
        }
    }
}
</script>

<style>
    #footer {
        margin-bottom: 3em;
    }
    #footer .icon {
        height: 23px;
        display: inline-block;
        margin-bottom: -6px;
    }
    .hr {
        border-bottom: 1px solid #dbdbdb;
        margin: 3em 0;
    }
    #footer p {
        font-size: 15px;
        color: #767676 !important;
        display: flex;
    }
    #footer p img {
       padding-right: 6px;
    }
</style>