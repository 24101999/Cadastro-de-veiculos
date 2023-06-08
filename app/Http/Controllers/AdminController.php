<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin;
use App\Http\Requests\AdminCadastro;
use App\Models\User;
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
        ]);
    }
    public function cadastro(AdminCadastro $request)
    {

        $us = new User;
        $us->email = $request->email;
        $us->password = password_hash($request->password, PASSWORD_DEFAULT);
        $us->name = $request->name;
        $us->save();
    }
}
