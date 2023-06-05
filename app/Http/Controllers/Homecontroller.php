<?php

namespace App\Http\Controllers;

use App\Http\Requests\val;
use App\Models\dado;
use App\Models\Veiculo;
use Illuminate\Http\Request;

class Homecontroller extends Controller
{
    public function index()
    {
        // header('Access-Control-Allow-Origin: *');
        echo Veiculo::all();
    }
    public function insert(val $request)
    {

        $dados = new Veiculo;
        $dados->img = $request->img;
        $img = $dados->img->store('imagens', 'public');
        $link = asset("storage/$img");
        $dados->nome = $request->nome;
        $dados->marca = $request->marca;
        $dados->ano = $request->ano;
        $dados->path = $link;
        $dados->save();
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
    public function update(val $request)
    {

        $val = $request->validated();

        $val = $request->safe()->only(['nome', 'marca', 'ano', 'path']);

        $up = Veiculo::find($request->id);
        $up->img = $request->img;

        $img = $up->img->store('imagens', 'public');

        $link = asset("storage/$img");
        $up->nome = $request->nome;
        $up->marca = $request->marca;
        $up->ano = $request->ano;
        $up->path = $link;

        $up->save();

        if ($up->nome and $up->marca and $up->ano) {
        } else {
            echo false;
        }
    }
}
