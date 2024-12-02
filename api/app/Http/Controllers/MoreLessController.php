<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Http\ResponseBuilder;
use App\Repositories\MoreLessRepository;

class MoreLessController extends BaseController
{
    public function __construct(private MoreLessRepository $moreLessRepository) {}

    public function getAll()
    {
        return ResponseBuilder::getResponse(fn () =>
            $this->moreLessRepository->getAll()
        );
    }

    public function getById(string $id)
    {
        return ResponseBuilder::getResponse(fn () =>
            $this->moreLessRepository->getById($id)
        );
    }

    public function create(Request $req)
    {
        $moreLess = $req->json()->all();
        return ResponseBuilder::getResponse(fn () => 
            $this->moreLessRepository->create(
                $moreLess['known'],
                $moreLess['option'],
                $moreLess['guessed'],
                $moreLess['stake'],
                $moreLess['multiplier'],
                $moreLess['payoff'],
            )
        );
    }

    public function update(string $id, Request $req)
    {
        return ResponseBuilder::getResponse(fn () => 
            $this->moreLessRepository->update(
                $id,
                $req->input('known'),
                $req->input('option'),
                $req->input('guessed'),
                $req->input('stake'),
                $req->input('multiplier'),
                $req->input('payoff'),
            )
        );
    }

    public function delete(string $id)
    {
        return ResponseBuilder::getResponse(fn () => 
            $this->moreLessRepository->delete($id)
        );
    }
}
