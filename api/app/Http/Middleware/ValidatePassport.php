<?php

namespace App\Http\Middleware;

use Closure;

class ValidatePassport
{
    public function handle($request, Closure $next)
    {
        $passport = $request->input('passport');

        $isCorrectPassportFormat = !empty($passport) ? preg_match('/^\d{15}$/', $passport) : true;

        if (!$isCorrectPassportFormat) {
            return response()->json(
                ['error' => 'Invalid passport format. Passport should have 15 digits.'], 
                400
            );
        }

        return $next($request);
    }
}
