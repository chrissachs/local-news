<?php

namespace App\Events;

use App\Article;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class ArticleParsed
{
    use Dispatchable, SerializesModels;

    /** @var Article */
    private $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    public function getArticle(): Article {
        return $this->article;
    }
}
