import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserHome from './components/User/UserHome';
import Volunteer from './components/User/UserCallVolunteer';
import DeviceView from './components/User/DeviceView';
import Test from './components/services/test';
import VolunteerHome from './components/Volunteer/VolunteerHomePage';
import MedicalHome from './components/Medical/MedicalHome';
import MedicalAddPatient from "./components/Medical/MedicalAddPatient";
import Measurement from "./components/User/Measurement";
import MedicalChart from "./components/Medical/MedicalChart";
import HeaderBar from "./components/HeadBar/HeaderBar"
import NotFound from './components/NotFound';
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
          <Route
              path="/UserHome"
              element={
                <PrivateRoute allowedRoles={["Patient"]}>
                  <UserHome />
                </PrivateRoute>
              }
          />
          <Route
              path="/Volunteer"
              element={
                <PrivateRoute allowedRoles={["Patient"]}>
                  <Volunteer />
                </PrivateRoute>
              }
          />
          <Route
              path="/Measurement"
              element={
                <PrivateRoute allowedRoles={["Patient"]}>
                  <Measurement />
                </PrivateRoute>
              }
          />
          {/* 봉사자 페이지 */}
          <Route
              path="/VolunteerHome"
              element={
                <PrivateRoute allowedRoles={["Volunteer"]}>
                  <VolunteerHome />
                </PrivateRoute>
              }
          />
          {/* 의료진용 페이지 */}
          <Route
              path="/MedicalHome"
              element={
                <PrivateRoute allowedRoles={["Medical"]}>
                  <MedicalHome />
                </PrivateRoute>
              }
          />
          <Route
              path="/MedicalAdd"
              element={
                <PrivateRoute allowedRoles={["Medical"]}>
                  <MedicalAddPatient />
                </PrivateRoute>
              }
          />
          <Route
              path="/MedicalChart"
              element={
                <PrivateRoute allowedRoles={["Medical"]}>
                  <MedicalChart />
                </PrivateRoute>
              }
          />
          {/* 테스트 및 기타 */}
          <Route path="/Test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
