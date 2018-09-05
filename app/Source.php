<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Source
 *
 * @package App
 *
 * @property int $id
 * @property string $name
 * @property string|null $url
 * @property string|null $image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Source extends Model
{

}
