const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());

let todos = [];
let user = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    res.json(todos[todoIndex]);
  }
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
});

app.delete('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).send();
  }
});

app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, './files/'), (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve files' });
    }
    res.json(files);
  });
});


app.get('/file/:filename', (req, res) => {
  const filepath = path.join(__dirname, './files/', req.params.filename);

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.send(data);
  });
});

app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

function checkUserCreds(username, password) {
  for (let i = 0; i < user.length; i++) {
    if (user[i].username === username && user[i].password === password) {
      return user[i];
    }
  }
  return;
}
function findUserFromDB(userName) {
  for (let i = 0; i < user.length; i++) {
    if (user[i].username === userName) {
      return true;
    }
  }
  return false;
}
// user sign-up end-point
app.post('/signup', (req, res) => {
  findUserName = findUserFromDB(req.body.username);
  if (findUserName) {
    res.status(400).send('username already exists');
  } else {
    const newUser = {
      userId: Math.floor(Math.random() * 1000000),
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }
    user.push(newUser);
    res.status(200).json(user);
  }
})

app.post('/login', (req, res) => {
  let userExist = checkUserCreds(req.body.username, req.body.password);
  console.log(userExist);
  if (userExist) {
    const response = {
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      userId: userExist.userId,
      token: Math.floor(Math.random() * 1000000)
    }
    res.status(200).json(response);
  } else {
    res.status(401).send('Invalid creds');
  }
})

app.listen(3000, () =>{
    console.log(`app is running on port${3000}`);
})
