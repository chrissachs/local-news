<?php

namespace App\Console\Commands;

use App\Events\UrlDiscovered;
use Illuminate\Console\Command;

class TriggerUrl extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trigger:url {url}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Trigger a new discovered url manually';

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
        event(new UrlDiscovered($this->argument('url')));
    }
}
