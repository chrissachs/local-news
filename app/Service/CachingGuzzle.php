<?php
/**
 * Created by PhpStorm.
 * User: chris
 * Date: 04.09.18
 * Time: 13:49
 */

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Storage\Psr6CacheStorage;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;

class CachingGuzzle {

    public function getJson($url, $options = []) {
        $body = $this->getClient()->get($url, $options)->getBody();
        return \GuzzleHttp\json_decode($body, true);
    }

    public function getClient(): Client {
        $stack = HandlerStack::create();
        $stack->push($this->getCacheStrategy(),'cache');

        return new Client(
            [
                'handler' => $stack,
                'headers' => [
                    'user-agent' => $this->buildUserAgent()
                ]
            ]
        );
    }

    private function getCacheStrategy(): CacheMiddleware {
        $cache_storage = new Psr6CacheStorage(
            new FilesystemAdapter('', 0, '/tmp/lcn') // TODO: configurable cache dir
        );
        return new CacheMiddleware(
            new GreedyCacheStrategy($cache_storage, 60*60)
        );
    }

    private function buildUserAgent(): string {
        return sprintf('%s %s',
            env('APP_NAME'),
            env('APP_VERSION')
        );
    }


}