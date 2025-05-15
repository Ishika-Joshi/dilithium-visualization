import './App.css';
import { useState } from 'react';
import Comparison from './Comparison';
import Process from './Process';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dilithium Visualization Project</h1>
        {page === 'home' && (
          <div className="button-row">
            <div className="button-col">
              <p>See a side-by-side comparison of Diffrent Dilithium varients</p>
              <button className="big-btn" onClick={() => setPage('comparison')}>Show Comparison</button>
            </div>
            <div className="button-col">
              <p>Explore the step-by-step process of how Dilithium works.</p>
              <button className="big-btn" onClick={() => setPage('process')}>Show Process</button>
            </div>
          </div>
        )}
        {page === 'comparison' && (
          <Comparison onBack={() => setPage('home')} />
        )}
        {page === 'process' && (
          <Process onBack={() => setPage('home')} />
        )}
      </header>
    </div>
  );
}

export default App;
