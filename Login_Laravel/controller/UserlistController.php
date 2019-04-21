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
        if($request->post('whattodo')=='permdel'){
    	   DB::table('users')->where('id', $request->post('id'))->delete();
        }
        else if($request->post('whattodo')=='inact'){
            DB::table('users')->where('id', $request->post('id'))->update(['inactive' => true]);
        }
        return redirect('/userlist');
    }

    function verify(Request $request){
        return view('deluser', ['user' => $request->get('user')]);
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
        if($request->get('my')===null){
        if($user->szabit_kiirhat && $request->post('szabit_kiirhat') === null){
            DB::table('users')->where('id', $request->post('id'))->update(['szabit_kiirhat' => false]);
        }
        else if(!$user->szabit_kiirhat && $request->post('szabit_kiirhat') !== null){
            DB::table('users')->where('id', $request->post('id'))->update(['szabit_kiirhat' => true]);
        }
        if($user->biralhat && $request->post('biralhat') === null){
            DB::table('users')->where('id', $request->post('id'))->update(['biralhat' => false]);
        }
        else if(!$user->biralhat && $request->post('biralhat') !== null){
            DB::table('users')->where('id', $request->post('id'))->update(['biralhat' => true]);
        }
        if($user->inactive && $request->post('inactive') === null){
            DB::table('users')->where('id', $request->post('id'))->update(['inactive' => false]);
        }
        else if(!$user->inactive && $request->post('inactive') !== null){
            DB::table('users')->where('id', $request->post('id'))->update(['inactive' => true]);
        }
        if($user->adatot_modosithat && $request->post('adatot_modosithat') === null){
            DB::table('users')->where('id', $request->post('id'))->update(['adatot_modosithat' => false]);
        }
        else if(!$user->adatot_modosithat && $request->post('adatot_modosithat') !== null){
            DB::table('users')->where('id', $request->post('id'))->update(['adatot_modosithat' => true]);
        }
        }        
    	return redirect('/userlist');
    }
}
