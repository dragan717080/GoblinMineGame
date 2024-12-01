<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Http\ResponseBuilder;
use App\Repositories\BombRepository;

class BombController extends BaseController
{
    public function __construct(private BombRepository $bombRepository) {}

    public function getAll()
    {
        return ResponseBuilder::getResponse(fn () =>
            $this->bombRepository->getAll()
        );
    }

    public function getById(string $id)
    {
        return ResponseBuilder::getResponse(fn () =>
            $this->bombRepository->getById($id)
        );
    }

    public function create(Request $req)
    {
        $bomb = $req->json()->all();
        return ResponseBuilder::getResponse(fn () => 
            $this->bombRepository->create(
                $bomb['bombs'],
                $bomb['multiplier'],
                $bomb['payoff'],
            )
        );
    }

    public function update(string $id, Request $req)
    {
        return ResponseBuilder::getResponse(fn () => 
            $this->bombRepository->update(
                $id,
                $req->input('bombs'),
                $req->input('multiplier'),
                $req->input('payoff'),
            )
        );
    }

    public function delete(string $id)
    {
        return ResponseBuilder::getResponse(fn () => 
            $this->bombRepository->delete($id)
        );
    }
}
