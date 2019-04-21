
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

 @if(isset(Auth::user()->email))
    <h2>Új felhasználó létrehozása</h2>
    <form method="post" action="/modify/mod">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="id">ID:</label>
            <input type="text" class="form-control" id="id" name="id" value="{{ $user['id'] }}" readonly="readonly">
        </div>

        <div class="form-group">
            <label for="name">Név:</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $user['name'] }}">
        </div>
 
        <div class="form-group">
            <label for="email">Email cím:</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ $user['email'] }}">
        </div>
 
        <div class="form-group">
            <label for="password">Új jelszó:</label>
            <input type="password" class="form-control" id="password" name="password">
        </div>

        @if(!isset($my))
        <div class="form-group">
          <label for="szabit_kiirhat">Jogok:</label>
            <fieldset>

              <p/> @if($user['szabit_kiirhat'])
              <input type="checkbox" name="szabit_kiirhat" value="szabit_kiirhat" id="szabit_kiirhat"  checked>
              @else
              <input type="checkbox" name="szabit_kiirhat" value="szabit_kiirhat" id="szabit_kiirhat">
              @endif
              <label for="szabit_kiirhat">Szabadságot kiírhat</label><p/>
              @if($user['biralhat'])
              <input type="checkbox" name="biralhat" value="biralhat" id="biralhat" checked>
              @else
              <input type="checkbox" name="biralhat" value="biralhat" id="biralhat">
              @endif
              <label for="biralhat">Szabadságot bírálhat</label><p/>
              @if($user['adatot_modosithat'])
              <input type="checkbox" name="adatot_modosithat" value="adatot_modosithat" id="adatot_modosithat" checked>
              @else
              <input type="checkbox" name="adatot_modosithat" value="adatot_modosithat" id="adatot_modosithat">
              @endif
              <label for="adatot_modosithat">Más felhasználó adatát módosíthatja</label><p/>
              @if($user['inactive'])
              <input type="checkbox" name="inactive" value="inactive" id="inactive" checked>
              @else
              <input type="checkbox" name="inactive" value="inactive" id="inactive">
              @endif
              <label for="inactive">Inaktív felhasználó</label><p/>
            </fieldset>
        </div>
        @else
        <input type="hidden" name="my" value="true" />
        @endif
 
        <div class="form-group">
            <button style="cursor:pointer" type="submit" class="btn btn-primary">Módosít</button>
        </div>
        
    </form>

    <p></p>
<a href="/userlist"><button type="submit" class="btn btn-primary">Vissza</button></a>
 
    @else
      <script>window.location = "/successlogin";</script>
    @endif

 </body>
</html>