import './App.css';
import Container from 'react-bootstrap/Container';
import TaskManagement from './TaskManagement';

function App() {
  return (
    <Container>
      <h1 className='text-center'>Todo - App</h1>
      <TaskManagement />
    </Container>
      
    
  );
}

export default App;
