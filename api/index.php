<?php
namespace Visa;

use Visa\Functions as FUN;
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

function curl_get_file_contents($URL)
{
    $c = curl_init();
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_URL, $URL);
    $contents = curl_exec($c);
    curl_close($c);

    if ($contents) {
        return $contents;
    } else {
        return false;
    }

}

function getVisIpAddr()
{

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

if (isset(apache_request_headers()['Visa-Session-Id'])) {
    session_id((apache_request_headers()['Visa-Session-Id']));
    session_start();
} else {
    if (!isset($_SESSION)) {
        session_start();
    }

}

include_once '../includes/load.php';

$responce = array();

$req = file_get_contents("php://input");

if (isset($_GET["ping"])) {
    dataDisplay("true");
} else {
    if ($req == "" || isset($req) || $res != null) {
        $data = json_decode($req, true);
        if (isset($data["type"]) && $data["type"] != null) {
            try {
                $request = $data["type"];
                $param = $data["param"];
                processRequest($request, $param);
            } catch (Exception $e) {
                errorResponse(401);
            }
        } else {
            errorResponse(401);
        }
        

    } else {
        errorResponse(401);

    }
}

function compressString($text)
{
    $t = (string) $text;
    return gzdeflate(gzdeflate($t, 9), 9);
}

function errorResponse($code = 404)
{
    $response['code'] = $code;
    $response['status'] = statusCode($code);
    $res['success'] = false;
    $response['version'] = "v1";
    $response['time'] = time();
    http_response_code($code);
    responseDisplay($response);
}

function responseDisplay($data)
{
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
}

function dataDisplay($data, $code = 200)
{
    $res = [];
    $res['code'] = $code;
    $res['status'] = statusCode($code);
    $res['success'] = true;
    $res['version'] = "v1";
    $res['time'] = time();
    $res['result'] = $data;
    http_response_code($code);
    echo json_encode($res, JSON_UNESCAPED_SLASHES);
}

function processRequest($type, $param)
{

    if ($type == "get") {
        if ($param["task"] == "userLogin") {
            $data = getUserLogin($param);
            dataDisplay($data);
        } else if ($param["task"] == "userAllInvoices") {
            $data = getUserAllInvoices($param);
            dataDisplay($data);
        } else if ($param["task"] == "userSingleInvoice") {
            $data = getUserSingleInvoice($param);
            dataDisplay($data);
        } else {
            errorResponse(412);
        }

    }

    // if ($type == "delete") {
    //     if ($param["task"] == "stickerSaveByUser" && checkUserSession()) {
    //         $data = deleteStickerSaveByUser($param);
    //         dataDisplay($data);
    //     } else {
    //         errorResponse(412);
    //     }
    // }

    // if ($type == "update") {
    //     if ($param["task"] == "templateCount" && checkUserSession()) {
    //         $data = updateTemplateCount($param);
    //         dataDisplay($data);
    //     } else {
    //         errorResponse(412);
    //     }
    // }

}


// 

function getUserAllInvoices($param)
{
    $data = new DATA;
    $fun = new FUN;

    $data->setValue('token', getBearerToken());
    $data->setValue('user', $param["data"]["user"]);
    $res = $fun->getUserAllInvoices($data);

    return $res->getValue("result");
}

function getUserSingleInvoice($param)
{
    $data = new DATA;
    $fun = new FUN;

    // $data->setValue('token', getBearerToken());
    $data->setValue('user', $param["data"]["user"]);
    $data->setValue('invoiceId', $param["data"]["invoiceId"]);
    $res = $fun->getUserSingleInvoice($data);

    return $res->getValue("result");
}

function getUserLogin($param)
{
    $data = new DATA;
    $fun = new FUN;

    $data->setValue('username', $param["data"]["username"]);
    $data->setValue('password', $param["data"]["password"]);

    $res = $fun->checkUserLogin($data);

    return $res->getValue("result");
}

function getBearerToken()
{
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];

        if (stripos($authorizationHeader, 'Bearer ') === 0) {
            $token = substr($authorizationHeader, 7);
            return $token;
        }
    }

    return null;
}

function checkApiKey()
{
    return true;
    // $expectedApiKey = $_SERVER['API_KEY'];

    // if (isset($_SERVER['HTTP_API_KEY'])) {
    //     $apiKeyHeader = $_SERVER['HTTP_API_KEY'];

    //     if ($apiKeyHeader === $expectedApiKey) {
    //         return true;
    //     }
    // }

    // return false;
}

function checkUserSession()
{
    return true;
    // $api = checkApiKey();
    // $token = getBearerToken();

    // if ($token == null && $api == false) {
    //     return false;
    // }

    // if ($token != null) {
    //     $crafty_fun = new FUN;
    //     $res = $crafty_fun->getUserBySession($token);

    //     if ($res !== false) {
    //         if ($res["status"] == 0) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     } else {
    //         return false;
    //     }
    // } else {
    //     return $api;
    // }
}

function checkAdminSession($token)
{
    if ($token == null) {
        return false;
    } else {
        $crafty_fun = new FUN;
        $res = $crafty_fun->userAdminBySession($token);
        if (isset($res["user_type"])) {
            if ($res["user_type"] == 0) {
                return true;
            }
        }
    }

    return false;
}

function statusCode($code)
{

    switch ($code) {
        case 100:
            $text = 'Continue';
            break;
        case 101:
            $text = 'Switching Protocols';
            break;
        case 200:
            $text = 'OK';
            break;
        case 201:
            $text = 'Created';
            break;
        case 202:
            $text = 'Accepted';
            break;
        case 203:
            $text = 'Non-Authoritative Information';
            break;
        case 204:
            $text = 'No Content';
            break;
        case 205:
            $text = 'Reset Content';
            break;
        case 206:
            $text = 'Partial Content';
            break;
        case 300:
            $text = 'Multiple Choices';
            break;
        case 301:
            $text = 'Moved Permanently';
            break;
        case 302:
            $text = 'Moved Temporarily';
            break;
        case 303:
            $text = 'See Other';
            break;
        case 304:
            $text = 'Not Modified';
            break;
        case 305:
            $text = 'Use Proxy';
            break;
        case 400:
            $text = 'Bad Request';
            break;
        case 401:
            $text = 'Unauthorized';
            break;
        case 402:
            $text = 'Payment Required';
            break;
        case 403:
            $text = 'Forbidden';
            break;
        case 404:
            $text = 'Not Found';
            break;
        case 405:
            $text = 'Method Not Allowed';
            break;
        case 406:
            $text = 'Not Acceptable';
            break;
        case 407:
            $text = 'Proxy Authentication Required';
            break;
        case 408:
            $text = 'Request Time-out';
            break;
        case 409:
            $text = 'Conflict';
            break;
        case 410:
            $text = 'Gone';
            break;
        case 411:
            $text = 'Length Required';
            break;
        case 412:
            $text = 'Precondition Failed';
            break;
        case 413:
            $text = 'Request Entity Too Large';
            break;
        case 414:
            $text = 'Request-URI Too Large';
            break;
        case 415:
            $text = 'Unsupported Media Type';
            break;
        case 500:
            $text = 'Internal Server Error';
            break;
        case 501:
            $text = 'Not Implemented';
            break;
        case 502:
            $text = 'Bad Gateway';
            break;
        case 503:
            $text = 'Service Unavailable';
            break;
        case 504:
            $text = 'Gateway Time-out';
            break;
        case 505:
            $text = 'HTTP Version not supported';
            break;
        default:
            exit('Unknown request');
            break;
    }
    return $text;
}
