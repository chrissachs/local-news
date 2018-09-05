<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EntityType
 *
 * @package App
 *
 * @property int $id
 * @property int $entity_id
 * @property Type $type
 * @property Entity $entity
 * @property int $type_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class EntityType extends Model
{
    public function entity() {
        $this->hasOne(Entity::class);
    }

    public function type() {
        $this->hasOne(Type::class);
    }
}
