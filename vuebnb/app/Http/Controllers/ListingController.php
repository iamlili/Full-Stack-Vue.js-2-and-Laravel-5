<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;

class ListingController extends Controller
{
    private function get_listing($listing) {
        $model = $listing->toArray();
        for($i = 1; $i <=4; $i++) {
            $model['image_' . $i] = asset(
            'images/' . $listing->id . '/Image_' . $i . '.jpg'
            );
        }
        return collect(['listing' => $model ]); //  a Collection is like an array of Eloquent models, with extra handy methods eg the transform helper method
    }

    public function get_listing_api(Listing $listing){
        $data = $this->get_listing($listing);
        return response()->json($data); //create an instance of the Response class by calling the response helper. We use the json; method and pass in our array of fields, returning the result.
    }

    private function add_meta_data($collection, $request) {
        return $collection->merge([
            'path' => $request->getPathInfo()
        ]);
    }

    public function get_listing_web(Listing $listing, Request $request){ //we need to save the path (so we can update the injected data when the SPA route changes), so we'll use the Request object to extract the path info, it is declared as the last argument of any route handling functions
        $data = $this->get_listing($listing);
        $data = $this->add_meta_data($data, $request);
        return view('app', ['data'=> $data ]); //pass the listing to the blade template as an array  
    }

    private function get_listing_summaries(){
        $collection = Listing::all ( [ //use Eloquent ORM's method 'all', we get multiple instances of the Listing model returned, within a Collection object
            'id', 'address', 'title', 'price_per_night' // only need these field, we want the data to be as lean as possible
        ]);

        // we need to generate the 'thumbnail' urls
        // so we use the Collection helper method 'transform' which accepts a callback function. This function is called once for each item in the collection
        $collection->transform(function($listing){
            $listing->thumb = asset( 'images/' . $listing->id . '/Image_1_thumb.jpg' );
            return $listing;
        });

        return collect(['listings' => $collection->toArray()]);
    }

    public function get_home_web(Request $request){ //we need to save the path (so we can update the injected data when the SPA route changes), so we'll use the Request object to extract the path info, it is declared as the last argument of any route handling functions
        $data = $this->get_listing_summaries();
        $data = $this->add_meta_data($data, $request);
        return view('app', ['data' => $data]);
    }

    public function get_home_api() {
        $data = $this->get_listing_summaries();
        return response()->json($data); //create an instance of the Response class by calling the response helper. We use the json; method and pass in our data, returning the json result.
    }
}
