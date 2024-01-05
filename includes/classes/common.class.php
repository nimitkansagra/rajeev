<?php
namespace Visa;

class Common
{

    public function __construct()
    {
        // NOP
    }

    public function generateRandomString($length)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $string = '';

        for ($i = 0; $i < $length; $i++) {
            $string .= $characters[mt_rand(0, strlen($characters) - 1)];
        }

        return $string;
    }

    public function generateRandomNumber($length)
    {
        $characters = '0123456789';
        $string = '';

        for ($i = 0; $i < $length; $i++) {
            $string .= $characters[mt_rand(0, strlen($characters) - 1)];
        }

        return $string;
    }

    public function generateOtp()
    {
        $characters = '0123456789';
        $string = '';

        for ($i = 0; $i < 4; $i++) {
            $string .= $characters[mt_rand(0, strlen($characters) - 1)];
        }

        return $string;
    }

    public function isDataValid($data)
    {
        if ($data !== null) {
            return true;
        } else {
            return false;
        }
    }

    public function generateId()
    {
        return self::generateRandomString(10);
    }

    public function check_pass($pass, $hash)
    {
        if (password_verify($pass, $hash)) {
            return true;
        } else {
            return false;
        }
    }

    public function pass_hash($pass)
    {
        return password_hash($pass, PASSWORD_BCRYPT);
    }

    function encryptString($string = '', $salt = 'LWT28YANM1Y3GWU3NZ6XAKVY5C7HCYX65EIM7BBAJKUJWOP6IB8KD0C0PR6F9WA1')
    {
        return openssl_encrypt($string, "AES-128-ECB", $salt);
    }

    function decryptString($encodedText = '', $salt = 'LWT28YANM1Y3GWU3NZ6XAKVY5C7HCYX65EIM7BBAJKUJWOP6IB8KD0C0PR6F9WA1')
    {
        return openssl_decrypt($encodedText, "AES-128-ECB", $salt);
    }
}
