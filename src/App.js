import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route,useLocation  } from 'react-router-dom';
import UserHome from './components/User/UserHome';
import Volunteer from './components/User/UserCallVolunteer';
import DeviceView from './components/User/DeviceView';

import Test from './components/services/test';
import VolunteerHome from './components/Volunteer/VolunteerHomePage';
import SideBar from './components/Medical/SideBar';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {/* Conditionally render Sidebar only on the '/Medical' route */}
      {/* {location.pathname === '/Medical' && <SideBar />}  */}
      
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserHome" element={<UserHome />} />
          <Route path="/Volunteer" element={<Volunteer />} />
          <Route path="/DeviceView" element={<DeviceView />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/VolunteerHome" element={<VolunteerHome />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
