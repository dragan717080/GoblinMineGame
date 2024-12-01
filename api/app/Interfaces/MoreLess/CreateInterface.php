<?php

declare(strict_types = 1);

namespace App\Interfaces\Bomb;

interface CreateInterface
{
    public function create(
        int $bombs,
        float $multiplier,
        int $payoff,
    );
}
