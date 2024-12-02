<?php

declare(strict_types = 1);

namespace App\Interfaces\Bomb;

interface CreateInterface
{
    public function create(
        int $known,
        string $option,
        int $guessed,
        int $stake,
        float $multiplier,
        int $payoff,
    );
}
