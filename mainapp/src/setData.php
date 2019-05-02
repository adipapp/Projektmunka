<?php
//approved: 0 = pending, 1 = approved, 3 = rejected
//type: 1-11, 9-10-11 traveltype
// date >= dateFrom AND date < dateTo
$kocsog = $_POST['data'];
$kocsog['requestUser'];
$kocsog['targetUser'];
$kocsog['requestType'];
$kocsog['dateFrom'];
$kocsog['dateTo'];
if($kocsog['requestType'] == 'updateUser'){
    echo json_encode('success');
}
if($kocsog['requestType'] == 'deleteUser'){
    echo json_encode('success');
}
if($kocsog['requestType'] == 'addUser'){
    echo json_encode('success');
}
?>