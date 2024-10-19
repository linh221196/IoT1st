import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './components/User/UserHome';
import Volunteer from './components/User/UserCallVolunteer';
import DeviceView from './components/User/DeviceView';
import AdminHome from './components/Admin/AdminHome';
import Test from './components/services/test';

function App() {
  return (
    <div className="App app-container container">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/UserHome' element={<UserHome />} />
        <Route path='/Volunteer' element={<Volunteer />} />
        <Route path='/DeviceView' element={<DeviceView />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Test" element={<Test />} />
      </Routes>


    </div>
  );
}

export default App;
