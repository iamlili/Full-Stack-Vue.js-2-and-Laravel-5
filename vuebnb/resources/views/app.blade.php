<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Vuebnb</title>
<!--   <link rel="stylesheet" href="node_modules/open-sans-all/css/open-sans.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.css"> -->
  <link rel="stylesheet" href="{{ asset('css/style.css') }}" type="text/css">
  <link rel="stylesheet" href="{{ asset('css/vue-style.css') }}" type="text/css">  
  <script type="text/javascript">
      console.log({{ $model[ 'id' ] }});

      {{-- Get data from the backend into the frontend by injecting it in the head --}}

      window.vuebnb_listing_model = "{!! addslashes(json_encode($model)) !!}";
      
      {{--  
        addslashes function will add backslashes before chars that need to be escaped. Its necessary because the javascript JSON parser doesn't know which quotes are part of the javascript syntax and which are a part of the JSON object
        We also use differet kind of blade syntax for interpolation. {{ }} are auto sent through phps htmlspecialchars to prevent xss attacks. This will invalidate our json object. {!! !!} does not validate the contents.  
      --}}
      
      @php
      /*
      safest way to share an object or function between 2 scripts is to make it a property of the global window object, so it's obvious that you're intentionally using a global variable. We make it a very specific name to avoid naming collisions with other third party scripts  
      */
      @endphp

  </script>
</head>
<body>
<div id="toolbar">
  <img class="icon" src="{{ asset('images/logo.png') }}">
  <h1>vuebnb</h1>
</div>
<div id="app">
  <header-image v-bind:image-url="images[0]" @header-clicked="openModal" ></header-image>
  <div class="container">
    <div class="heading">
      <!-- When Blade processes this, it will think the double curly brackets are its own syntax and will generate a PHP error as neither title nor address are defined functions.
      There is a simple solution: escape these double curly brackets to let Blade know to ignore them. This can be done by placing an @ symbol as a prefix. -->
      <h1>@{{ title }}</h1>
      <p>@{{ address }}</p>
    </div>
￼￼    <hr>
    <div class="about">
      <h3>About this listing</h3>
      <expandable-text>@{{ about }}</expandable-text>
    </div>
    <div class="lists">
      <feature-list title="Amenities" v-bind:items="amenities">
        {{-- Scoped Slots allow us to pass in this template. The template will have access to any props in the child.
          eg amenity (in the lines below) is an alias object (we can call it anything) It will be an alias of 'item' from our component list item loop --}}
        <template slot-scope="amenity">
            <i class="fa fa-lg" v-bind:class="amenity.icon"></i>
            <span>@{{ amenity.title }}</span>
        </template>
      </feature-list>
      <feature-list title="Prices" :items="prices" >
        <template slot-scope="price">
            @{{ price.title }}: <strong>@{{ price.value }}</strong>
        </template>
      </feature-list>
    </div>
  </div>
  <modal-window ref="imagemodal"> <!-- 'ref' is a special property allowing you to reference a child component's data. To use it: declare it and assign a unique value. Now the root instance has access to this specific ModalWindow components data via the $refs object. -->
      <image-carousel v-bind:images="images"></image-carousel> <!-- Note: image-carousel is a sibling of modal-window (not a child) because of the use of the slot -->
  </modal-window>
</div>
<!-- <script src="node_modules/vue/dist/vue.js"></script>
<script src="sample/data.js"></script>
<script src="app.js"></script> -->
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
