<template>
  <div id="modal" v-bind:class="{ show : modalOpen }">
    <button v-on:click="modalOpen = false" class="modal-close">&times;</button>
    <div class="modal-content">
      <slot></slot> /* we use a 'slot' to ensure the carousel stays decoupled, and we add the ImageCarousel declaration in the parent element markup  */
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                modalOpen: false
            }
        },

        methods: {
            /* We had this function originally outside of Vue, but the advantage to Vue methods is that they are passed the Vue instance as context and therefore have easy access to your other properties and methods. */
            escapeKeyListener: function(evt) {
                if (evt.keyCode === 27 && this.modalOpen) {
                    this.modalOpen = false;
                }
            }
        },

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

        /*  We want to close the modal by Pressing the escape key.
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
        }

    }
</script>

<style>
    #modal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2000;
        background-color: rgba(0,0,0,0.85);
    }
    #modal.show {
        display: block;
    }

    .modal-content {
        height: 100%;
        max-width: 105vh;
        padding-top: 12vh;
        margin: 0 auto;
        position: relative;
    }
    .modal-content img {
        max-width: 100%;
    }

    body.modal-open { /* prevent scrolling in bkg while modal is open */
        overflow: hidden;
        position: fixed;
    }

    .modal-close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0px 28px 8px;
        font-size: 4em;
        width: auto;
        height: auto;
        background: transparent;
        border: 0;
        outline: none;
        color: #ffffff;
        z-index: 1000;
        font-weight: 100;
        line-height: 1;
    }
</style>