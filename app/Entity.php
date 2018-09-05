<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Entity
 *
 * @package App
 *
 * @property int $id
 * @property string $name
 * @property string $url
 * @property Type[] $types
 * @property Location|null $location
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Entity extends Model
{

    public function types() {
        return $this->belongsToMany(
            Type::class,
            'entity_types',
            'entity_id',
            'type_id'
        );
    }

    public function location() {
        return $this->hasOne(Location::class);
    }
}
