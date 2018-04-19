<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    /*  The data types in a MySQL database don't completely match up to those in PHP. For example, how does an ORM know if a database value of 0 is meant to be the number 0, or the Boolean value of false?
        An Eloquent model can be given a $casts property to declare the data type of any specific attribute. $casts is an array of key/values where the key is the name of the attribute being cast, and the value is the data type we want to cast to. */
    protected $casts = [
        'amenity_wifi' => 'boolean',
        'amenity_pets_allowed' => 'boolean',
        'amenity_tv' => 'boolean',
        'amenity_kitchen' => 'boolean',
        'amenity_breakfast' => 'boolean',
        'amenity_laptop' => 'boolean'
    ];
}
