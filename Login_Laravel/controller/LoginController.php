<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Auth;

class LoginController extends Controller
{
    function index(){
    	return view('login');
    }

    function checklogin(Request $request)
    {
     $this->validate($request, [
      'email'   => 'required|email',
      'password'  => 'required|alphaNum|min:8'
     ]);

     $user_data = array(
      'email'  => $request->post('email'),
      'password' => $request->post('password')
     );

     $user = DB::table('users')->where('email', $request->post('email'))->first();

     if(Auth::attempt($user_data) && $user !==null && !$user->inactive)
     {
      return redirect('/successlogin');
     }
     else
     {
      return back()->with('error', 'Helytelen adatok!');
     }

    }

    function successlogin()
    {
     return view('successlogin');
    }

    function logout()
    {
     Auth::logout();
     return redirect('/');
    }

    function my(){
        return view('usermod', ['user' => Auth::user(), 'my' => true]);
    }
}
