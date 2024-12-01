<?php

namespace App\Http;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ResponseBuilder
{
    public static function getResponse(callable $callback, $message = 'Success', $status = 200)
    {
        try {
            $data = $callback();

            if ($data === null) {
                return self::notFound('Resource not found');
            }

            return response()->json(['data' => $data, 'message' => $message], $status);
        } catch (\Exception $e) {
            return self::error($e->getMessage(), 500);
        }
    }

    public static function error($message = 'Error', $status = 400)
    {
        return response()->json(['message' => $message], $status);
    }

    public static function notFound($message = 'Resource not found')
    {
        return response()->json(['message' => $message], Response::HTTP_NOT_FOUND);
    }
}
