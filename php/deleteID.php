<?php

// Рекурсивное удаление заполненной директории:
function recursiveRemoveDir($dir) {
    // В PHP добавлением дополнительно параметра GLOB_BRACE для glob() появляется возможность удалить и скрытые файлы в том числе, например такие как .htaccess.
	$includes = glob($dir.'/{,.}*', GLOB_BRACE);
	$systemDots = preg_grep('/\.+$/', $includes);

	foreach ($systemDots as $index => $dot) {
		unset($includes[$index]);
	}
    
	foreach ($includes as $include) {
		if(is_dir($include) && !is_link($include)) {// Проверяем файл или директория...
			recursiveRemoveDir($include);
		}
		else {
			unlink($include); // Функция удаления файла.
		}
	}
    
	rmdir($dir);
}


$bfSelect = true;
$bfDelete = true;

$server = "localhost";
$user = "u0913074_default";
$password = "tK4rC_Sz";
$databaseName = "u0913074_default";

$ID = $_POST["ID"];
$link = mysqli_connect($server, $user, $password); // Соединение с БД...

if ($link){ // Проверка соединения с сервером...
    $selected = mysqli_select_db($link, $databaseName); // Подключение к БД
    
    if($selected){
        mysqli_set_charset($link, "utf8"); // Задаем кодировку, кот будет использоваться при обмене данными с MySQL.
        
        while($bfSelect){
            $sql = "SELECT timeDirection FROM tblId WHERE identity='" . $ID . "'";
            $result = mysqli_query($link, $sql); // Выполняем запрос
            if (!$result) {
                // Повторная попытка соединения с сервером и БД:
                $link = mysqli_connect($server, $user, $password);
                $selected = mysqli_select_db($link, $databaseName);
            }
            else{
                    $workTime = date("U");
                    $lastTime = mysqli_fetch_array($result);
                    $different = abs($workTime - $lastTime[0]); // Разница по модулю.
                    if($different > 30){
                        while($bfDelete){
                            $sqlDel = "DELETE FROM tblId WHERE identity='" . $ID . "'";
                            $result = mysqli_query($link, $sqlDel); // Выполняем запрос
                            if (!$result) {
                                // Повторная попытка соединения с сервером и БД:
                                $link = mysqli_connect($server, $user, $password);
                                $selected = mysqli_select_db($link, $databaseName);
                            }
                            else{
                                $holderName = "../datas/IDHolders/id_" . $ID;
                                recursiveRemoveDir($holderName);
                                
                                $bfSelect = false;
                                $bfDelete = false;
                            }
                            sleep(1);
                        }
                    }
            }
            sleep(1);
        }
    }
}

?>