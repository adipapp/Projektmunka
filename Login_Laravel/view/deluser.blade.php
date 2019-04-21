
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

 @if(isset(Auth::user()->email) && Auth::user()->adatot_modosithat)
    <h2>Új felhasználó létrehozása</h2>
    <form method="post" action="/delete">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="id">ID:</label>
            <input type="text" class="form-control" id="id" name="id" value="{{ $user['id'] }}" readonly="readonly">
        </div>

        <div class="form-group">
            <label for="name">Név:</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $user['name'] }}" readonly="readonly">
        </div>
 
        <div class="form-group">
            <label for="email">Email cím:</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ $user['email'] }}" readonly="readonly">
        </div>

        <div class="form-group">
            <label for="whattodo">Mit szeretne tenni a felhasználóval?</label>
            <select class="mdb-select md-form" name="whattodo">
              <option value="" disabled selected>Válassza ki mit szeretne tenni a userrel</option>
              <option value="inact">Inaktiválás</option>
              <option value="permdel">Végleges törlés</option>
              
            </select>
        </div>    
 
        <div class="form-group">
            <button style="cursor:pointer" type="submit" class="btn btn-primary">Véglegesít</button>
        </div>
        
    </form>

    <p></p>
<a href="/userlist"><button type="submit" class="btn btn-primary">Vissza</button></a>
 
    @else
      <script>window.location = "/userlist";</script>
    @endif

 </body>
</html>