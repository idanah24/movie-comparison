<?php

/*
 * App Core Class
 * Creates URL & loads core controller
 * URL FORMAT - /controller/method/params
 */

class Core {

    protected $currentController = 'Publicc';
    protected $currentMethod = 'Index';
    protected $params = [];

    public function __construct() {

        $url = $this->getUrl();

//        Look in Controllers for first value
        if (file_exists('../app/controllers/' . ucwords($url[0]) . '.php')) {
//            If exists, set as current controller
            $this->currentController = ucwords($url[0]);
//            Unset 0 index
            unset($url[0]);
        }
//        Require the controller
        require_once '../app/controllers/' . $this->currentController . '.php';

//        Instantiate controller class
        $this->currentController = new $this->currentController;

//        Check for second part of URL
        if (isset($url[1])) {
//            Check to see if method exist in controller
            if (method_exists($this->currentController, $url[1])) {
                $this->currentMethod = $url[1];

//                Unset 1 index
                unset($url[1]);
            }
        }

//        Get params
        $this->params = $url ? array_values($url) : [];

//        Call a callback with array of params
        call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
    }

    public function getUrl() {
        $filtered_url = filter_input(INPUT_GET, 'url');
        if (isset($filtered_url)) {
            $url = rtrim($filtered_url, '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        } else {
            $url[] = 'Pages';
            return $url;
        }
    }

}
