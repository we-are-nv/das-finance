<?php

$data = array(

  "applicants"=> [
    array(
      "email"=> $_POST["email"],
      "firstName"=> $_POST["firstName"],
      "lastName"=> $_POST["lastName"],
      "telephone"=> $_POST["telephone"]
    )
  ],
  "buyerType" => $_POST["buyerType"],
);

$data = json_encode($data);

$ch = curl_init();

$headers = [
  "x-api-key: 2528e9b2-7250-48fc-9371-4c13cd5991a4",
  "accept: application/json",
  "content-Type: application/json",
];

curl_setopt($ch, CURLOPT_URL, 'https://api.smartr365.com/api/v1/mortgage/lead/create');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

$response = curl_exec($ch);
$status_code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
var_dump($response);
// TO DEBUG ---
// $responseData = json_decode($response, true);
//var_dump($data);
var_dump($status_code);
// var_dump($response);

curl_close ($ch);

?>
