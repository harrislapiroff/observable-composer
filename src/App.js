import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';

const exampleConfig = require('./examples/1.json')

function App() {
  return (
    <div>
      <Dashboard config={exampleConfig} />
    </div>
  );
}

export default App;
