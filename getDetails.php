<?php
$con = null;

header('Content-Type: application/json');

try {
    $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=at997', 'at997', 'my481662sql');
} catch (PDOException $e) {
    echo "Database connection error " . $e->getMessage();
}

$get = "SELECT * FROM events where id = " . $_GET["id"];
$events = $con->query($get)->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($events);
