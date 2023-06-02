const express = require('express')
const app = express()
const port = 3000
app.get('/route1', (req, res) =>{
    res.send('Hey there, I am a server and i am from route 1');
})

app.get('/route2', (req, res) =>{
    res.send('Hello world from route 2');
})

app.listen(port, () =>{
    console.log(`http server is running on port ${port}`);
})