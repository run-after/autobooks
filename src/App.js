import './App.css';
import { useState } from 'react';
import taskFactory from './scripts/taskFactory';

function App() {

  const [tasks, setTasks] = useState({ content: [] });

  const addRow = (e) => {
    e.target.disabled = true;
    let tempTasks = tasks.content;
    tempTasks.push(
      taskFactory()
    );
    
    setTasks({ content: tempTasks });
  };


  return (
    <div className="App">
      <header className="App-header">
        Autobooks
      </header>
      <div className='activity-grid'>
        <div className='row'>
          <div className='start-time'>Start time</div>
        <div className='end-time'>End time</div>
        <div className='duration'>Duration</div>
        <div className='description'>Description</div>
        </div>
      </div>
      <button className='add-btn' onClick={addRow}>Add</button>
    </div>
  );
}

export default App;
