<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;

class ListingController extends Controller
{

    private function add_image_urls($model, $id) {
        for($i = 1; $i <=4; $i++) {
            $model['image_' . $i] = asset(
            'images/' . $id . '/Image_' . $i . '.jpg'
            );
        }
       return $model;
    }

    public function get_listing_api(Listing $listing){
        //return $listing->toJson();
        
        $model = $listing->toArray();
        $model = $this->add_image_urls($model, $listing->id);
        return response()->json($model); //create an instance of the Response class by calling the response helper. We use the json; method and pass in our array of fields, returning the result.
    }

    public function get_listing_web(Listing $listing){
        $model = $listing->toArray();
        $model = $this->add_image_urls($model, $listing->id);
        return view('app', ['model'=> $model ]); //pass the listing to the blad template as an array  
    }
}
