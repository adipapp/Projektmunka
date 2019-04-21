<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Auth;
use App\User;
use Hash;

class RegistrationController extends Controller
{
    function index(){
    	return view('registration');
    }

    function store(Request $request){
    	DB::table('users')->insert([
        	'name' => $request->get('name'),
        	'email' => $request->get('email'),
        	'password' => Hash::make($request->get('password')),
            'inactive' => $request->get('inactive')===null?false:true,
            'superuser' => false,
            'biralhat' => $request->get('biralhat')===null?false:true,
            'szabit_kiirhat' => $request->get('szabit_kiirhat')===null?false:true,
            'adatot_modosithat' => $request->get('adatot_modosithat')===null?false:true,
            'orarend_felelos' => false,
            'created_at' => DB::raw('now()'),
            'updated_at' => DB::raw('now()')
        ]);
        return redirect('/userlist');
    }
}
