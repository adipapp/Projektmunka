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

Route::get('/', function () {
    return view('welcome');
});


Route::get('/my', function () {
    return "HELLOKA";
});

Route::get('/main', 'LoginController@index');
Route::post('/main/checklogin', 'LoginController@checklogin');
Route::get('main/successlogin', 'LoginController@successlogin');
Route::get('main/logout', 'LoginController@logout');
Route::get('/main/reg', 'RegistrationController@index');
Route::post('/main/reg/store', 'RegistrationController@store');
Route::get('/main/userlist', 'UserlistController@list');
#Route::get('/main/delete', 'UserlistController@delete');
Route::get('/main/delete', ['as' => 'deleteuser', 'uses' => 'UserlistController@delete']);
Route::post('/main/modify/mod', ['as' => 'modifyuser', 'uses' => 'UserlistController@modify']);
Route::get('/main/modify/show', ['as' => 'modifyusershow', 'uses' => 'UserlistController@show']);