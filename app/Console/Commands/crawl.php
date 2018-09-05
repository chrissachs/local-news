<?php

namespace App\Console\Commands;

use App\Events\UrlDiscovered;
use App\Service\EntityExtraction\DandelionService;
use Illuminate\Console\Command;
use Psr\Log\LoggerInterface;

class crawl extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'extract:entities {url}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /** @var DandelionService */
    private $dandelon;

    /** @var LoggerInterface */
    private $logger;

    /**
     * Create a new command instance.
     *
     * @param DandelionService $dandelionService
     * @param LoggerInterface  $logger
     */
    public function __construct(
        DandelionService $dandelionService,
        LoggerInterface $logger
    )
    {
        $this->logger = $logger;
        $this->dandelon = $dandelionService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {


        $urls = [
            'https://www.tagesspiegel.de/berlin/berlin-neukoelln-neue-razzia-gegen-arabischen-clan-in-berlin/22996870.html',
            'https://leute.tagesspiegel.de/reinickendorf-5-9-2018/',
            'https://www.tagesspiegel.de/berlin/nach-unfall-mit-hiv-spritze-wohnungsgesellschaft-will-gelaende-besser-sichern/22999378.html',
            'https://www.tagesspiegel.de/berlin/berlin-charlottenburg-buchhandlung-hugendubel-expandiert-im-europa-center/22995324.html',
            'https://www.tagesspiegel.de/kultur/helene-fischer-gegen-rechts-nazilos-durch-die-nacht/22999910.html',
            'https://www.tagesspiegel.de/politik/geheimdienst-affaeren-verfassungsschutz-praesident-liess-berichte-zu-amri-spitzel-unterdruecken/22999444.html',
            'https://www.morgenpost.de/berlin/article215260073/1-FC-Koeln-schliesst-neun-Randalierer-aus-Verein-aus.html',
        ];
        foreach($urls as $url) {
            event(new UrlDiscovered($url));
        }
        dd('yy');

        $url = $this->argument('url');
        event(new UrlDiscovered($url));
        dd('dd');


        // TODO: dandelon, and save it
        // TODO: location

        dd($article);
        //$entities = $this->dandelon->requestEntities($target);
        dd($this->dandelon->entitiesFromText($article->text));
    }



}
