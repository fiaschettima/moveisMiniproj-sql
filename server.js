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
app.get('/api/movies', (req, res) => {

    db.query('SELECT * FROM movies', function(err, result) {
        if (err) {
            console.log(err)
        }
        return res.json(result)

    })

    console.log('test')


})

app.post('/api/add-movie', (req, resp) => {

    const { movie_name } = req.body;

    db.query(`INSERT INTO movies (movie_name) VALUES ('${movie_name}')`, function(err, result) {
        if (err) {
            console.log(err)
        }
        console.log('movie added')

    })

})



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});