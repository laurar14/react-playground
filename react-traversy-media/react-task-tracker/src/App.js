import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


const initialTasks = [
    {
        id: 1,
        text: "Doctor's Appointment",
        day: "Feb 5th at 2:30pm",
        reminder: true
    },
    {
        id: 2,
        text: "Meeting at School",
        day: "Feb 6th at 1:30pm",
        reminder: true
    },
    {
        id: 3,
        text: "Food Shopping",
        day: "Feb 5th at 2:30pm",
        reminder: false
    }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task ));
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
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
    </div>
  );
}

export default App;
