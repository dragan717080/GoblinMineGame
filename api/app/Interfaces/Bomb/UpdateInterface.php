<?php

declare(strict_types = 1);

namespace App\Interfaces\Bomb;

interface UpdateInterface
{
    public function update(
        string $id,
        ?int $bombs,
        ?float $multiplier,
        ?int $payoff,
    );
}
