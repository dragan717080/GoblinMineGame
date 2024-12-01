<?php

namespace App\Http\Middleware;

use Closure;

class ValidateFlightTimes
{
    public function handle($request, Closure $next)
    {
        $departureTime = $request->input('departureTime');
        $arrivalTime = $request->input('arrivalTime');

        $isCorrectDepartureFormat = !empty($departureTime) ? preg_match('/^\d{2}:\d{2}$/', $departureTime) : true;
        $isCorrectArrivalFormat = !empty($arrivalTime) ? preg_match('/^\d{2}:\d{2}$/', $arrivalTime) : true;

        if (!$isCorrectDepartureFormat || !$isCorrectArrivalFormat) {
            return response()->json(
                ['error' => 'Invalid time format. Time should be in the format HH:mm.'], 
                400
            );
        }

        return $next($request);
    }
}
