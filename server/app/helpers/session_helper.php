<?php

session_start();

//  Flash message helper
//  Usage:
//  In controller: flash('register_sucess', 'You are now registered and can log in')
//  In view: echo flash(''register_success'); 
function flash($name = '', $message = '', $class = 'alert alert-success') {

    if (!empty($name)) {

        if (!empty($message) && empty($_SESSION[$name])) {


            if (!empty($_SESSION[$name . '_class'])) {
                unset($_SESSION[$name . '_class']);
            }

            $_SESSION[$name] = $message;
            $_SESSION[$name . '_class'] = $class;
        } else if (empty($message) && !empty($_SESSION[$name])) {
            $class = !empty($_SESSION[$name . '_class']) ? $_SESSION[$name . '_class'] : '';
            echo '<div class="' . $class . '" id="msg-flash">' . $_SESSION[$name] . '</div>';
            unset($_SESSION[$name]);
            unset($_SESSION[$name . '_class']);
        }
    }
}

//    Checking if there is a user connected
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}


function process_request(){
    $data = file_get_contents('php://input');
    return json_decode($data, true);
}
