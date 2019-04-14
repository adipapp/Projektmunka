
<!DOCTYPE html>
<html>
 <head>
  <title>Új felhasználó</title>
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

 @if(isset(Auth::user()->email) && Auth::user()->email=='tsz.ui@sze.hu')
    <h2>Új felhasználó létrehozása</h2>
    <form method="post" action="/main/reg/store">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="name">Név:</label>
            <input type="text" class="form-control" id="name" name="name">
        </div>
 
        <div class="form-group">
            <label for="email">Email cím:</label>
            <input type="email" class="form-control" id="email" name="email">
        </div>
 
        <div class="form-group">
            <label for="password">Jelszó:</label>
            <input type="password" class="form-control" id="password" name="password">
        </div>
 
        <div class="form-group">
            <button style="cursor:pointer" type="submit" class="btn btn-primary">Létrehoz</button>
        </div>
        
    </form>
 
    @else
      <script>window.location = "/main/successlogin";</script>
    @endif

 </body>
</html>