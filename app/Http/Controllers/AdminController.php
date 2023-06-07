<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index(Admin $request)
    {
        $input = $request->validated();

        $credentials = [
            "email" => $input['email'],
            "password" => $input['password']
        ];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth('api')->factory()->getTTL() * 60
            // 'expires_in' => auth('api')::guard()->factory()->getTTL() * 60
        ]);

        // return response()->json([
        //     'access_token' => $token,
        //     'token_type' => 'bearer',
        //     //'expires_in' => auth()->factory()->getTTL() * 60
        //     // 'expires_in' => auth('api')->factory()->getTTL() * 60
        // ]);

        // return response()->json([
        //     'access_token' => $token,
        //     'token_type' => 'bearer',
        //     'expires_in' => auth('api')->factory()->getTTL() * 60
        // ]);
    }
}
