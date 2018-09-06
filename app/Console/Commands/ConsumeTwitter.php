<?php

namespace App\Console\Commands;

use App\Events\UrlDiscovered;
use Illuminate\Console\Command;
use Psr\Log\LoggerInterface;
use Spatie\TwitterStreamingApi\PublicStream;

class ConsumeTwitter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'consume:twitter 
        {--replay=0 : 1 tries to replay last tweets } 
        {--consume=1 : 1 opens the socket and waits for new tweets}';

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

    private $tempFile = '/tmp/tweets.json';
    /** @var LoggerInterface */
    private $logger;

    public function __construct(LoggerInterface $logger) {
        $this->logger = $logger;
        parent::__construct();
    }

    public function handle()
    {
        if($this->option('replay') > 0) {
            $this->replay();
        }
        if($this->option('consume') > 0) {
            $this->openSocket();
        }
    }

    private function openSocket() {
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
            $this->handleTweet($tweet);
            // TODO
            file_put_contents($this->tempFile, json_encode($tweet).PHP_EOL.PHP_EOL, FILE_APPEND);
        })->startListening();

    }

    private function handleTweet(array $tweet) {
        echo '.';
        $this->searchUrl($tweet);
        if(isset($tweet['retweeted_status']['extended_tweet'])) { // TODO: retweets?
            $this->searchUrl($tweet['retweeted_status']['extended_tweet']);
        }
    }

    private function searchUrl(array $tweet): void {
        if(!isset($tweet['entities']['urls'])) {
            return;
        }

        foreach($tweet['entities']['urls'] as $urlData) {
            if(isset($urlData['expanded_url'])) {
                $url = $urlData['expanded_url'];
                $parts = parse_url($url);
                if(isset($parts['host']) && !in_array($parts['host'], $this->blacklistedHosts, true)) {
                    event(new UrlDiscovered($url));
                } else {
                    $this->logger->info('ignore url '.$url);
                }
            }
        }
    }

    private function replay() {
        if(!file_exists($this->tempFile)) {
            echo 'nothing to replay';
            return;
        }
        $handle = fopen($this->tempFile, 'r');
        while(($line = fgets($handle)) !== false) {
            if(empty(trim($line))) {
                continue;
            }
            $tweet = \GuzzleHttp\json_decode($line, true);
            $this->handleTweet($tweet);
        }
    }
}
