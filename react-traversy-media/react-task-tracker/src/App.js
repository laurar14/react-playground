import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';


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

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task ));
  }

  return (
    <div className="container">
      <Header />
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
