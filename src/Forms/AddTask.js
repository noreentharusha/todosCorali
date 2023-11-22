import React, { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    ListItemButton,
    ListItemIcon,
    Alert,
    Snackbar
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from 'axios'

function AddTask(props) {
    const { REACT_APP_API_BASE_URL } = process.env;
    const { tasks, fetchTasks } = props
    const [task, setTask] = useState()
    const [status, setStatus] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleAddTasks = async (event) => {
        event.preventDefault();
        await Axios.post(`${REACT_APP_API_BASE_URL}/add/tasks`, { task: task, status: status })
            .then((response) => {
                setSuccessOpen(true);
                setTask('')
                fetchTasks()
                setSuccessMessage(response.data)
            }).catch((err) => {
                setErrorOpen(true);
                setErrorMessage(err)
            })
    }

    const handleDeleteTask = async (id) => {
        if (id) {
            await Axios.delete(`${REACT_APP_API_BASE_URL}/delete/${id}`)
                .then((response) => {
                    setSuccessOpen(true);
                    setTask('')
                    fetchTasks()
                    setSuccessMessage(response.data)
                }).catch((err) => {
                    setErrorOpen(true);
                    setErrorMessage(err)
                })
        }
    }

    const handleUpdateTask = async (item) => {
        const value = !(item.status)
        await Axios.put(`${REACT_APP_API_BASE_URL}/update/${item._id}`, { id: item._id, task: item.task, status: value })
            .then((response) => {
                setSuccessOpen(true);
                setTask('')
                fetchTasks()
                setSuccessMessage(response.data)
            }).catch((err) => {
                setErrorOpen(true);
                setErrorMessage(err)
            })
    }

    return (
        <div>
            <form onSubmit={handleAddTasks} style={{ display: 'flex', justifyContent: 'space-around', width: '650px' }}>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                >
                    <TextField onChange={(e) => setTask(e.target.value)} value={task} fullWidth label="Task" id="fullWidth" />
                </Box>
                <Button type="submit" >Add Task</Button>
            </form>
            <div style={{ marginTop: '10px', display: 'flex' }}>
                <List component="nav" aria-label="main mailbox folders">
                    {tasks.map((item) => (
                        <ListItemButton key={item._id} style={{ marginTop: '10px', width: '525px', display: 'flex' }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.task} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" style={{ marginRight: '8px' }}
                                    onClick={() => handleUpdateTask(item)}
                                >
                                    <CheckCircleIcon style={item.status === true ? { color: 'green' } : { color: 'grey' }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete"
                                    onClick={() => handleDeleteTask(item._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    ))}

                </List>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => { setSuccessOpen(false) }} >
                    <Alert onClose={() => { setSuccessOpen(false) }} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => { setErrorOpen(false) }}>
                    <Alert onClose={() => { setErrorOpen(false) }} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div >
    )
}

export default AddTask