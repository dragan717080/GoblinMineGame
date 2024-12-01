<?php

namespace App\Repositories\Traits;

trait GetByIdTrait
{
    public function getById($id)
    {
        return $this->model->find($id);
    }
}
