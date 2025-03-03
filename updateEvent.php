<?php
$con = null;


try {
    $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=em437', 'em437', 'my392517sql');
} catch (PDOException $e) {
    echo "Database connection error " . $e->getMessage();
}


$id = isset($_POST['id']) ? $_POST['id'] : "null";
$set = isset($_POST['set']) ? $_POST['set'] : "null";

echo $set . " . ";

$get = "UPDATE events SET " . $set . " WHERE id = " . $id;

$stmt = $con->prepare($get);
$stmt->execute();

echo $get;
