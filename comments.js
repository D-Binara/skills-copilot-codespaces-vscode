// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Enable to recieve JSON
app.use(express.json());

// Comments
let comments = [
    {
        id: 1,
        username: 'Alice',
        comment: 'Hello world'
    },
    {
        id: 2,
        username: 'Bob',
        comment: 'I am Bob'
    }
];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Not found');
    }
});

// Create a comment
app.post('/comments', (req, res) => {
    const username = req.body.username;
    const comment = req.body.comment;

    const id = comments.length + 1;
    comments.push({ id, username, comment });

    res.status(201).json({ id, username, comment });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        comment.username = req.body.username;
        comment.comment = req.body.comment;
        res.json(comment);
    } else {
        res.status(404).send('Not found');
    }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        comments = comments.filter(comment => comment.id !== id);
        res.json(comment);
    } else {
        res.status(404).send('Not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// Test the server
// Get all comments
// curl http://localhost:3000/comments
// Create a comment
// curl -X POST -H "Content-Type: application/json" -d '{"username": "Charlie", "comment": "I am Charlie"}' http