<?php

declare(strict_types = 1);

namespace App\Interfaces\Bomb;

interface UpdateInterface
{
    public function update(
        string $id,
        ?int $known,
        ?string $option,
        ?int $guessed,
        ?int $stake,
        ?float $multiplier,
        ?int $payoff,
    );
}
