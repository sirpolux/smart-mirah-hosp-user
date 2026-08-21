<?php

return [

    /*
    |--------------------------------------------------------------------------
    | SEO Configuration
    |--------------------------------------------------------------------------
    |
    | Canonical site URL used for Open Graph tags, canonical links,
    | structured data, and the sitemap. Defaults to the production domain.
    |
    */

    'url' => env('SEO_URL', 'https://smartmirah.com'),

    /*
    | Default meta description used across the site when a page
    | does not provide its own.
    */

    'description' => env(
        'SEO_DESCRIPTION',
        'Smart Mirah Hospitality supplies premium hospitality essentials — bedding, toiletries, and hotel amenities — trusted by hotels across Nigeria.'
    ),

    /*
    | Default social share image (absolute URL).
    */

    'image' => env('SEO_IMAGE', 'https://smartmirah.com/images/logo-with-name.png'),

];
