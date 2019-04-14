<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Hash;

class UserlistController extends Controller
{
    function list(){
    	$users = DB::table('users')->get();
    	return view('userlist', ['users' => $users]);
    }

    function delete(Request $request){
    	DB::table('users')->where('id', $request->get('id'))->delete();
        return redirect('/main/userlist');
    }

    function show(Request $request){
    	return view('usermod', ['user' => $request->get('user')]);
    }

    function modify(Request $request){
    	$user = DB::table('users')->where('id', $request->get('id'))->first();
    	if($user->name != $request->post('name')){
    		DB::table('users')->where('id', $request->post('id'))->update(['name' => $request->post('name')]);
    	}
    	if($user->email != $request->post('email')){
    		DB::table('users')->where('id', $request->post('id'))->update(['email' => $request->post('email')]);
    	}
    	if($request->get('password') != ''){
    		DB::table('users')->where('id', $request->post('id'))->update(['password' => Hash::make($request->post('password'))]);
    	}
    	return redirect('/main/userlist');
    }
}
