<?php

class Movies extends Controller {

    private $movies;

    public function __construct()
    {
        $this->movies = $this->model('movie');
    }

    
    public function index(){
    }


    /*
        Mapping for /movies/create
        Method: POST
        sends form values to model, creating a new movie
    */
    public function create(){

        // TODO: Authenticate Admin here


        // Checking method
        if($_SERVER['REQUEST_METHOD'] != "POST"){
            Response::content("Invalid http request method", 405);
            return;
        }
        
        $data = process_request();

        // Checking request input
        if(!isset($data['name']) || !isset($data['imdb_url']) || !isset($data['rating'])){
            Response::content("Creation request missing critical input data", 400);
            return;
        }

        // Attempting database insertion
        $created = $this->movies->addMovie([
            'name' => $data['name'],
            'imdb_url' => $data['imdb_url'],
            'rating' => $data['rating']
        ]);


        if($created){
            Response::content("Movie created succesfully", 201);
        }
        else{
            Response::content("Failed to insert to database, movie already exists", 400);
        }
    }


    /*
        Mapping for /movies/get/{id}
        Method: GET
        returns movie by id if given, otherwise returns all movies
    */
    public function get($id = null){

        if($_SERVER['REQUEST_METHOD'] != 'GET'){
            Response::content("Invalid http request method!", 405);
            return;
        }

        if($id == null){
            $data = $this->movies->getAll();
        }
        else{
            $data = $this->movies->getById($id);
        }
        Response::content($data, 200);
        
    }

    /*
        Mapping for: /movies/update
        Method: PUT
        update an existing movie information
    */
    public function update($id){

        // TODO: Authenticate Admin here


        if($_SERVER['REQUEST_METHOD'] != "PUT"){
            Response::content("Invalid http request method!", 405);
            return;
        }

        $data = process_request();

        if(!isset($data) || empty($data)){
            // No update information given
            Response::content("Request dosen't contain update information", 400);
            return;
        }

        $updated = $this->movies->updateMovie($id, $data);
        if($updated){
            Response::content("Movie updated!", 200);
        }
        else{
            Response::content("Failed to update movie", 400);
        }
    }

    /*
        Mapping for: /movies/delete/{id}
        Method: DELETE
        deletes an existing movie from the database
    */
    public function delete($id){
        // TODO: Authenticate Admin here

        if($_SERVER['REQUEST_METHOD'] != "DELETE"){
            Response::content("Invalid http request method!", 405);
            return;
        }
        
        if($this->movies->deleteMovie($id)){
            Response::content("Movie deleted from database", 200);
        }
        else{
            Response::content("Failed to delete movie", 400);
        }
    }


    /*
        Mapping for: /movies/vote/{id}
        Method: PUT
        increment a given movie's votes(thumbs up action)
    */
    public function vote($id){
        // TODO: Authenticate User here
        // TODO: Check if user already voted


        if($_SERVER['REQUEST_METHOD'] != "PUT"){
            Response::content("Invalid http request method!", 405);
            return;
        }

        // Voting for movie
        $movie = $this->movies->getById($id);
        $voted = $this->movies->updateMovie($id, ['votes' => $movie['votes'] + 1]);

        // Responding according to result
        if($voted){
            Response::content("Voted successfully!", 200);
        }
        else{
            Response::content("Unable to vote for this movie", 400);
        }
    }



}

