<?php
namespace Visa;

if (!isset($_SESSION)) session_start();
class App
{

    private static $con;
    private static $db;
    private static $cmn;

    public function __construct()
    {
        self::$db  = $GLOBALS['dbc'];
        self::$con = self::$db->connect();
        self::$cmn = $GLOBALS['crafty_common'];
    }
    
    // App Functions
    
    public function getKeywordsFromBusiness($id) {
        
        return "true";
        
        // $query = 'SELECT `name` FROM `crafty_business` WHERE `uid` = ? AND `visibility` = 1';

        // $sql = self::$con->prepare($query);
        // $sql->execute([$id]);
        // $result = self::cleanData($sql->fetchAll());
        
        // $keywords = [];
        
        // for($i=0;$i<count($result);$i++) {
        //     $k = explode(" ",$result[$i]);
        //     $keywords = array_merge($k, $keywords);
        // }
        
        // print_r($keywords);
        
        // return $keywords;
    }

    public function cleanData($result)
    {
        for ($i = 0; $i < count($result); $i++) {
            for ($j = 0; $j < count($result[$i]); $j++) {
                unset($result[$i][$j]);
            }
        }
        return $result;
    }
    
    public function cleanDataSingle($result)
    {
        for ($j = 0; $j < count($result); $j++) {
                unset($result[$j]);
            }
        return $result;
    }
}
