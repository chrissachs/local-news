<?php

namespace App\Console\Commands;

use App\Events\UrlDiscovered;
use function GuzzleHttp\Psr7\parse_query;
use Illuminate\Console\Command;
use Spatie\TwitterStreamingApi\PublicStream;

class ConsumeTwitter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'consume:twitter';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Listen to new tweets from configured accounts';

    private $blacklistedHosts = [
        // TODO: make configurable
        'twitter.com'
    ];

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $toFollow = [ // TODO: load from TwitterSubscription
            // https://tweeterid.com/
            22926365, // tagesspiegel
            22152558, // bz
            19240255, // morgenpost
            19533595, // berlin_ticker/morgenpost
        ];
        $stream = PublicStream::create(
            env('TWITTER_ACCESS_TOKEN'),
            env('TWITTER_ACCESS_TOKEN_SECRET'),
            env('TWITTER_API_KEY'),
            env('TWITTER_API_SECRET')
        );
        $stream->whenTweets($toFollow, function(array $tweet) {
            echo '.';
            $this->searchUrl($tweet);
            if(isset($tweet['retweeted_status']['extended_tweet'])) { // TODO: retweets?
                $this->searchUrl($tweet['retweeted_status']['extended_tweet']);
            }
            // TODO
            file_put_contents('/tmp/tweets.json', json_encode($tweet).PHP_EOL.PHP_EOL, FILE_APPEND);
            //print_r($tweet);
        })->startListening();
    }

    private function searchUrl(array $tweet): void {
        if(!isset($tweet['entities']['urls'])) {
            return;
        }

        foreach($tweet['entities']['urls'] as $urlData) {
            if(isset($urlData['expanded_url'])) {
                $url = $urlData['expanded_url'];
                $parts = parse_query($url);
                if(isset($parts['host']) && !in_array($parts['host'], $this->blacklistedHosts, true)) {
                    event(new UrlDiscovered($url));
                }
            }
        }
    }
}
