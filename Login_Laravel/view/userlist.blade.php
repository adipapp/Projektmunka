<!DOCTYPE html>
<html>
 <head>
  <title>Bejelentkezés</title>
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
  <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Név</th>
      <th scope="col">Email</th>
      <th scope="col">Létrehozva</th>
    </tr>
  </thead>
  <tbody>
    @foreach ($users as $u)
      <tr>
        <td>{{ $u->id }}</td>
        <td>{{ $u->name }}</td>
        <td>{{ $u->email }}</td>
        <td>{{ $u->created_at }}</td>
        <td><a href="{{ route('deleteuser', ['id' => $u->id]) }}"><button type="submit" class="btn btn-danger">Töröl</button></a></td>
        <td><a href="{{ route('modifyusershow', ['user' => $u]) }}"><button type="submit" class="btn btn-secondary">Módosít</button></a></td>
      </tr>
    @endforeach
  </tbody>
</table>

<p></p>
<a href="/main/reg"><button type="submit" class="btn btn-primary">Felhasználó létrehozása</button></a>
<p></p>
<a href="/main/successlogin"><button type="submit" class="btn btn-primary">Vissza</button></a>

@else
      <script>window.location = "/main/successlogin";</script>
@endif

  </body>
</html>