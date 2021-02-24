import './App.css';
import { useState } from 'react';
import taskFactory from './scripts/taskFactory';

function App() {

  const [tasks, setTasks] = useState({ content: [] });

  const addTask = (e) => {
    e.target.disabled = true;
    let tempTasks = tasks.content;
    tempTasks.push(
      taskFactory()
    );
    
    setTasks({ content: tempTasks });
  };
  

  const displayTask = (obj, index) => {
    return (
      <div className='row' key={index} data-activity={index}>
        <div className='start-time'>{obj.startTime && obj.startTimeString}</div>
        <div className='end-time'>{obj.endTime && obj.endTimeString}</div>
        <div className='duration'>
          {obj.duration}
        </div>
        <div className='description'>
          {
            obj.description ||
            <form onSubmit={startTimer}>
              <textarea required type='textarea' placeholder='Type your description' />
              <button type='submit'>Start</button>
            </form>
          }
        </div>
      </div>
    );
  };

    const startTimer = (e) => {
    e.preventDefault();

    // selects task from tasks object
    const task = tasks.content[e.target.parentNode.parentNode.dataset.activity];
    // sets start time in object
    task.startTime = new Date();
    task.startTimeString = task.startTime.toLocaleString()

    const description = e.target[0].value;
    task.description = description;
    
    console.log(tasks)
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
        {
          tasks.content.map((task, index) => {
            return displayTask(task, index);
          })
        }
      </div>
      <button className='add-btn' onClick={addTask}>Add</button>
    </div>
  );
}

export default App;
