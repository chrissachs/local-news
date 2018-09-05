<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ArticleEntity
 *
 * @package App
 *
 * @property int $id
 * @property int $entity_id
 * @property Entity $entity
 * @property int $article_id
 * @property Article $article
 * @property int $confidence (0-100)
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class ArticleEntity extends Model
{
    public function entity() {
        return $this->hasOne(Entity::class);
    }

    public function article() {
        return $this->hasOne(Article::class);
    }
}
