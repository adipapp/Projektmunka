<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    	User::create([
        	'name' => $request->get('name'),
        	'email' => $request->get('email'),
        	'password' => Hash::make($request->get('password'))
        ]);
        return redirect('main/userlist');
    }
}
