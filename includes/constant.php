<?php
namespace Visa;

defineConstant('ABSPATH', dirname(dirname(__FILE__)));
defineConstant('INCPATH', ABSPATH . '/includes/');
defineConstant('CLSPATH', INCPATH . 'classes/');
defineConstant('ASTPATH', ABSPATH . '/assets/');
defineConstant('TMPPATH', ABSPATH . '/templates/');

defineConstant('DB_CLASS', CLSPATH . 'database.class.php');
defineConstant('DATA_CLASS', CLSPATH . 'data.class.php');
defineConstant('COMMON_CLASS', CLSPATH . 'common.class.php');
defineConstant('FUN_CLASS', CLSPATH . 'function.class.php');


defineConstant('TABLE_PREFIX', 'crafty_');

global $dbc;
global $app_data;
global $app_common;
global $app_fun;

function defineConstant($path, $value)
{
    if (!defined($path)) {
        define($path, $value);
    }
}
