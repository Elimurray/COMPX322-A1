<?php
$con = null;

header('Content-Type: application/json');

try {
    $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=em437', 'em437', 'my392517sql');
} catch (PDOException $e) {
    echo "Database connection error " . $e->getMessage();
}

$get = "SELECT * FROM events";
$events = $con->query($get)->fetchAll(PDO::FETCH_ASSOC);


$events = array_map(function ($event) {
    return [
        'name' => $event['name'],
        'location' => $event['location'],
        'id' => $event['id']

    ];
}, $events);

echo json_encode($events);
