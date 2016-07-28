<?php

require_once 'db_connect.php';
require_once 'user.php';
require_once 'item.php';

$user = User::authorize();
$item = new Item($mysql_db);
$item->loadByItemId(@$_POST['name']);
if ($item->authorize($user)) {
	$item->setStatus(1);
	$item->save();
	Response::flush(1, 'Item activated successfully');
}
