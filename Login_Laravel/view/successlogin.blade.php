
<!DOCTYPE html>
<html>
 <head>
  <title>Adminisztráció</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style type="text/css">
   .box{
    width:600px;
    margin:0 auto;
    border:1px solid #ccc;
   }
  </style>
 </head>
 <body>
  <br />
  <div class="container box">
   <h3 align="center">Adminisztráció</h3><br />

   @if(isset(Auth::user()->email))
    <div class="alert alert-danger success-block">
     <strong>Üdvözlöm {{ Auth::user()->name }}</strong>
     <br />
     <a href="{{ url('/main/logout') }}">Kijelentkezés</a>
    </div>
   @else
    <script>window.location = "/main";</script>
   @endif
   
   <p></p>
   <a href="/main/userlist"><button type="submit" class="btn btn-primary">Felhasználók kezelése</button></a>
   
  </div>
 </body>
</html>

