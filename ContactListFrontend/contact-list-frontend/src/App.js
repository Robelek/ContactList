
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactList from './views/ContactList';
import NotFound from './views/NotFound';
import Login from './views/LoginRegister/Login';
import Register from './views/LoginRegister/Register';
import ContactDetails from './views/ContactDetails';
import ContactEdit from './views/ContactEdit';
import UserAddView from './views/UserAddView';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
        <Route path="/details/:id" element={<ContactDetails/>} />
        <Route path="/edit/:id" element={<ContactEdit/>} />
        <Route path="/adduser" element={<UserAddView/>} />



        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
