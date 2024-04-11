import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; 

const AddTaskModal = ({ onCreateTask, onEditTask, editTaskId, onClose}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editTaskStatus, setEditTaskStatus] = useState('');


useEffect(() => {
  if (editTaskId) {
    const LOCAL_STORAGE_KEY="tasks";

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const tasks = JSON.parse(saved);

    const existingTask = tasks.find((task) => task.id === editTaskId);
    if (existingTask) {
      setTaskTitle(existingTask.title);
      setTaskDescription(existingTask.description);
      setEditTaskStatus(existingTask.status)
    }
  }
}, [editTaskId]);

  const handleCreate = () => {
   if (editTaskId) {
      // Update existing task
      const editedTask = {
        id: editTaskId,
        title: taskTitle,
        description: taskDescription,
        status:editTaskStatus,
        // Other properties (status, etc.) as needed
      };
      onEditTask(editedTask);
    } else {
      // Create a new task
      const newTask = {
        id: Math.floor(Math.random() * 1000), // Generate a unique ID 
        title: taskTitle,
        description: taskDescription,
        status:'todo',
      };
      onCreateTask(newTask);
    }
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editTaskId ? 'Edit Task' : 'Create Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="taskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Save Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
