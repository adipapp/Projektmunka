<?php

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

// Route::get('/', function () {
//     return view('welcome');
// });


// Route::get('/my', function () {
//     return "HELLOKA";
// });

Route::get('/', 'LoginController@index');
Route::get('/my', 'LoginController@my');
Route::post('/checklogin', 'LoginController@checklogin');
Route::get('/successlogin', 'LoginController@successlogin');
Route::get('/logout', 'LoginController@logout');
Route::get('/reg', 'RegistrationController@index');
Route::post('/reg/store', 'RegistrationController@store');
Route::get('/userlist', 'UserlistController@list');
Route::post('/delete', ['as' => 'deleteuser', 'uses' => 'UserlistController@delete']);
Route::get('/delete/verify', ['as' => 'deleteverify', 'uses' => 'UserlistController@verify']);
Route::post('/modify/mod', ['as' => 'modifyuser', 'uses' => 'UserlistController@modify']);
Route::get('/modify/show', ['as' => 'modifyusershow', 'uses' => 'UserlistController@show']);