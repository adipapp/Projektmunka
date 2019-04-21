
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

 @if(isset(Auth::user()->email) && Auth::user()->email==adatot_modosithat)
    <h2>Új felhasználó létrehozása</h2>
    <form method="post" action="/reg/store">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="name">Név:</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
 
        <div class="form-group">
            <label for="email">Email cím:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
 
        <div class="form-group">
            <label for="password">Jelszó:</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>

        <div class="form-group">
          <label for="szabit_kiirhat">Jogok:</label>
            <fieldset>
              <p/><input type="checkbox" name="szabit_kiirhat" value="szabit_kiirhat" id="szabit_kiirhat">
              <label for="szabit_kiirhat">Szabadságot kiírhat</label><p/>
              <input type="checkbox" name="biralhat" value="biralhat" id="biralhat">
              <label for="biralhat">Szabadságot bírálhat</label><p/>
              <input type="checkbox" name="adatot_modosithat" value="adatot_modosithat" id="adatot_modosithat">
              <label for="adatot_modosithat">Más felhasználó adatát módosíthatja</label><p/>
              <input type="checkbox" name="inactive" value="inactive" id="inactive">
              <label for="inactive">Inaktív felhasználó</label><p/>
            </fieldset>
        </div>
 
        <div class="form-group">
            <button style="cursor:pointer" type="submit" class="btn btn-primary">Létrehoz</button>
        </div>
        
    </form>

    <p></p>
<a href="/userlist"><button type="submit" class="btn btn-primary">Vissza</button></a>
 
    @else
      <script>window.location = "/successlogin";</script>
    @endif

 </body>
</html>