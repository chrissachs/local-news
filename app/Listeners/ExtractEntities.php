<?php

namespace App\Listeners;

use App\ArticleEntity;
use App\Entity;
use App\Events\ArticleParsed;
use App\Service\EntityExtraction\DandelionService;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Psr\Log\LoggerInterface;

class ExtractEntities
{

    /** @var DandelionService */
    private $dandelion;
    /** @var LoggerInterface */
    private $logger;

    public function __construct(
        DandelionService $dandelion,
        LoggerInterface $logger
    )
    {
        $this->dandelion = $dandelion;
        $this->logger = $logger;
    }

    /**
     * Handle the event.
     *
     * @param ArticleParsed $event
     *
     * @return void
     */
    public function handle(ArticleParsed $event)
    {
        $article = $event->getArticle();
        $text = $article->text;
        if(!empty($text)) {
            $response = $this->dandelion->getEntitiesFromText($text);
        } else {
            $response = $this->dandelion->getEntitiesFromUrl($article->url);
        }
        $addedIds = [];
        foreach($response as $row) {
            $floatConf = $row['confidence'] ?? 1;
            $confidence = (int)($floatConf * 100);
            /** @var Entity $entity */
            $entity = $row['entity'];
            if(in_array($entity->id, $addedIds, true)) {
                // sometimes entities get reported more than once, ignore duplicates...
                continue;
            }
            $addedIds[] = $entity->id;
            $connection = new ArticleEntity();
            $connection->article_id = $event->getArticle()->id;
            $connection->entity_id = $entity->id;
            $connection->confidence = $confidence;
            $this->logger->debug(sprintf(
                'article %s (#%s) got entity %s (#%s) with confidence %s',
                $event->getArticle()->title,
                $event->getArticle()->id,
                $entity->name,
                $entity->id,
                $confidence
            ));
            $connection->save();
        }
    }
}
