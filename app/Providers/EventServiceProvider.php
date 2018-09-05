<?php

namespace App\Providers;

use App\Events\ArticleParsed;
use App\Events\PlaceEntered;
use App\Events\UrlDiscovered;
use App\Listeners\ExtractEntities;
use App\Listeners\GeoResolveWikipedia;
use App\Listeners\ParseArticle;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        UrlDiscovered::class => [
            ParseArticle::class,
        ],
        ArticleParsed::class => [
            ExtractEntities::class
        ],
        PlaceEntered::class => [
            GeoResolveWikipedia::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
