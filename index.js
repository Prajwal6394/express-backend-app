const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());

let todos = [];
let users = [];

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

app.post("/signup", (req, res) => {
  var user = req.body;
  let userAlreadyExists = false;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === user.email) {
        userAlreadyExists = true;
        break;
    }
  }
  if (userAlreadyExists) {
    res.sendStatus(400);
  } else {
    users.push(user);
    res.status(201).send("Signup successful");
  }
});

app.post("/login", (req, res) => {
  var user = req.body;
  let userFound = null;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
        userFound = users[i];
        break;
    }
  }

  if (userFound) {
    res.json({
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email
    });
  } else {
    res.sendStatus(401);
  }
});

app.get("/data", (req, res) => {
  var email = req.headers.email;
  var password = req.headers.password;
  let userFound = false;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
        userFound = true;
        break;
    }
  }

  if (userFound) {
    let usersToReturn = [];
    for (let i = 0; i<users.length; i++) {
        usersToReturn.push({
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            email: users[i].email
        });
    }
    res.json({
        users
    });
  } else {
    res.sendStatus(401);
  }
})
app.listen(3000, () =>{
    console.log(`app is running on port${3000}`);
})
