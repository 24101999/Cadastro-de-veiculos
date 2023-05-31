<?php

namespace App\Http\Controllers;

use App\Models\dado;
use Illuminate\Http\Request;

class Homecontroller extends Controller
{
    public function index(Request $request)
    {

        $dados = new dado;

        $dados->name = $request->name;

        $dados->save();
    }
}