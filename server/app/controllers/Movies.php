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
        // Checking method
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            Response::content("Invalid http method", 405);
            return;
        }
        
        $data = process_request();

        // Checking request input
        if(!isset($data['name']) || !isset($data['imdb_url']) || !isset($data['rating'])){
            Response::content("Creation request misses critical input data", 400);
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

        if($id == null){
            echo json_encode($this->movies->getAll());
        }
        else{
            echo json_encode($this->movies->getById($id));
        }
        
    }

    /*
        Mapping for: /movies/update
        Method: PUT
        update an existing movie information
    */
    public function update($id){
        // TODO: Change method to handle PUT request
        $this->movies->updateMovie($id, $_POST);
    }

    /*
        Mapping for: /movies/delete/{id}
        Method: DELETE
        deletes an existing movie from the database
    */
    public function delete($id){
        $this->movies->deleteMovie($id);
    }


    /*
        Mapping for: /movies/vote/{id}
        Method: PUT
        increment a given movie's votes(thumbs up action)
    */
    public function vote($id){
        $movie = $this->movies->getById($id);
        $this->movies->updateMovie($id, ['votes' => $movie['votes'] + 1]);
    }



}








