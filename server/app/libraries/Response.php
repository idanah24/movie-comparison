<?php

/*
This class handles server response
*/
class Response
{

    public static function content($body, $code)
    {
        if (is_string($body)) {
            // For a string message response
            $json = json_encode(["msg" => $body]);
        } else {
            // For a data object response
            $json = json_encode($body);
        }

        http_response_code($code);
        echo $json;
    }
}
