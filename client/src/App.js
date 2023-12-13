import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Table from './components/Table';
import Create from './components/Createuser';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Table/>}></Route>
    <Route path='/create' element={<Create/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
