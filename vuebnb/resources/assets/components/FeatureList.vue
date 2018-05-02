<template>
    <div>
        <hr>
        <div class="amenities list">
            <div class="title"><strong>{{title}}</strong></div>
            <div class="content">
                <!-- <slot></slot>
                originally we had then entire contents of the content div passed through the regular slot above, but it was a bit unbalanced, as the parent was 
                still doing the majority of the work eg iterating through all the list items. Instead we can use Scoped Slots which allow us to pass in a template
                instead of a rendered element. We also pass in the list items into this component and do the iteration here. Both method use same amount of markup
                however this way is more robust as we have delagated more common functionality to the component ie the iteration -->

                <div class="list-item" v-for="item in items">
                    <slot v-bind="item"></slot><!-- this is the first time we're using v-bind without an argument. This will bind an entire object to the element, which is useful as out amenities and prices lists have different properties, so now we don't have to specify them -->
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ "title", "items" ]
    }
</script>

<style>
    hr {
        border: 0;
        border-top: 1px solid #dce0e0;
    }
    .list {
        display: flex;
        flex-wrap: nowrap;
        margin: 2em 0;
    }
    .list .title {
        flex: 1 1 25%;
    }
    .list .content {
        flex: 1 1 75%;
        display: flex;
        flex-wrap: wrap;
    }
    .list .list-item {
        flex: 0 0 50%;
        margin-bottom: 16px;
    }
    .list .list-item > i {
        width: 35px;
    }

    @media (max-width: 743px) {
        .list .title {
            flex: 1 1 33%;
        }
        .list .content {
            flex: 1 1 67%;
        }
        .list .list-item {
            flex: 0 0 100%;
        }
    }
</style>

