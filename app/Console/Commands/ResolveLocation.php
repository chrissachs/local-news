<?php

namespace App\Console\Commands;

use App\Entity;
use App\Events\PlaceEntered;
use Illuminate\Console\Command;

class ResolveLocation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'extract:location {url}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        event(new PlaceEntered(Entity::find(3)));
    }

}
