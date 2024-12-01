<?php

namespace App\Repositories\Traits;

trait DeleteTrait
{
    public function delete($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
