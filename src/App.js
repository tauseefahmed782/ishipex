import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Book } from './pages/Book';
import MyAccount from './pages/UserDetails/MyAccount';

function App() {
  return (
    <div className="App">
     <Routes>
<Route path="/" element={<Book/>}></Route>
<Route path="my-account" element={<MyAccount/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
