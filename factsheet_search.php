<?php

header('Content-Type: application/json');
if (isset($_GET['q'])) {
    $q = $_GET['q'];
    $jsonString = file_get_contents('./factsheet_search.json');
    $data = json_decode($jsonString, true);
    $searchQuery = $q;
    $filteredData = array_filter($data, function ($item) use ($searchQuery) {
        return stripos($item['name'], $searchQuery) !== false;
    });
    $filteredJson = json_encode(array_values($filteredData), JSON_PRETTY_PRINT);
    echo $filteredJson;
} else {
    $errmsg = '[{"errorMessage": "Invalid search query","id": "ERROR"}]';
    echo $errmsg;
}
