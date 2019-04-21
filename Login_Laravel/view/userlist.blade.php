<!DOCTYPE html>
<html>
 <head>
  <title>Bejelentkezés</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
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
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Név</th>
      <th scope="col">Email</th>
      <th scope="col">Létrehozva</th>
      <th scope="col">Módosítva</th>
      <th scope="col">Szabdságot kiírhat?</th>
      <th scope="col">Szabadságot bírálhat?</th>
      <th scope="col">Más adatát módosíthatja?</th>
    </tr>
  </thead>
  <tbody>
    @foreach ($users as $u)
    @if($u->inactive)
      <tr style="background:gray;">
    @else
      <tr>
    @endif
        <td>{{ $u->id }}</td>
        <td>{{ $u->name }}</td>
        <td>{{ $u->email }}</td>
        <td>{{ $u->created_at }}</td>
        <td>{{ $u->updated_at }}</td>
        @if($u->szabit_kiirhat)
        <td><i class="fas fa-check"></i></td>
        @else
        <td><i class="fas fa-times"></i></td>
        @endif
        @if($u->biralhat)
        <td><i class="fas fa-check"></i></td>
        @else
        <td><i class="fas fa-times"></i></td>
        @endif
        @if($u->adatot_modosithat)
        <td><i class="fas fa-check"></i></td>
        @else
        <td><i class="fas fa-times"></i></td>
        @endif
        @if($u->superuser)
        <td><a href="{{ route('deleteverify', ['user' => $u]) }}"><button type="submit" class="btn btn-danger" disabled>Töröl</button></a></td>
        @else
        <td><a href="{{ route('deleteverify', ['user' => $u]) }}"><button type="submit" class="btn btn-danger">Töröl</button></a></td>
        @endif
        <td><a href="{{ route('modifyusershow', ['user' => $u]) }}"><button type="submit" class="btn btn-secondary">Módosít</button></a></td>
      </tr>
    @endforeach
  </tbody>
</table>

<p></p>
<a href="/reg"><button type="submit" class="btn btn-primary">Felhasználó létrehozása</button></a>
<p></p>
<a href="/successlogin"><button type="submit" class="btn btn-primary">Főoldal</button></a>

@else
      <script>window.location = "/successlogin";</script>
@endif

  </body>
</html>