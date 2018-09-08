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
    protected $signature = 'trigger:url {--u|url= : URL to add into database} {--f|file= : Text file, with one URL per row to add}';

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
        $url = $this->option('url');
        $file = $this->option('file');
        if(empty($url) && empty($file)) {
            throw new \InvalidArgumentException('neither URL, nor FILE was provided, see help');
        }
        if(!empty($url)) {
            $this->triggerUrl($url);
        }

        if(!empty($file)) {
            $this->loadFromFile($file);
        }
    }

    private function loadFromFile(string $path): void {
        if(!file_exists($path)) {
            throw new \InvalidArgumentException('file not found');
        }
        $handle = fopen($path,'r');
        while($line = fgets($handle)) {
            $this->triggerUrl($line);
        }
    }

    private function triggerUrl(string $url): void {
        $url = trim($url);
        event(new UrlDiscovered($url));
    }
}
