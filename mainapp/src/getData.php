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
if($kocsog['requestType'] == 'getCalendarData'){
    $returnData = array(
        ((object) [
            'date' => '2019-05-01',
            'approved' => 0,
            'optionValue' => 1,
            'isTravel' => False,
            'cost' => 0,
        ]),
        ((object) [
            'date' => '2019-05-02',
            'approved' => 0,
            'optionValue' => 1,
            'isTravel' => False,
            'cost' => 0,
        ]),
        ((object) [
            'date' => '2019-05-03',
            'approved' => 1,
            'optionValue' => 1,
            'isTravel' => False,
            'cost' => 0,
        ]),
        ((object) [
            'date' => '2019-05-06',
            'approved' => 2,
            'optionValue' => 1,
            'isTravel' => False,
            'cost' => 0,
        ]),
        ((object) [
            'date' => '2019-05-07',
            'approved' => 0,
            'optionValue' => 1,
            'isTravel' => False,
            'cost' => 0,
        ]),
        );
    echo json_encode($returnData);
}
if($kocsog['requestType'] == 'getUserList'){
    $returnData = array(
        ((object) [
            'userId' => 1,
            'name' => 'Kiss Pista1',
            'email' => 'kiss1@sze.hu',
            'dateCreated' => '2019-04-30 11:11:11',
            'dateModified' => '2019-04-30 11:11:11',
            'inactive' => False,
            'privileges' => ((object) [
                'superuser' => True,
                'biralhat' => True,
                'szabit_kiirhat' => True,
                'adatot_modosithat' => True,
                'orarend_felelos' => True,
            ]),
        ]),
        ((object) [
            'userId' => 2,
            'name' => 'Kiss Pista2',
            'email' => 'kiss2@sze.hu',
            'dateCreated' => '2019-04-23 11:11:11',
            'dateModified' => '2019-04-30 11:11:11',
            'inactive' => False,
            'privileges' => ((object) [
                'superuser' => True,
                'biralhat' => True,
                'szabit_kiirhat' => True,
                'adatot_modosithat' => True,
                'orarend_felelos' => True,
            ]),
        ]),
        ((object) [
            'userId' => 3,
            'name' => 'Kiss Pista3',
            'email' => 'kiss3@sze.hu',
            'dateCreated' => '2019-04-29 11:11:11',
            'dateModified' => '2019-04-30 11:11:11',
            'inactive' => False,
            'privileges' => ((object) [
                'superuser' => True,
                'biralhat' => True,
                'szabit_kiirhat' => True,
                'adatot_modosithat' => True,
                'orarend_felelos' => True,
            ]),
        ]),
        );
    echo json_encode($returnData);
}
?>