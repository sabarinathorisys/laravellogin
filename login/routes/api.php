<?php
use App\Http\Controllers\logincontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/getcountry',[logincontroller::class,'getcountry']); //api for getting country from country table
Route::post('/addData',[logincontroller::class,'addData']); //api for posting the userdetails
Route::get('/getstate/{one}',[logincontroller::class,'getstate']); //apifor getting state from state table 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();



});
