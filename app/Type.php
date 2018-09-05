<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Type
 *
 * @package App
 *
 * @property int $id
 * @property string $name
 * @property EntityType $connection
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Type extends Model
{
    public function connection() {
        $this->hasMany(EntityType::class);
    }
}
