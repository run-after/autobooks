import './App.css';
import { useState } from 'react';
import taskFactory from './scripts/taskFactory';
import formatTime from './scripts/formatTime';

function App() {

  let initialTasks;
  if (sessionStorage.length < 1) {
    initialTasks = { content: [] };
  } else {
    initialTasks = JSON.parse(sessionStorage['tasks']);
  };

  const [tasks, setTasks] = useState(initialTasks);

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
          {
            (!obj.duration &&
            formatTime(timer.time)) ||
            formatTime(obj.duration)
          }
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

  const [timer, setTimer] = useState({
    timeStart: 0,
    time: 0
  });

  let interval;

  const startTimer = (e) => {
    e.preventDefault();

    // selects task from tasks object
    const task = tasks.content[e.target.parentNode.parentNode.dataset.activity];
    // sets start time in object
    task.startTime = new Date();
    task.startTimeString = task.startTime.toLocaleString()

    const description = e.target[0].value;
    const descriptionBox = e.target.parentNode;
    task.description = description;

    const endBtn = document.createElement('button');
    endBtn.classList.add('end-btn');
    endBtn.addEventListener('click', endTimer);
    endBtn.textContent = 'End';
    
    descriptionBox.parentNode.appendChild(endBtn);

    let startTime = new Date().getTime();
    // This updates timer on screen
    interval = setInterval(() => {
      setTimer({
        timeStart: startTime,
        time: new Date().getTime() - startTime
      });
    }, 10);
  };

  const endTimer = (e) => {

    document.querySelector('.add-btn').disabled = false;

    const task = tasks.content[e.target.parentNode.dataset.activity];

    task.endTime = new Date();
    task.endTimeString = task.endTime.toLocaleString();
    task.duration = task.endTime - task.startTime;
  
    clearInterval(interval);

    setTimer({
      timeStart: 0,
      time: 0
    });
  
    e.target.remove();
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
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
