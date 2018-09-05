<?php

namespace App\Events;

use App\Entity;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class PlaceEntered {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /** @var Entity */
    private $entity;

    public function __construct(Entity $entity) {
        $this->entity = $entity;
    }

    public function getEntity(): Entity {
        return $this->entity;
    }
}
