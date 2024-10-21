import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './components/User/UserHome';
import Volunteer from './components/User/UserCallVolunteer';
import DeviceView from './components/User/DeviceView';
import AdminHome from './components/Medical/AdminHome';
import Test from './components/services/test';
import VolunteerHome from './components/Volunteer/VolunteerHomePage';

function App() {
  return (
    <div className="App app-container container">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/UserHome' element={<UserHome />} />
        <Route path='/Volunteer' element={<Volunteer />} />
        <Route path='/DeviceView' element={<DeviceView />} />
        <Route path="/Medical" element={<AdminHome />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/VolunteerHome" element={<VolunteerHome />} />
      </Routes>


    </div>
  );
}

export default App;
