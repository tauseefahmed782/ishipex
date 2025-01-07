import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Book } from './pages/Book';

function App() {
  return (
    <div className="App">
     <Routes>
<Route path="/" element={<Book/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
