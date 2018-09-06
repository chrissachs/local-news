<?php

namespace App;

use Carbon\Carbon;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Illuminate\Database\Eloquent\Model;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

/**
 * Class Location
 *
 * @package App
 *
 * @property int         $id
 * @property int         $entity_id
 * @property Entity      $entity
 * @property Point       $geo
 * @property int|null    $scale
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * https://github.com/grimzy/laravel-mysql-spatial
 */
class Location extends Model {
    use SpatialTrait;

    // https://stackoverflow.com/questions/46926283/convert-st-distance-result-to-kilometers-or-meters
    private const CIRLE_DEFREE_TO_METER_MULTIPLIER = 111195;

    protected $spatialFields = [
        'geo',
    ];

    public function entity() {
        return $this->belongsTo(Entity::class);
    }

    public static function withinMetersOfPoint(int $meters, Point $point) {
        return self::distance('geo', $point, $meters/self::CIRLE_DEFREE_TO_METER_MULTIPLIER);
    }
}
