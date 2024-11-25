import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Content.scss";
import { NavLink } from "react-bootstrap";
import PatientNoticeMeasure from "./User/PatientNoticeMeasure";
import React, { useState } from 'react';
import {postMeasurePatient} from "./services/apiServices";
import userInfo from "./User/UserInfo";
import {useSelector} from "react-redux";

const Content = () => {
  const userInfo = useSelector(state => state.user.account);
  const [fullscreen, setFullscreen] = useState(true);
  const [showNoticeModal, setNoticeModalShow] = useState(false);
  const [list, setList] = useState(false);
  const [listUser, setListUser] = useState([
    { measurement: 'spo2', status: true },
    { measurement: 'airflow', status: true },
    { measurement: 'bodytemp', status: true },
    { measurement: 'ecg', status: true },
    { measurement: 'emg', status: false },
    { measurement: 'gsr', status: true },
    { measurement: 'nibp', status: false }
  ]);


  const handleNoticeModalShow = (breakpoint) => {
    setFullscreen(breakpoint);
    // setNoticeModalShow(true);
    //fetchData();
    setList(true);
  }

  const fetchData = async () => {
    try {
      const data = await postMeasurePatient(userInfo.email);

      const newList = [
        { measurement: 'spo2', status: data.spo2 },
        { measurement: 'airflow', status: data.airflow },
        { measurement: 'bodytemp', status: data.bodytemp },
        { measurement: 'ecg',  status: data.ecg },
        { measurement: 'emg', status: data.emg },
        { measurement: 'gsr', status: data.gsr },
        { measurement: 'nibp', status: data.nibp },
      ];

      setListUser(newList); // 데이터를 newList 형태로 listUser에 저장
    } catch (error) {
      alert("서버에서 필수측정요소를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
      <div className="content-wrapper">
        <div className="inner-container">
          <Row className="r-content">
            <Col className="c-content">
              <NavLink href="/DeviceView">기계 안내</NavLink>
            </Col>
            <Col
                className={`c-content ${list ? "flipped" : ""}`} // 상태에 따라 클래스 추가
                style={{
                  perspective: "1000px", // 3D 효과를 위한 원근감
                  position: "relative",  // 자식의 절대 위치 기준
                  width: "100%",
                  height: "100%",
                }}
            >
              <div
                  className="flip-inner"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transformStyle: "preserve-3d", // 자식 요소의 3D 효과 유지
                    transform: list ? "rotateY(180deg)" : "rotateY(0)", // 상태에 따른 회전
                    transition: "transform 0.6s ease-in-out", // 부드러운 회전 효과
                    backgroundColor: list ? "white" : "transparent",
                    borderRadius: "5px", // 둥근 모서리 추가
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 외곽 그림자 추가
                  }}
              >
                {/* 앞면 */}
                <div
                    className="flip-front"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden", // 뒷면 숨기기
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                >
                  {!list && <NavLink onClick={handleNoticeModalShow}>주의 할 요소</NavLink>}
                </div>

                {/* 뒷면 */}
                <div
                    className="flip-back"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden", // 앞면 숨기기
                      transform: "rotateY(180deg)", // 뒤집혀 보이도록 설정
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                >
                  <ul
                      onClick={() => setList(false)}
                      style={{
                        padding: "10px",
                        listStyleType: "none",
                        margin: 0,
                        textAlign: "center",
                        width: "100%",
                        height: "100%",
                        overflowY: "auto", // 스크롤 추가
                      }}
                  >
                    {listUser.filter((item) => item.status).length > 0 ? (
                        listUser
                            .filter((item) => item.status)
                            .map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                      padding: "8px",
                                      margin: "5px 0",
                                      borderRadius: "3px",
                                      backgroundColor: "#f9f9f9", // 리스트 항목의 배경
                                      transition: "background-color 0.2s ease",
                                      cursor: "pointer",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.target.style.backgroundColor = "#e0e0e0")
                                    }
                                    onMouseOut={(e) =>
                                        (e.target.style.backgroundColor = "#f9f9f9")
                                    }
                                >
                                  {item.measurement}: 활성
                                </li>
                            ))
                    ) : (
                        <li>필수로 검사할 요소가 없습니다.</li>
                    )}
                  </ul>
                </div>
              </div>
            </Col>
            {/*<PatientNoticeMeasure
                  showNoticeModal={showNoticeModal}
                  handleNoticeModalShow={handleNoticeModalShow}
                  setNoticeModalShow={setNoticeModalShow}
                  fullscreen={fullscreen}
              />*/}
          </Row>
          <Row className="r-content">
            <Col className="c-content">
              <NavLink href="/Measurement">측정 치수</NavLink>
            </Col>
            <Col className="c-content">
              <NavLink href="/Volunteer">자원 봉사</NavLink>
            </Col>
          </Row>
        </div>
      </div>
  );
};

export default Content;
