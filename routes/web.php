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

// Route::post('/', [Homecontroller::class, 'index']);
Route::get('/', [Homecontroller::class, 'index']);
Route::get('/insert', [Homecontroller::class, 'insert']);
Route::post('/insert', [Homecontroller::class, 'insert']);
Route::get('/{id?}', [Homecontroller::class, 'item']);
Route::delete('/delete/{id?}', [Homecontroller::class, 'destroy']);
Route::post('/edit/{id?}', [Homecontroller::class, 'update']);
Route::get('/edit/{id?}', [Homecontroller::class, 'update']);
