const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
let nextId = 3;

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => {
  const user = { id: nextId++, name: req.body.name };
  users.push(user);
  res.status(201).json(user);
});
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
