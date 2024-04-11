// TaskManagement.js (Parent Component)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import React Bootstrap components
import './TaskManagerApp.css'; // You can style your components here

// Import the Modal component
import AddTaskModal from './AddTaskModal';

const TaskManagement = () => {
  const LOCAL_STORAGE_KEY="tasks";
  //const [tasks, setTasks] = useState([]);
  const [tasks,setTasks]=useState(()=>{
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });


  const [showModal, setShowModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null); // Track the task being edited

  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };
  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };
  const removeTasktHandler = (id) => {

    debugger
      const newTaskList = tasks.filter((task)=>{
        return task.id !==id;
      })
      setTasks(newTaskList);
    };

    const handleEditTask = (taskId) => {
      setEditTaskId(taskId);
      setShowModal(true);
    };

    const handleSaveEditedTask = (editedTask) => {
      // Update the task details
      const updatedTasks = tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setShowModal(false);
    };

  useEffect(()=> {
    const retrivedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrivedTasks) setTasks(retrivedTasks);
   },[]);

   useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasks));
  },[tasks]);


  const handleDragEnd = (taskId, status) => {
    // Update task status when dragged to a different column
    debugger
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (status==='completed' && !window.confirm("Move task to completed state?")){
          return task;
        }
        else return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
    setDraggedTaskId(taskId);
    debugger
  };


  return (
    <Container>
      <div className='clearfix'>
        <Button className='float-end mb-4' onClick={() => setShowModal(true)}>Create Task</Button>
      </div>
      <Row>
        <Col className="column todo" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDragEnd(draggedTaskId, 'todo')}>
          <h2>Todo</h2>
          {tasks
          .filter((task) => task.status === 'todo')
          .map((task) => (
            <div
              key={task.id}
              className="task"
              draggable
              onDragStart={() => handleDragStart(task.id)}
            >
              <span>#{task.id}</span> {task.title}
              <p>{task.description}</p>
              <div className='clearfix'>
                <Button className='btn btn-danger btn-xs float-end' onClick={() => removeTasktHandler(task.id)}>
                <span><i className="bi bi-trash3-fill"></i></span>Delete
                </Button>
                <Button className='btn btn-secondary btn-xs float-end' onClick={() => handleEditTask(task.id)}>
                <span><i className="bi bi-pencil-fill"></i></span>Edit
                </Button>
              </div>
              
            </div>
          ))}
        </Col>
        <Col className="column inprogress" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDragEnd(draggedTaskId, 'inprogress')}>
          <h2>In Progress</h2>
          {tasks
          .filter((task) => task.status === 'inprogress')
          .map((task) => (
            <div
              key={task.id}
              className="task"
              draggable
              onDragStart={() => handleDragStart(task.id)}
            >
              <span>#{task.id}</span> {task.title}
              <p>{task.description}</p>
             
              <div className='clearfix'>
                <Button className='btn btn-danger btn-xs float-end' onClick={() => removeTasktHandler(task.id)}>
                <span><i className="bi bi-trash3-fill"></i></span>Delete
                </Button>
                <Button className='btn btn-secondary btn-xs float-end' onClick={() => handleEditTask(task.id)}>
                <span><i className="bi bi-pencil-fill"></i></span>Edit
                </Button>
              </div>
           
              
            </div>
          ))}
        </Col>
        <Col className="column completed" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDragEnd(draggedTaskId, 'completed')}>
          <h2>Completed</h2>
          {tasks
          .filter((task) => task.status === 'completed')
          .map((task) => (
            <div
              key={task.id}
              className="task"   
            >
              <span>#{task.id}</span> {task.title}
              <p>{task.description}</p>
            </div>
          ))}
        </Col>
      </Row>
      {showModal && <AddTaskModal onCreateTask={handleCreateTask} onEditTask={handleSaveEditedTask} editTaskId={editTaskId} onClose={() => {
            setEditTaskId(null);
            setShowModal(false);
          }} />}
    </Container>
  );
};

export default TaskManagement;
