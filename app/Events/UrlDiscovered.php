<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;

class UrlDiscovered
{
    use Dispatchable;

    private $url;

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    public function getUrl(): string {
        return $this->url;
    }
}
