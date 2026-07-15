import express from 'express'
import pg from 'pg'
const app = express()
const port = 3000
const { Pool } = pg

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
const pool = new Pool({
    user: 'postgres',         
    host: 'localhost',        
    database: 'mahasiswa',    
    password: '1234',
    port: 5432,               
});

app.use(express.json());

app.get('/', (req, res) => {
    console.log("Test DATA :");
    pool.query('SELECT * FROM biodata')
        .then(testData => {
            console.log(testData.rows);
            res.json(testData.rows);
        })
        .catch(err => {
            console.error("Error executing query", err.stack);
            res.status(500).send("Database Error");
        })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})