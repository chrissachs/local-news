<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Article
 *
 * @package App
 *
 * @property int $id
 * @property string $title
 * @property int $source_id
 * @property Source $source
 * @property string $text
 * @property string $image
 * @property string $url
 * @property string $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Article extends Model
{
    public function source() {
        return $this->belongsTo(Source::class);
    }

    public function articleEntities() {
        return $this->hasMany(ArticleEntity::class);
    }
}
