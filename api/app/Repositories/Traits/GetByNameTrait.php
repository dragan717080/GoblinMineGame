<?php

namespace App\Repositories\Traits;

trait GetByNameTrait
{
    public function getByName($name)
    {
        return $this->model->where('name', $name)->first();
    }
}
