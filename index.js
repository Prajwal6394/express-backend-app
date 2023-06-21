const express = require('express');
const crypto = require('crypto');
const app = express()
const port = 3000
const users = [];
const problems = [];
app.use(express.json());
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
    // Extract the email and password from the request body
    const { email, password, isAdmin } = req.body;

    // Check if the email or password is missing
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user already exists in the users array
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    // Create a new user object and add it to the users array
    const newUser = { email, password, isAdmin };
    users.push(newUser);
    console.log('this is the users array', users);

    // Return a success message to the client
    res.status(200).json({ message: 'Signup successful' });

})

app.post('/login', (req, res) => {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Check if the email or password is missing
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user in the users array based on the provided email
    const user = users.find((user) => user.email === email);

    // Check if the user exists and the password matches
    if (user && user.password === password) {
        // Generate a random token (e.g., using the 'uuid' library)
        const token = crypto.randomBytes(16).toString('hex');

        // Send the token in the response
        return res.status(200).json({ message: 'Login successful', token, isAdmin: user.isAdmin });
    }

    // If the user does not exist or the password is incorrect
    return res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/questions', (req, res) => {
    // return the user all the questions in the array
    res.json(questions);
})

app.get('/submissions', (req, res) => {
    // Extract the problem ID from the request query parameters
    const problemId = req.query.problemId;

    // Filter the submissions array based on the problem ID
    const userSubmissions = submissions.filter(submission => submission.problemId === problemId);

    // Return the user's submissions for the specified problem
    res.status(200).json(userSubmissions);
});

app.post('/submissions', (req, res) => {
    // Generate a random response to simulate accepting or rejecting the submission
    const randomResponse = Math.random() < 0.5 ? 'accept' : 'reject';

    // Create a submission object
    const submission = {
        problemId: req.body.problemId,
        code: req.body.code,
        response: randomResponse
    };

    // Store the submission in the submissions array
    submissions.push(submission);
    console.log(submissions);

    // Send a response to the client
    res.status(200).json({ message: 'Submission received', response: randomResponse });
});


// Hard todo
// Create a route that lets an admin to add a new problem
// And ensure that user is admin and not the normal user

app.post('/problems', (req, res) => {
    // Check if the user making the request is an admin
    const user = users.find((user) => user.email === req.body.email && user.password === req.body.password);
    console.log('this is the user' ,user);
    if (!user || !user.isAdmin) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    // Add the new problem to the problems array
    const newProblem = {
        title: req.body.title,
        description: req.body.description
    };
    problems.push(newProblem);
    console.log(newProblem);
    // Return a success message
    res.status(200).json({ message: 'Problem added successfully', newProblem });
});
app.listen(port, () => {
    console.log(`http server is running on port ${port}`);
})


