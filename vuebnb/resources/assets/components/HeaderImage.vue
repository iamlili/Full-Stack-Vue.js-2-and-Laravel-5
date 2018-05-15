<template>
 <div class="header">
      <div class="header-img" :style="headerImageStyle" @click="$emit('header-clicked')">
        <listing-save :id="id" :button="true"></listing-save>
        <button class="view-photos">View Photos</button>
      </div>
  </div>
</template>

<script>
    import ListingSave from './ListingSave.vue';

    export default {
        computed: {
            headerImageStyle() {
                return {
                    'background-image': `url(${this.imageUrl})`
                };
            }
        },
        props: ['image-url', 'id'], /* HeaderImage does not have the listing ID in it's scope, so we pass it down as a prop from the ListingPage */
        components: {
            ListingSave
        }
    }
</script>

<style>

    .header {
        height: 320px;
    }

    .header .header-img {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        background-color: #f5f5f5;
        height: 100%;
        cursor: pointer;
        position: relative;
    }

    .header .header-img button {
        border-radius: 4px;
        border: 1px solid #c4c4c4;
        font-weight: bold;
        line-height: 1.43;
        background: white;
        color: #484848;
        padding: 7px 18px;
        font-size: 14px;
    }

    .header .header-img .view-photos {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
    
</style>