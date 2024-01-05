<?php
namespace Visa;

include_once 'constant.php';

include_once DB_CLASS;
include_once DATA_CLASS;
include_once COMMON_CLASS;
include_once FUN_CLASS;

use Visa\Common as COMMON;
use Visa\Data as DATA;
use Visa\Database as DB;

$dbc           = new DB;
$app_data   = new DATA;
$app_common = new COMMON;

use Visa\Functions as FUN;
$app_fun = new FUN;
