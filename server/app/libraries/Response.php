<?php

/*
This class handles server response
*/
class Response {

    public static function content($body, $code){
        $json = json_encode(["msg" => $body]);
        http_response_code($code);
        header('Content-Type: application/json');
        echo $json;
    }

}





