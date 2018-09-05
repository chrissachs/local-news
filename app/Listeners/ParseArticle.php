<?php

namespace App\Listeners;

use App\Events\ArticleParsed;
use App\Events\UrlDiscovered;
use Psr\Log\LoggerInterface;
use App\Article;
use App\Source;
use Goose\Article as GooseArticle;
use Goose\Client as GooseClient;
use Readability\Readability;

class ParseArticle
{
    /** @var LoggerInterface */
    private $logger;

    private $reScan = false; // set to true for debugging existing articles


    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * Handle the event.
     *
     * @param  UrlDiscovered $event
     * @return void
     */
    public function handle(UrlDiscovered $event)
    {
        $url = $event->getUrl();
        $this->logger->info('received url '.$url);

        $goose = new GooseClient();
        $parsedArticle = $goose->extractContent($url);
        if($this->doesArticleExist($parsedArticle->getCanonicalLink())) {
            $this->logger->info('article with url "'.$parsedArticle->getCanonicalLink().'" already known, will ignore it');
            return;
        }

        $article = new Article();
        $html = $parsedArticle->getRawHtml();
        $readability = new Readability($html);
        $readability->init();
        $article->title = $parsedArticle->getTitle();
        $article->text = trim($readability->getContent()->textContent);
        $article->source_id = $this->getOrCreateSource(
            $parsedArticle->getDomain(),
            $this->extractLogo($parsedArticle)
        )->id;
        $article->image = $this->extractArticleImage($parsedArticle);
        $article->url = $parsedArticle->getCanonicalLink();
        $article->description = $parsedArticle->getOpenGraph()['description'] ?? null;
        $article->save();
        event(new ArticleParsed($article));
    }

    private function doesArticleExist(string $url): bool {
        $existing = Article::where(['url' => $url])->first();
        if($existing && $this->reScan) { // TODO: remove

            event(new ArticleParsed($existing));
        }
        return $existing !== null;
    }

    private function getOrCreateSource(string $name, string $logo = null, string $url = null): Source {
        $source = Source::where(['name' => $name])->first();
        if($source) {
            return $source;
        }
        $source = new Source();
        $source->name = $name;
        $source->image = $logo;
        $source->url = $url;
        $source->save();
        return $source;

    }

    private function extractLogo(GooseArticle $article): ?string {
        $node = $article->getRawDoc()->find('link[rel=apple-touch-icon]');
        if($node) {
            return $node->attr('href');
        }
        return null;
    }

    private function extractArticleImage(GooseArticle $article): ?string {
        $og = $article->getOpenGraph();
        if(isset($og['image'])) {
            return $og['image'];
        }
        $image = $article->getTopImage();
        if($image) {
            return $image->getImageSrc();
        }
        return null;
    }
}
