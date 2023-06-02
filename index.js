const express = require('express')
const app = express()
const port = 3000
const USERS = []
const questions = [{
    title: "Larger number in array",
    description: "You have given an array, and you have to return the largest number in the array",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}]
const submissions = [{
    // Have to decide the structure of the json, where we will store user submission
}];

app.post('/signup', (req, res) => {
    // add logic to decode body
    // Body should have user email and password


    //Store email and password in the USERs array above only if the user email and password do not exist in the array
    // return back 200 status code to the client
    res.send('Hey there, I am a server and i am from route 1');

})

app.post('/login', (req, res) => {
    // add logic to decode body
    // Body should have user email and password


    // check if the user email exist in an array and password matched with the input password from the user and return 200 status code
    // And if the password is wrong then return 401 status code (Not authorize user)
    // If password is current also send a random string token in the response
    res.send('Hello world from route 2');
})

app.get('/questions', (req, res) => {
    // return the user all the questions in the array
    res.send();
})

app.get('/submissions', (req, res) => {
    // return the users submission for this problem
    res.send('Hello, question acceptted successgfully');
})

app.post('/submissions', (req, res) => {
    // let the user submit the problem. Randomly send accept and reject in the api response
    // Store the submission in the submission array.
    res.send('Hello, question acceptted successgfully');
});


// Hard todo
// Create a route that lets an admin to add a new problem
// And ensure that user is admin and not the normal user
app.listen(port, () => {
    console.log(`http server is running on port ${port}`);
})