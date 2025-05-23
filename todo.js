const express = require('express');
const port = 8000;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let todoList = [];


app.post("/add", (req, res) => {
    console.log(req.body);
    let obj = {
        title: req.body.title,
        date: req.body.dueDate,
        description: req.body.description
    };
    todoList.push(obj);
    console.log("Task added successfully");
    return res.redirect('/');
});

app.get('/update/:index', (req, res) => {
    const index = req.params.index;
    if (todoList[index]) {
        res.render('update', { title: 'Update Task', task: todoList[index], index: index });
    } else {
        res.status(404).send('Task not found');
    }
});


app.post('/update', (req, res) => {
    const { index, title, dueDate, description } = req.body;
    if (todoList[index]) {
        todoList[index] = { title: title, date: dueDate, description: description };
        console.log(`Task at index ${index} updated successfully`);
    }
    res.redirect('/');
});


app.post('/delete', (req, res) => {
    const { index } = req.body;
    if (todoList[index]) {
        todoList.splice(index, 1); 
        console.log(`Task at index ${index} deleted successfully`);
    }
    res.redirect('/');
});


app.get('/', (req, res) => {
    res.render('index', { title: 'Todo List', task: todoList });
});


app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});
