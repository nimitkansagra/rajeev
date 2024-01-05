<?php

function getInvoice($user, $id) {
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://appfedsfee.com/api/index.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
        "type": "get",
        "param": {
            "task": "userSingleInvoice",
            "data": {
                "user": '.$user.',
                "invoiceId": '.$id.'
            }
        }
    }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Authorization: Bearer KfHqKlhUeEc6eBAc'
        ),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    $data = json_decode($response, true);
    return $data;
}


