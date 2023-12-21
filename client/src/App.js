import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Table from './components/Table';
import Adduser from './components/Adduser';
import EditUser from './components/EditUser';
 

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Table/>}/>
    <Route path='/adduser' element={<Adduser/>}/>
    <Route exact path='/edituser/:id' element={<EditUser/>}/>
   
   </Routes>
   </BrowserRouter>
  );
}

export default App;
