<?php

    $object = json_decode($_POST["jsonObj"]);
    
    $select = $object->select;
    $email = $object->email;
    $textArea = $object->textArea;
    $userName = $object->userName;

    $message =  "
                <html>
                <head>
                <title></title>
                </head>
                <body>
                <p>".$textArea."</p>
                <hr>
				<pre><b>Отправитель:</b>  " .$userName. "</pre>
                <pre><b>Контакты отправителя:</b>  " .$email. "</pre>
                </body>
                </html>
                ";
    
    $header = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\nFrom site: invizzz@invizzz.com\r\n";

    $success = mail("invizzz@invizzz.com", $select, $message, iconv('utf-8', 'windows-1251', $header));
    
?>