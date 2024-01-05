const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoList', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for tasks
const taskSchema = new mongoose.Schema({
  text: String,
});

// Create a model based on the schema
const Task = mongoose.model('Task', taskSchema);

// Middleware to parse JSON in request body
app.use(bodyParser.json());


// Route to add a task to the database
app.post('/addTask', async (req, res) => {
   const { text } = req.body || { text: '' };
 console.log('Received Task Text:', text);
  console.log('Received Request Body:', req.body);


  try {
    // Create a new task
 console.log('Received Task Text:', text);
    const newTask = new Task({ text });
    
    // Save the task to the database
      const savedTask = await newTask.save();
  console.log('Task saved successfully:', savedTask);
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
