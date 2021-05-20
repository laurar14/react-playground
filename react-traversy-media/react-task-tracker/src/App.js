import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';



// NOTE TO SELF: the command npm run build (or yarn build if using that) will create a build directory. That is the folder we deploy.
// For local serving, you can install a package called 'serve' installed globally (npm -g i serve) then use the command serve -s build -p 8000 to see the artifact created.
const API_URL = "http://localhost:5000"

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  // Here we are using our mock backend with the package json-server, which created a db.json file for us (check package.json to see the command for 'server')
  // instead of the data we mocked in our front in the previous version. As you know, useEffect is called on render. Since we're not observing 
  // any property (or variable), it should run on load, once.
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
       headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task ));
  }

  const addTask = async (task) => {
    // Code for adding new task to the mock data: 
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path="/" 
          //the exact flag makes it so that it does not match the partial string. It must be exactly what the path sets it to be.
          exact 
          render={(props) => (
            <>
              {/*Underneath is an alternative to the ternary expression when only one condition must be met*/}
              {showAddTask && <AddTask onAdd={ addTask } />}      
              { tasks.length ? 
                (<Tasks 
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />) : 
                (<p>No pending tasks.</p>)
              }
            </>
          )} 
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>    
  );
}

export default App;
