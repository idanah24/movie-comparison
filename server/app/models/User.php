<?php


class User {

    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }


    public function add($details) {
        $this->db->query("INSERT INTO users (name, password, is_admin) VALUES(:name, :password, :is_admin)", $details);
        try{
            $this->db->execute();
        }
        catch(PDOException $e){
            echo $e;
        }
        
    }

    public function findUser($name) {
        $this->db->query("SELECT * FROM users WHERE users.name = :name", ["name" => $name]);
        $this->db->execute();

        $result = $this->db->fetch();
        if($this->db->amountRetrived() == 0){
            $result = [];
        }
        return $result;
    }

}