<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MoreLess extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['known', 'option', 'guessed', 'stake', 'multiplier', 'payoff'];

    protected $table = 'more_less';
}
