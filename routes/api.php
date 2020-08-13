<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('recipes', 'RecipeController@index');
Route::get('recipes/{id}', 'RecipeController@show');
Route::post('recipes', 'RecipeController@create');
Route::put('recipes/{id}', 'RecipeController@update');
Route::delete('recipes/{id}', 'RecipeController@delete');

Route::get('comments/{id}', 'CommentController@index');
Route::post('comments', 'CommentController@create');
Route::put('comments/{id}', 'CommentController@update');
Route::delete('comments/{id}', 'CommentController@delete');

Route::get('recipes/my/{id}', 'RecipeController@showMy');
Route::get('comments/my/{id}', 'CommentController@showMy');

Route::get('likes/{id}', 'RecipeController@indexLike');
Route::post('likes/{id}', 'RecipeController@like');

Route::get('user/{id}', 'ProfileController@index');
Route::put('profile/{id}', 'ProfileController@update');
Route::delete('profile/{id}', 'ProfileController@delete');





