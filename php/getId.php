<?php

$server = "localhost";
$user = "u0913074_default";
$password = "tK4rC_Sz";
$databaseName = "u0913074_default";
$object = json_decode($_POST["jsonObj"]);

if($object->state == 1){
    $ID = -1; // ЭТУ ПЕРЕМЕННУЮ Я БУДУ СЧИТЫВАТЬ ПРИ ПОМОЩИ AJAX ИЗ JS.
    $link = mysqli_connect($server, $user, $password); // Соединение с БД...
    if ($link){ // Проверка соединения с сервером...
        $selected = mysqli_select_db($link, $databaseName); // Подключение к БД

        if($selected){
            mysqli_set_charset($link, "utf8"); // Задаем кодировку, кот будет использоваться при обмене данными с MySQL.

            $i = 0;
            while($i < 5){
                $ID = random_int(10000, 99999); // Генерация псевдослучайного числа

                $sql = "INSERT tblId(identity, timeDirection) VALUES(" . $ID . ", " . date("U") . ");";
                $result = mysqli_query($link, $sql); // Выполняем запрос
                
                if (!$result) {
                    $ID = -1;
                    // Повторная проверка соединения с сервером и БД:
                    $link = mysqli_connect($server, $user, $password);
                    $selected = mysqli_select_db($link, $databaseName);
                }
                else{
                    // СОЗДАЕМ ПАПКУ
                    $holderName = "../datas/IDHolders/id_".$ID;
                    $newHolder = mkdir($holderName, 0777);
                    
                    // СОЗДАЕМ ФАЙЛЫ В ПАПКЕ:
                    $fileName_list = fopen($holderName ."/List.datas", "w"); fwrite($fileName_list, ""); fclose($fileName_list);
                    $fileName_commands = fopen($holderName ."/Orders.datas", "w"); fclose($fileName_commands);
                    $fileName_counterList = fopen($holderName ."/counterList.datas", "w");
                    fwrite($fileName_counterList, "0");
                    fclose($fileName_counterList);
                    break;
                }
                $i++;
            }
            if($i == 5){
                $ID = -1;
            }
        }
    }
    echo $ID;   
}
else{
    $ID = $object->ID;
    
    $link = mysqli_connect($server, $user, $password); // Соединение с БД...
    if ($link){ // Проверка соединения с сервером...
        $selected = mysqli_select_db($link, $databaseName); // Подключение к БД

        if($selected){
            mysqli_set_charset($link, "utf8"); // Задаем кодировку, кот будет использоваться при обмене данными с MySQL.

            $sql = "UPDATE tblId SET timeDirection=" . date("U") . " WHERE identity=" . $ID . ";";
            $result = mysqli_query($link, $sql); // Выполняем запрос
        }
    }
}

?>