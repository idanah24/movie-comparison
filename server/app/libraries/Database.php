<?php


/**
 * Class Database
 * Creates connection to MySQL database
 * Prepares and executes queries
 */



 class Database{

    private $hostName = DB_HOST;
    private $dbName = DB_NAME;
    private $userName = DB_USER;
    private $password = DB_PASS;
    private $conn = null;
    private $stmt = null;

    public function __construct()
    {
        // Create DSN string
        $dsn = 'mysql:host=' . $this->hostName . ';dbname=' . $this->dbName;

        
        try{
            // Try to make connection
            $this->conn = new PDO($dsn, $this->userName, $this->password);
            // Set connection errors type to exceptions
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Setting fetch mode to associative array
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            die('Database connection error: ' . $e->getMessage());
        }
    }

    // Destructor, closing DB connection
    public function __destruct()
    {
        if($this->conn != null){
            $this->conn = null;
        }
    }


    // Deremine bind value type
    private function determineType($variable){
        switch(true){

            case is_null($variable): return PDO::PARAM_NULL;
            case is_int($variable): return PDO::PARAM_INT;
            case is_string($variable): return PDO::PARAM_STR;
            case is_bool($variable): return PDO::PARAM_BOOL;
            default: return PDO::PARAM_STR;

        }
    }

    // Takes in array where keys are parameters and values are variables binds values to parameters
    // For example bind([':name' => $name])
    private function bind($binds){
        foreach($binds as $param => $value){
            $this->stmt->bindValue($param, $value, $this->determineType($value));
        }
    }

    // Set SQL query and bind parameters
    public function query($query, $binds = []){
        $this->stmt = $this->conn->prepare($query);
        if(!empty($binds)){
            $this->bind($binds);
        }
        
    }

    // Execute a ready SQL statement - returns boolean
    public function execute(){
        return $this->stmt->execute();
    }

    // Execute query and return result - for SELECT statements
    public function fetch($mode = 'single'){
        $this->execute();
        if($mode == 'single'){
            return $this->stmt->fetch();
        }
        else{
            return $this->stmt->fetchAll();
        }
    }

    // Get the amount of rows retrived from last statement
    public function amountRetrived(){
        return $this->stmt->rowCount();
    }

 }

