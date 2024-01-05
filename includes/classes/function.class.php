<?php
namespace Visa;

if (!isset($_SESSION)) {
    session_start();
}

class Functions
{

    private static $con;
    private static $db;
    private static $cmn;

    public function __construct()
    {
        self::$db = $GLOBALS['dbc'];
        self::$con = self::$db->connect();
        self::$cmn = $GLOBALS['app_common'];
    }

    public function closeConnection()
    {
        // self::$con->close();
        // self::$con = null;
    }

    public function getUserBySession($csrf)
    {
        $query = 'SELECT * FROM `visa_user_login` WHERE `csrftoken` = ? LIMIT 1';
        $sql = self::$con->prepare($query);
        $sql->execute([$csrf]);
        $result = $sql->fetch(\PDO::FETCH_ASSOC);
        self::closeConnection();
        return $result;
    }

    public function userIDBySession($csrf)
    {
    
        $query = "SELECT `user_id` as id FROM `visa_user_login` WHERE `csrftoken` = ? LIMIT 1";

        $sql = self::$con->prepare($query);
        $sql->execute([
            $csrf
        ]);
        
        $result = $sql->fetch(\PDO::FETCH_ASSOC);

        self::closeConnection();
        return $result["id"];
    }

    public function getUserDetails($param)
    {
        $uid = self::userIDBySession($param->getValue('token'));
        $res = [];

        if ($uid !== false) {
            try {
                $query = "SELECT * FROM `visa_users` WHERE `id` = :userID";
                $sql->bindParam(':userID', $uid, \PDO::PARAM_INT);
                $sql->execute();        
                $result = $sql->fetch(\PDO::FETCH_ASSOC);
        
                if (!$result) {
                    $param->setValue('status', false);
                    $param->setValue('result', null);
                } else {
                    $param->setValue('status', true);
                    $param->setValue('result', $result);
                }
                self::closeConnection();
            } catch (\PDOException $e) {
                $param->setValue('status', false);
                $param->setValue('result', null);
            }
        } else {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }
        return $param;
    }

    public function getUserApplications($param)
    {
        $uid = self::userIDBySession($param->getValue('token'));
        $res = [];

        if ($uid !== false) {
            try {
                $query = "SELECT * FROM `visa_application` WHERE `user_id` = :userID ORDER BY `id` DESC";
                $sql->bindParam(':userID', $uid, \PDO::PARAM_INT);
                $sql->execute();        
                $result = $sql->fetchAll(\PDO::FETCH_ASSOC);
        
                if (!$result) {
                    $param->setValue('status', false);
                    $param->setValue('result', null);
                } else {
                    $param->setValue('status', true);
                    $param->setValue('result', $result);
                }
                self::closeConnection();
            } catch (\PDOException $e) {
                $param->setValue('status', false);
                $param->setValue('result', null);
            }
        } else {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }
        return $param;
    }

    public function getUserApplication($param)
    {
        $uid = self::userIDBySession($param->getValue('token'));
        $res = [];

        if ($uid !== false) {
            try {
                $query = "SELECT * FROM `visa_application` WHERE `id` = :applicationID LIMIT 1";
                $sql->bindParam(':applicationID', $param->getValue('applicationID'), \PDO::PARAM_INT);
                $sql->execute();        
                $result = $sql->fetch(\PDO::FETCH_ASSOC);
        
                if (!$result) {
                    $param->setValue('status', false);
                    $param->setValue('result', null);
                } else {
                    $param->setValue('status', true);
                    $param->setValue('result', $result);
                }
                self::closeConnection();
            } catch (\PDOException $e) {
                $param->setValue('status', false);
                $param->setValue('result', null);
            }
        } else {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }
        return $param;
    }

    public function getUserSingleInvoice($param)
    {
        try {
            //$query = "SELECT * FROM `visa_invoice` WHERE `id` = ? AND `user_id` = ? LIMIT 1";
            $query = "SELECT * FROM `visa_invoice` WHERE `id` = ? LIMIT 1";
            $sql = self::$con->prepare($query);
            $sql->execute([
                $param->getValue('invoiceId'),
                //$param->getValue('user')
            ]);        
            $result = $sql->fetch(\PDO::FETCH_ASSOC);
        
            if (!$result) {
                $param->setValue('status', false);
                $param->setValue('result', null);
            } else {
                $param->setValue('status', true);
                $invoice_item = $result;
                $user_data = self::getUserData($result['user_id']);
                $user_application = self::getApplicationById($result['id']);
                $category_items = self::getInvoiceItems($result['id']);
                $invoice_data = self::getInvoiceData($result['id']);
                $invoice_item['user'] = $user_data;
                $invoice_item['invoice'] = $invoice_data;
                $invoice_item['application'] = $user_application;
                $invoice_item['items'] = $category_items;

                $applicationTitle = $user_application['application_id'] . ' ' . strtoupper($user_data['user_name']) . ' ' . $user_application['category'];
                $invoice_item['application']['title'] = $applicationTitle;

                $param->setValue('result', $invoice_item);
            }
        
            self::closeConnection();
        } catch (\PDOException $e) {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }
        
        return $param;
    }

    public function getUserAllInvoices($param)
    {
        try {
            // $query = "SELECT * FROM `visa_invoice` WHERE `user_id` = ?";
            //SELECT * FROM `visa_invoice` WHERE `user_id` IN (SELECT `id` FROM `visa_users` WHERE `user_id` = 'CSC-Z8K4J6-2023-112641');
            $query = "SELECT * FROM `visa_invoice` WHERE `user_id` IN (SELECT `id` FROM `visa_users` WHERE `user_id` = ?)";
            
            $sql = self::$con->prepare($query);
            $sql->execute([
                $param->getValue('user')
            ]);        
            $result = $sql->fetchAll(\PDO::FETCH_ASSOC);
        
            if (!$result) {
                $param->setValue('status', false);
                $param->setValue('result', null);
            } else {

                $invoice_all = [];
                $param->setValue('status', true);
                $rowCount = count($result);
    
                for ($i = 0; $i < $rowCount; $i++) {
                    $invoice_item = $result[$i];
                    //$user_data = self::getUserData($param->getValue('user'));
                    $user_data = self::getUserData($result[$i]['user_id']);
                    $user_application = self::getApplicationById($result[$i]['id']);
                    $category_items = self::getInvoiceItems($result[$i]['id']);
                    $invoice_data = self::getInvoiceData($result[$i]['id']);
                    $invoice_item['user'] = $user_data;
                    $invoice_item['invoice'] = $invoice_data;
                    $invoice_item['application'] = $user_application;
                    $invoice_item['items'] = $category_items;
                    $applicationTitle = $user_application['application_id'] . ' ' . strtoupper($user_data['user_name']) . ' ' . $user_application['category'];
                    $invoice_item['application']['title'] = $applicationTitle;
                    array_push($invoice_all, $invoice_item);
                }

                $param->setValue('result', $invoice_all);
            }
        
            self::closeConnection();
        } catch (\PDOException $e) {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }
        
        return $param;
    }

    public function getUserInvoiceById($param)
    {
        $uid = self::userIDBySession($param->getValue('token'));
        $res = [];

        if ($uid !== false) {
            try {
                $query = "SELECT * FROM `visa_invoice` WHERE `id` = :invoiceID AND `user_id` = :userID LIMIT 1";
                $sql->bindParam(':invoiceID', $param->getValue('invoiceID'), \PDO::PARAM_INT);
                $sql->bindParam(':userID', $uid, \PDO::PARAM_INT);
                $sql->execute();        
                $result = $sql->fetch(\PDO::FETCH_ASSOC);

                $invoiceItems = self::getInvoiceItems($param->getValue('invoiceID'));
                $result['items'] =  $invoiceItems;
        
                if (!$result) {
                    $param->setValue('status', false);
                    $param->setValue('result', null);
                } else {
                    $param->setValue('status', true);
                    $param->setValue('result', $result);
                }
                self::closeConnection();
            } catch (\PDOException $e) {
                $param->setValue('status', false);
                $param->setValue('result', null);
            }
        } else {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }
        return $param;
    }


    public function getInvoiceItems($id)
    {
        try {
            $query = "SELECT vi.*, vc.* FROM `visa_invoice_items` vi JOIN visa_category vc ON vi.category_id = vc.id WHERE `invoice_id` = ?";
            $sql = self::$con->prepare($query);
            $sql->execute([
                $id
            ]);       
            $result = $sql->fetchAll(\PDO::FETCH_ASSOC);
    
            if ($result) {
                $res['data'] = $result;
                $rowCount = count($result);
                $invoice_all = [];
                $sum = 0;

                /*for ($i = 0; $i < $rowCount; $i++) {
                    $invoice_item = $result[$i];
                    $sum = $sum + $invoice_item['price'];
                    array_push($invoice_all, $invoice_item);
                }*/
                
                $res['sum'] = $sum;

            } else {
                $res['data'] = null;
            }
            self::closeConnection();
        } catch (\PDOException $e) {
            $res['data'] = null;
        }

        return $res;
    }

    public function getInvoiceData($id)
    {
        try {
            $query = "SELECT * FROM `visa_invoice` WHERE `id` = ?";
            $sql = self::$con->prepare($query);
            $sql->execute([
                $id
            ]);       
            $result = $sql->fetch(\PDO::FETCH_ASSOC);
    
            if ($result) {
                $res['data'] = $result;
            } else {
                $res['data'] = null;
            }
            self::closeConnection();
        } catch (\PDOException $e) {
            $res['data'] = null;
        }

        return $res['data'];
    }


    public function getUserData($id)
    {
        try {
            $query = "SELECT * FROM `visa_users` WHERE `id` = ? LIMIT 1";
            $sql = self::$con->prepare($query);
            $sql->execute([
                $id
            ]);       
            $result = $sql->fetch(\PDO::FETCH_ASSOC);
    
            if ($result) {
                unset($result['user_password']);
                $res['data'] = $result;
            } else {
                $res['data'] = null;
            }
            self::closeConnection();
        } catch (\PDOException $e) {
            $res['data'] = null;
        }

        return $res['data'];
    }

    public function getApplicationById($id)
    {
        try {
            $query = "SELECT va.*, vs.*, vc.* FROM visa_application va JOIN visa_status vs ON va.status_id = vs.id JOIN visa_category vc ON va.category_id = vc.id WHERE va.invoice_id = ? LIMIT 1;";
            $sql = self::$con->prepare($query);
            $sql->execute([$id]);        
            $result = $sql->fetch(\PDO::FETCH_ASSOC);
            if ($result) {
                $res['data'] = $result;
            } else {
                $res['data'] = null;
            }
            self::closeConnection();
        } catch (\PDOException $e) {
            $res['data'] = null;
        }

        return $res['data'];
    }

    public function addUserLoginHistory($uid, $csrftoken)
    {
        try {
            $query = "INSERT INTO `visa_user_login`(`user_id`,`csrftoken`) VALUES(?,?)";
            $sql = self::$con->prepare($query);
            $sql->execute([
                $uid,
                $csrftoken
            ]);        
    
            self::closeConnection();
            if (!$sql) {
                return true;
            } else {
                return false;
            }
            
        } catch (\PDOException $e) {
            return false;
        }
    }
    
    public function addNewUser($param)
    {
        $tmpId = "CSC-Z8K4J6-2023-";
        $userID = $tmpId . self::$cmn->generateRandomNumber(6);
        $csrf = self::$cmn->generateRandomString(16);

        $query = 'INSERT INTO `visa_users  `(
                `user_id`,
                `user_username`,
                `user_first_name`,
                `user_last_name`,
                `user_mobile`,
                `user_cc`,
                `user_password`
            ) VALUES (:userId, :username, :userFirst, :userLast, :userMobile, :userCc, :userPass)';

        $sql = self::$con->prepare($query);
        $sql->bindValue(':userId', $userID, \PDO::PARAM_STR);
        $sql->bindValue(':username', $userID, \PDO::PARAM_STR);
        $sql->bindValue(':userFirst', $userID, \PDO::PARAM_STR);
        $sql->bindValue(':userLast', $userID, \PDO::PARAM_STR);
        $sql->bindValue(':userMobile', $userID, \PDO::PARAM_STR);
        $sql->bindValue(':userCc', $userID, \PDO::PARAM_STR);
        $sql->bindValue(':limit', $itemsPerPage, \PDO::PARAM_INT);

        $sql = self::$con->prepare($query);
        $sql->execute([
            $user["user_id"],
            $user["user_username"],
            $user["user_first_name"],
            $user["user_email"],
            self::$cmn->pass_hash($user["user_password"]),
            self::setSubscription($user["user_email"]),
        ]);

        $pass = $user["user_password"];

        self::addUserInfo($param, $user);
        unset($user["user_password"]);
        $param->setValue('result', $user);
        $param->setValue('status', true);
        self::sendWelcomeEmail($user["user_email"], $user["user_id"], $pass);
        $lurl = "https://crafty.planckstudio.in/dashboard/activity/register/" . $user["user_id"];
        return $param;
    }

    public function checkUserLogin($param)
    {

        $csrf = self::$cmn->generateRandomString(16);
        $query = 'SELECT * FROM `visa_users` WHERE `user_username` = ? LIMIT 1';

        $sql = self::$con->prepare($query);

        $sql->execute([
            $param->getValue('username')
        ]);

        $result = $sql->fetch(\PDO::FETCH_ASSOC);

        if($result != null) {
            if (md5($param->getValue('password')) == $result['user_password']) {
                unset($result["password"]);
                $result['csrftoken'] =  $csrf;
                self::addUserLoginHistory($result['id'], $csrf);
                $param->setValue('result', $result);
            } else {
                $param->setValue('status', false);
                $param->setValue('result', null);
            }
        } else {
            $param->setValue('status', false);
            $param->setValue('result', null);
        }

        
        @self::closeConnection();
        return $param;
    }
}
