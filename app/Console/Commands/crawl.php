<?php

namespace App\Console\Commands;

use App\Entity;
use App\Events\PlaceEntered;
use App\Events\UrlDiscovered;
use App\GeoTest;
use App\Location;
use App\Service\EntityExtraction\DandelionService;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
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

        $lat = (float)52.483333333333;
        $long = (float)13.45;
        $point = new Point($lat, $long);
        $result = DB::select(
            'select entities.name,
            ST_AsGeoJSON(geo) geoJson,
            ST_Distance(ST_GeomFromText(\''.$point->toWKT().'\',0), geo) * 111195 distance
            from locations
            left join entities on entities.id = locations.entity_id 
            WHERE ST_Distance(ST_GeomFromText(\''.$point->toWKT().'\',0), geo) * 111195 < 2000
            order by distance
            '
        );
        dd($result);

        $locations = Location::distance('geo', $point, 2)->get();
        dd($locations);

        $ids = [3,7,10,42,44,48,49,50,53,54,64,66,68,71,74,88,109,111,139,145,146,147,152,153,154,158,159,160,161,163,166,182,184,185,187,205,213,218,223,225,228,233,237,238,243,250];

        foreach($ids as $id) {
            $entity = Entity::find($id);
            event(new PlaceEntered($entity));
        }

        // select ST_Distance(ST_GeomFromText('POINT(13.45 52.483333333333)',0),location) as distance from geo_tests order by distance;
        $first = GeoTest::first();
        dd($first->location);

        $locations = Location::all();
        foreach($locations as $location) {
            /** @var Location $location */
            $point = new Point($location->latitude, $location->longitude);
            $geo = new GeoTest();
            $geo->location = $point;
            $geo->save();
            echo '.';
        }
        dd('here');

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
