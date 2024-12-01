<?php

namespace App\Repositories;

use App\Models\Bomb;
use App\Repositories\Traits\{ GetByIdTrait, DeleteTrait };

class BombRepository
{
    use GetByIdTrait;
    use DeleteTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Bomb();
    }

    public function getAll()
    {
        return Bomb::all();
    }

    public function update(
        string $id,
        ?int $bombs,
        ?float $multiplier,
        ?int $payoff,
    )
    {
        $bomb = $this->model->find($id);

        if (!$bomb) {
            return null;
        }

        if ($bombs !== null) {
            $bomb->bombs = $bombs;
        }

        if ($multiplier !== null) {
            $bomb->arrival_time = $multiplier;
        }

        if ($payoff !== null) {
            $bomb->payoff = $payoff;
        }

        $bomb->save();

        return $bomb;
    }

    public function create(
        int $bombs,
        float $multiplier,
        int $payoff,
    )
    {
        $bomb = new Bomb();

        $bomb->bombs = $bombs;
        $bomb->multiplier = $multiplier;
        $bomb->payoff = $payoff;

        $bomb->save();

        return $bomb;
    }
}
