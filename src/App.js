import Editor from './components/Editor/Editor'

const exampleConfig = require('./examples/1.json')

function App() {
  return (
    <div>
      <Editor config={exampleConfig} />
    </div>
  );
}

export default App;
