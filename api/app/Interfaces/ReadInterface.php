<?php

declare(strict_types = 1);

namespace App\Interfaces;

// Every entity will have this interface
interface ReadInterface
{
    public function getAll();
    public function getById(string $id);
}
