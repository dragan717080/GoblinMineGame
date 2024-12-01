<?php

declare(strict_types = 1);

namespace App\Interfaces;

// Every entity will have this interface
interface DeleteInterface 
{
    public function delete(string $id);
}
