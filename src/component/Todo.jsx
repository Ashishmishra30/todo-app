import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await axios.get('https://to-do-app-be.onrender.com/gettodo');
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    try {
      if (title.trim() !== '' && description.trim() !== '') {
        const res = await axios.post('https://to-do-app-be.onrender.com/newtodo', { title, description });
        setTasks([...tasks, res.data]);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://to-do-app-be.onrender.com/deletetodo/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id) => {
    try {
      if (title.trim() !== '' && description.trim() !== '') {
        await axios.patch(`https://to-do-app-be.onrender.com/updatetodo/${id}`, { title, description });
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h1>Todo App</h1>
      <div className='input-box' >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className='todo-data'>
        {tasks.map((task) => (
          <div key={task.id} className='todo-card'>
            <p><strong>Title: </strong>{task.title}</p>
            <p><strong>Des: </strong>{task.description}</p>
            <button onClick={() => editTask(task._id)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
