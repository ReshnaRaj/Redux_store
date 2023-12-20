import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Table from './components/Table';
 

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Table/>}></Route>
   
   </Routes>
   </BrowserRouter>
  );
}

export default App;
