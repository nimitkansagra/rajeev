<?php
namespace Visa;
use \PDO as PDO;

class Database extends PDO {
    
    private static $dns;
    private static $user;
    private static $pass;
    private static $host;
    private static $db;
    private static $con;
    private static $port;

    public function __construct() {
        // NOP
    }

    public static function connect() {
        self::$host = $_SERVER["DB_HOST"];
        self::$db = $_SERVER["DB_DB"];
        self::$port = $_SERVER["DB_PORT"];
        self::$dns = "mysql:host=".self::$host.";port=".self::$port.";dbname=".self::$db.";";
        self::$user = $_SERVER["DB_USER"];
        self::$pass = $_SERVER["DB_PASS"];
        self::$con = NULL;
    
        if ( self::$con == NULL ) {
            try {
                self::$con = new PDO( self::$dns, self::$user, self::$pass );
                self::$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$con->exec("SET NAMES utf8mb4");
                return self::$con;
            } catch( PDOException $e ) {
                return "Failed to connect database: " . $e->getMessage();
            }
        }
    }
    

    public static function close() {
        self::$con = NULL;
    }

    public static function execute( $query ) {
        try {
            self::connect();
            self::$con->exec($query);
            // self::close();
        } catch( PDOException $e ) {
            return "Failed to execute query: " . $e->getMessage();
        }
    }

    public static function fetch( $query, $all = FALSE ) {
        try {
            self::connect();

            if ( $all ) {
                return self::$con->query($query)->fetchAll();
            } else {
                return self::$con->query($query)->fetch();
            }

            // self::close();
        } catch( PDOException $e ) {
            return "Failed to fetch record(s): " . $e->getMessage();
        }
    }
}
?>