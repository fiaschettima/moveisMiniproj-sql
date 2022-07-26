const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },
    console.log('connected to movies_db')
);
// ----------------------------------Returns JSON of all movies in movies table-------------------------------
app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', function(err, result) {
        if (err) {
            console.log(err)
        }
        return res.json(result)
    })
})
// ----------------------------------Returns JSON of all reviews in reviews table-------------------------------
app.get('/api/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', function(err, result) {
        if (err) {
            console.log(err)
        }
        return res.json(result)
    })
})
// ----------------------------------Add  movie to movies table------------------------------------
app.post('/api/add-movie', (req, resp) => {
    const { movie_name } = req.body;
    db.query(`INSERT INTO movies (movie_name) VALUES ('${movie_name}')`, function(err, result) {
        if (err) {
            console.log(err)
        }
        return console.log('movie added')
    })

})
// ----------------------------------Add  review to reviews table------------------------------------
app.put('/api/update-review', (req, res) => {
    const { movie_id, review } = req.body;
    console.log(`${movie_id} -------- ${review}`);
    db.query(`INSERT INTO reviews (movie_id, review) VALUES (${movie_id}, '${review}')`, (err, result) =>{
        if(err){
            console.log(err)
        }
        return console.log('Review Added', result)
    })
})
// ----------------------------------Removes  movie from movies table------------------------------------
app.delete('/api/movies/:id', (req,res) => {
    const delMovie = req.params.id;
    db.query(`DELETE FROM movies WHERE id = ?`, delMovie, (err, result) => {
        if(err){
            console.log(err)
        }
        return console.log(`Movie with id ${delMovie} was deleted from the movies table`);
    })
})

// ----------------------------------Starts server on PORT------------------------------------
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});