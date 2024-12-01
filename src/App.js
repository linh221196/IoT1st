import './App.scss';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserHome from './Pages/User/UserHome';
import Volunteer from './Pages/User/UserCallVolunteer';
import DeviceView from './Pages/DeviceView';
import Test from './services/test';
import VolunteerHome from './Pages/Volunteer/VolunteerHomePage';
import MedicalHome from './Pages/Medical/MedicalHome';
import MedicalAddPatient from "./Pages/Medical/MedicalAddPatient";
import Measurement from "./Pages/User/Measurement";
import MedicalChart from "./Pages/Medical/MedicalChart";
import HeaderBar from "./components/HeadBar/HeaderBar"
import NotFound from './Pages/NotFound';
import PrivateRoute from './components/PrivateRoute'

function App() {
  const location = useLocation();

  // 경로에 따라 role 결정
  const getRoleByPath = () => {
    if (['/MedicalHome', '/MedicalAdd', '/MedicalChart'].includes(location.pathname)) {
      return "Medical"; // 의료진
    } else if (['/Volunteer', '/Measurement', '/UserHome'].includes(location.pathname)) {
      return "Patient"; // 환자
    } else if (['/VolunteerHome'].includes(location.pathname)) {
      return "Volunteer"; // 봉사자
    } else if (['/', '/DeviceView'].includes(location.pathname)){
      return "Guest"; // 비로그인 사용자
    } else {
      return null;
    }
  };

  const role = getRoleByPath();

  return (
    <div className="App">
      {/* 조건부로 헤더 렌더링 */}
      {role && <HeaderBar role={role} />}

      <div className="app-container">
          <Routes>
              {/* 비로그인 페이지 */}
              <Route path="/" element={<Home />} />
              <Route path="/DeviceView" element={<DeviceView />} />
              {/* 환자용 페이지 */}
              <Route path="/UserHome"
                     element={
                         /* <PrivateRoute allowedRoles={["Patient"]}>*/
                         <UserHome />
                         /*</PrivateRoute>*/
                     }/>
              <Route path="/Volunteer"
                     element={
                         /*<PrivateRoute allowedRoles={["Patient"]}>*/
                         <Volunteer />
                         /*</PrivateRoute>*/
                     }/>
              <Route path="/Measurement"
                     element={
                         /*<PrivateRoute allowedRoles={["Patient"]}>*/
                         <Measurement />
                         /*</PrivateRoute>*/
                     }/>
              {/* 봉사자 페이지 */}
              <Route path="/VolunteerHome"
                     element={
                         /*<PrivateRoute allowedRoles={["Volunteer"]}>*/
                         <VolunteerHome />
                         /*</PrivateRoute>*/
                     }/>
              {/* 의료진용 페이지 */}
              <Route path="/MedicalHome"
                     element={
                         /*<PrivateRoute allowedRoles={["Medical"]}>*/
                         <MedicalHome />
                         /*</PrivateRoute>*/
                     }/>
              <Route path="/MedicalAdd"
                     element={
                         /*<PrivateRoute allowedRoles={["Medical"]}>*/
                         <MedicalAddPatient />
                         /*</PrivateRoute>*/
                     }/>
              <Route path="/MedicalChart"
                     element={
                         /*<PrivateRoute allowedRoles={["Medical"]}>*/
                         <MedicalChart />
                         /*</PrivateRoute>*/
                     }/>
              {/* 테스트 및 기타 */}
              <Route path="/Test" element={<Test />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
