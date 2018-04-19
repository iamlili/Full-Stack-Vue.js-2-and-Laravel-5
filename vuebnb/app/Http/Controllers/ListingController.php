<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;

class ListingController extends Controller
{
    public function get_listing_api(Listing $listing){
        //return $listing->toJson();
        
        $model = $listing->toArray();
        for($i=0; $i<=4; $i++){
            //we use the asset helper to generate fully qualified URLs to files in the public folder.
            $model['image_'.$i] = asset('images/'.$listing->id.'/Image_'.$i.'.jpg');
        }
        return response()->json($model); //create an instance of the Response class by calling the response helper. We use the json; method and pass in our array of fields, returning the result.
    }
}
