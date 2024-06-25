import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './Components/Home';
import Login from './Components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgentRegister from './Components/AgentRegister';
import CustomerRegister from './Components/CustomerRegister';
import { BrowserRouter,Route, Routes, useNavigate } from 'react-router-dom';
import ViewAgents from './Components/Admin/ViewAgents';
import ViewHotels from './Components/Customer/ViewHotels';
import Hotel from './Components/Customer/Hotel';
import Hotels from './Components/Agent/Hotels';
import AddHotel from './Components/Agent/AddHotel';
import HotelEdit from './Components/Agent/HotelEdit';
import AdminProtected from './Components/Protected/AdminProtected';
import AgentProtected from './Components/Protected/AgentProtected';
import CustomerProtected from './Components/Protected/CustomerProtected';
import MyBookings  from './Components/Customer/MyBookings';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  var token;
  var role;
  return (
    <BrowserRouter>
    <div className="App">
      <div>
    {/* Your component's content */}
    <ToastContainer />
  </div>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='agentregister' element={<AgentRegister/>} />
        <Route path='customerregister' element={<CustomerRegister/>} />

        {/* Admin Access */} 
        <Route path='adminView' element={
          <AdminProtected token={token} role={role}>
            <ViewAgents/>
          </AdminProtected>
        } />

        {/* Agent Access */} 
        <Route path='agentView' element={
          <AgentProtected token={token} role={role}>
            <Hotels/>
          </AgentProtected>
        } />
        <Route path='/editHotel/:id' element={
          <AgentProtected token={token} role={role}>
            <HotelEdit/>
          </AgentProtected>
        } />

        {/* Customer Access */} 
        <Route path='customerView' element={
          <CustomerProtected token={token} role={role}>
            <ViewHotels/>
          </CustomerProtected>
        } />
        <Route path='/booking/:id' element={
          <CustomerProtected token={token} role={role}>
            <Hotel/>
          </CustomerProtected>
        } />
        <Route path='myBooking' element={<MyBookings/>} />
    </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
