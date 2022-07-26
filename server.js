const express = requier('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
const db  = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },
    console.log('connected to movies_db')
);
app.get('/api/movies', (req,res) => {
    
})
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
