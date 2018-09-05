<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Location
 *
 * @package App
 *
 * @property int $id
 * @property int $entity_id
 * @property Entity $entity
 * @property float $latitude
 * @property float $longitude
 * @property int|null $scale
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 */
class Location extends Model
{
    public function entity() {
        return $this->belongsTo(Entity::class);
    }
}
