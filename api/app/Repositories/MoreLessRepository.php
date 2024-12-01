<?php

namespace App\Repositories;

use App\Models\MoreLess;
use App\Repositories\Traits\{ GetByIdTrait, DeleteTrait };

class MoreLessRepository
{
    use GetByIdTrait;
    use DeleteTrait;

    public $model;

    public function __construct()
    {
        $this->model = new MoreLess();
    }

    public function getAll()
    {
        return MoreLess::all();
    }

    public function update(
        string $id,
        ?int $moreLesss,
        ?float $multiplier,
        ?int $payoff,
    )
    {
        $moreLess = $this->model->find($id);

        if (!$moreLess) {
            return null;
        }

        if ($moreLesss !== null) {
            $moreLess->bombs = $moreLesss;
        }

        if ($multiplier !== null) {
            $moreLess->arrival_time = $multiplier;
        }

        if ($payoff !== null) {
            $moreLess->payoff = $payoff;
        }

        $moreLess->save();

        return $moreLess;
    }

    public function create(
        int $moreLesss,
        float $multiplier,
        int $payoff,
    )
    {
        $moreLess = new MoreLess();

        $moreLess->bombs = $moreLesss;
        $moreLess->multiplier = $multiplier;
        $moreLess->payoff = $payoff;

        $moreLess->save();

        return $moreLess;
    }
}
