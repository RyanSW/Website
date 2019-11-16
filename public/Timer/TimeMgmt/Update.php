<?php
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$f = fopen("LatestUpdate", "r");
$data = json_decode(fread($f, filesize("LatestUpdate")), true);
$f = fopen("LatestUpdate", "w");
$d = [
    "UIndex" => $data["UIndex"] + 1,
    "UTime" => time(),
];
fwrite($f, json_encode($d));
echo json_encode($d);
?>