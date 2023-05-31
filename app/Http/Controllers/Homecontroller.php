<?php

namespace App\Http\Controllers;

use App\Models\dado;
use App\Models\Veiculo;
use Illuminate\Http\Request;

class Homecontroller extends Controller
{
    public function index(Request $request)
    {

        $dados = new Veiculo;

        $dados->nome = $request->nome;
        $dados->marca = $request->marca;
        $dados->ano = $request->ano;

        if (!$dados->name and !$dados->marca and !$dados->ano) {
            return;
        } else {
            $dados->save();
        }
    }
    public function get()
    {
        $all = Veiculo::all();

        echo $all;
    }
    public function item($id)
    {

        $item = Veiculo::find($id);

        echo $item;
    }
    public function destroy($id)
    {
        $item = Veiculo::find($id)->delete();
    }
    public function update(Request $request)
    {

        // $up = Veiculo::update;

    }
}
