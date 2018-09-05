<?php

namespace App\Providers;

use App\Service\CachingGuzzle;
use App\Service\EntityExtraction\DandelionService;
use Illuminate\Support\ServiceProvider;

class EntityExtractionServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(DandelionService::class, function($app) {
            return new DandelionService(
                new CachingGuzzle(),
                env('DANDELON_TOKEN')
            );
        });
    }
}
