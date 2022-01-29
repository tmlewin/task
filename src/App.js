import {useEffect,useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import TaskDetails from './components/TaskDetails';



function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //declare useffect
  useEffect(() => {
    const resdata = async() => {
      const fetchDataFromServer = await fetchTasks();
      setTasks(fetchDataFromServer);

    }
    resdata();
    
  },[]);

  //get all tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // fetch task by id
  const fetchTaskById = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // add task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks,data]);
  }

  // delete task
  const deleteTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    res.status === 200 ? setTasks(tasks.filter((task)=> task.id !== id)) : alert('Task deleted failed');
  }

  // setReminder  for task  by id 
  const setReminder = async(id) => {
    const taskToToggle = await fetchTaskById(id);
    const updTask = {...taskToToggle,reminder:!taskToToggle.reminder};
    
     const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({updTask})
    });

    const data = await res.json();
    setTasks(tasks.map((task) => task.id === id ? {...task,reminder:data.reminder} : task));

    
  }





  return (
    <Router>
    <div className="container">
      <Header
      onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      
      />
      <Routes>
        <Route 
        path="/" 
        element={
          <>
         {showAddTask && <AddTask onAdd={addTask} />}
         {tasks.length > 0 ? (
         <Tasks 
         tasks={tasks} 
         onDelete={deleteTask} 
         onToggle={setReminder} /> 
         ): ('No Tasks to  Show')}
          </>

      
      } 
      />
      <Route path="/about" element={<About />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      

      </Routes>
      <Footer />
     
    </div>

    </Router>
  );
}

export default App;
