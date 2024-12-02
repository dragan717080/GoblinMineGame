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
        ?int $known,
        ?string $option,
        ?int $guessed,
        ?int $stake,
        ?float $multiplier,
        ?int $payoff,
    )
    {
        $moreLess = $this->model->find($id);

        if (!$moreLess) {
            return null;
        }

        if ($known !== null) {
            $moreLess->known = $known;
        }

        if ($option !== null) {
            $moreLess->option = $option;
        }

        if ($guessed !== null) {
            $moreLess->guessed = $guessed;
        }

        if ($stake !== null) {
            $moreLess->stake = $stake;
        }

        if ($multiplier !== null) {
            $moreLess->multiplier = $multiplier;
        }

        if ($payoff !== null) {
            $moreLess->payoff = $payoff;
        }

        $moreLess->save();

        return $moreLess;
    }

    public function create(
        int $known,
        string $option,
        int $guessed,
        int $stake,
        float $multiplier,
        int $payoff,
    )
    {
        $moreLess = new MoreLess();

        $moreLess->known = $known;
        $moreLess->option = $option;
        $moreLess->guessed = $guessed;
        $moreLess->stake = $stake;
        $moreLess->multiplier = $multiplier;
        $moreLess->payoff = $payoff;

        $moreLess->save();

        return $moreLess;
    }
}
