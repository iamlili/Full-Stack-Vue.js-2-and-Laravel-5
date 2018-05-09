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

<div id="app"> {{--
  <listing-page></listing-page> {{-- We don't want to do this, as it will still need to be compiled, we are trying to elimate the need for compiling so we will leave #app empty
                                  -- and we will declare a render function in app.js --}}
</div>
<!-- <script src="node_modules/vue/dist/vue.js"></script>
<script src="sample/data.js"></script>
<script src="app.js"></script> -->
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
