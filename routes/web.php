<?php

use App\Http\Controllers\Homecontroller;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/', [Homecontroller::class, 'index']);
Route::get('/', [Homecontroller::class, 'index']);
Route::get('/veiculos', [Homecontroller::class, 'get']);
Route::get('/veiculos/{id?}', [Homecontroller::class, 'item']);
Route::delete('/delete/{id?}', [Homecontroller::class, 'destroy']);
Route::put('/edit/{id?}', [Homecontroller::class, 'update']);
Route::get('/edit/{id?}', [Homecontroller::class, 'update']);
