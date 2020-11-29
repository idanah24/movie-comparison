<?php


class Users extends Controller
{

    private $users;

    public function __construct()
    {
        $this->users = $this->model('user');
    }


    // For my personal use, delete before production
    public function create()
    {
        
        $admin = [
            "name" => "Admin",
            "password" => password_hash("uK4*Nn(7`'CJ?3D@", PASSWORD_DEFAULT),
            "is_admin" => true
        ];

        $user = [
            "name" => "User",
            "password" => password_hash("3]sBB47<tdWvrFK}", PASSWORD_DEFAULT),
            "is_admin" => false
        ];

        $this->users->add($admin);
        $this->users->add($user);
        echo "Users added";
    }

    public function login() {

        $data = process_request();
        $user = $this->users->findUser($data['name']);

        if(!empty($user) && password_verify($data['password'], $user['password'])){
            // Correct credentials
            echo "Verified";
        }
        else{
            // Incorrect
            Response::content("Incorrect username/password", 400);
        }


    }




}
