import './App.css';
import { useState } from 'react';

function App() {

  const [tasks, setTasks] = useState({ content: [] });

  
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
    </div>
  );
}

export default App;
