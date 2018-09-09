<?php

namespace App\Listeners;

use App\Events\PlaceEntered;
use App\Location;
use App\Service\CachingGuzzle;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use function GuzzleHttp\Psr7\parse_query;
use Illuminate\Contracts\Queue\ShouldQueue;
use Psr\Log\LoggerInterface;

class GeoResolveWikipedia implements ShouldQueue {
    /** @var CachingGuzzle */
    private $guzzleClient;
    /** @var LoggerInterface */
    private $logger;

    public function __construct(
        CachingGuzzle $guzzleClient,
        LoggerInterface $logger
    ) {
        $this->guzzleClient = $guzzleClient;
        $this->logger = $logger;
    }

    /**
     * Handle the event.
     *
     * @param  PlaceEntered $event
     *
     * @return void
     */
    public function handle(PlaceEntered $event) {
        $location = $event->getEntity()->location;
        if($location) {
            $this->logger->info('entity #'.$event->getEntity()->id.' has already a location');
            return;
        }
        $this->logger->debug('try resolving location for '.$event->getEntity()->name);

        $parts = parse_url($event->getEntity()->url);

        if(!preg_match('/([a-z]{2})\.wikipedia.org$/',$parts['host'], $hostMatch)) {
            $this->logger->info('entity #'.$event->getEntity()->id.' has no wikipedia url, ignore it');
            return;
        }
        $location = $this->getFromWikipedia($parts['path'], $hostMatch[1]);
        if($location) {
            // https://hackernoon.com/eloquent-relationships-cheat-sheet-5155498c209
            $location->entity()->associate($event->getEntity())->save();
            $location->save();
            $this->logger->info('found new location #'.$location->id.' for entity #'.$event->getEntity()->id);
        }
    }

    private function getFromWikipedia(string $path, string $lang = 'de'): ?Location {
        if(!preg_match('/^\/wiki\/(.*)$/', $path, $res)) {
            return null;
        }
        [,$title] = $res;

        $baseUrl = 'https://'.$lang.'.wikipedia.org/w/api.php';
        $url = $baseUrl.'?'.http_build_query([
                'format' => 'json',
                'action' => 'query',
                'redirects' => 1,
                'titles' => urldecode($title),
                'prop' => 'extlinks',
            ]);

        try {
            $data = $this->guzzleClient->getJson($url);
        } catch (\Exception $exception) {
            $this->logger->error('error while loading wiki data for '.$title.': '.$exception->getMessage());
            return null;
        }
        foreach($data['query']['pages'] ?? [] as $place) {
            if(!isset($place['extlinks'])) {
                continue;
            }
            // TODO: refactor
            foreach($place['extlinks'] as $link) {
                $url = array_pop($link);
                $parts = parse_url($url);
                if(!isset($parts['query']) || $parts['host'] !== 'tools.wmflabs.org') {
                    continue;
                }
                $params = parse_query($parts['query']);
                if(!isset($params['params'])) {
                    continue;
                }
                if(preg_match('/^([0-9.]+)[^0-9]+([0-9.]+)/',$params['params'], $res)) {
                    $scale = null;
                    [, $latitude, $longitude] = $res;
                    if(preg_match('/dim:([0-9]+)/', $params['params'], $dimRes)) {
                        $scale = $dimRes[1];
                    }

                    $location = new Location();
                    $location->geo = new Point((float)$latitude, (float)$longitude);
                    $location->scale = (int)$scale;
                    return $location;
                }
            }
        }
        return null;
    }
}
