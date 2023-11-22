import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, TextField, Button } from '@mui/material';
import AddTask from './Forms/AddTask'
import Axios from 'axios'


function App() {
  const { REACT_APP_API_BASE_URL } = process.env;
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    await Axios.get(`${REACT_APP_API_BASE_URL}/get/tasks`)
      .then((response) => {
        setTasks(response.data)
      }).catch((err) => {
        console.log(err);
        setTasks([])
      })
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '100px' }}>
        <AppBar>
          <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">To Do List </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AddTask
          tasks={tasks}
          fetchTasks={fetchTasks}
        />
      </div>
    </div>
  );
}

export default App;
