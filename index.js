const express = require('express');
const crypto = require('crypto');
const app = express()
const port = 3000
const users = [];
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
    const { email, password } = req.body;

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
    const newUser = { email, password };
    users.push(newUser);
    console.log('this is the users array',users);

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
      return res.status(200).json({ message: 'Login successful', token });
    }
  
    // If the user does not exist or the password is incorrect
    return res.status(401).json({ error: 'Invalid credentials' });
  });

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

// Also try to implement templates for for your UI