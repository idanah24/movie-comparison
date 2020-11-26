<?php


class Movie {

    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }


    /*
        This method takes in assoc array with movie details and adds to database
    */
    public function addMovie($details){
        $this->db->query('INSERT INTO movies (name, imdb_url, rating) VALUES (:name, :imdb_url, :rating)', $details);
        try{
            $this->db->execute();
        }catch(PDOException $e){
            return false;
        }
        return true;
    }


    public function getAll(){
        $this->db->query('SELECT * FROM movies');
        $this->db->execute();
        $all_movies = $this->db->fetch('all');
        return $all_movies;
    }

    public function getById($id){
        $this->db->query('SELECT * FROM movies WHERE movies.id=:id', ['id' => $id]);
        $this->db->execute();
        $result = $this->db->fetch();
        if($this->db->amountRetrived() == 0){
            $result = [];
        }
        return $result;
    }

    public function updateMovie($id, $details){
        if(count($this->getById($id)) == 0){
            // Movie dosen't exist
            return;
        }

        // Set up query and bindings
        $query = 'UPDATE movies SET ';

        foreach ($details as $key => $value) {
            $query = $query . 'movies.' . $key . ' = :' . $key . ', ';
        }
        $query = rtrim($query, ', ');
        $query = $query . ' WHERE movies.id = :id';
        $details = array_merge($details, array('id' => $id));

        // Execute update
        $this->db->query($query, $details);
        $this->db->execute();

    }

    public function deleteMovie($id){
        $this->db->query('DELETE FROM movies where movies.id = :id', ['id' => $id]);
        $this->db->execute();
    }

    

}