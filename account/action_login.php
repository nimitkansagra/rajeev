<?php

if (isset($_POST['user_username']) && $_POST['user_password']) {
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
        "task": "userLogin",
        "data": {
            "username": "' . $_POST['user_username'] . '",
            "password": "' . $_POST['user_password'] . '"
        }
    }
}',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Cookie: PHPSESSID=vmsrud0g1717sqndkave2grog5',
        ),
    ));

    $response = curl_exec($curl);
    $res = json_decode($response, true);

    if ($res["result"] != null) {
        setcookie('csrftoken', $res["result"], time() + 3600, '/');
        header("Refresh: 3; URL=/dashboard/dashboard.html");
    } else {
        header("Refresh: 3; URL=/account/login");
    }

    curl_close($curl);

} else {
    header("Refresh: 3; URL=/account/login");
}
