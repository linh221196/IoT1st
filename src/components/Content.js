import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Content.scss";
import {Image, NavLink} from "react-bootstrap";
import PatientNoticeMeasure from "./User/PatientNoticeMeasure";
import React, { useState } from 'react';
import {postMeasurePatient} from "./services/apiServices";
import userInfo from "./User/UserInfo";
import {useSelector} from "react-redux";
import measure from '../assets/white_measure_icon_with_border.png'
import device from '../assets/smaller_high_res_icon.png'
import volunteer from '../assets/white_volunteer_icon_with_border.png'
import notice from '../assets/white_icon_with_border.png'


const Content = () => {
  const userInfo = useSelector(state => state.user.account);
  const [fullscreen, setFullscreen] = useState(true);
  const [showNoticeModal, setNoticeModalShow] = useState(false);
  const [list, setList] = useState(false);
  const [listUser, setListUser] = useState([
    { measurement: 'spo2', status: true, text: '산소포화도' },
    { measurement: 'airflow', status: true, text: '호흡센서' },
    { measurement: 'bodytemp', status: true, text: '체온센서' },
    { measurement: 'ecg', status: true, text: '심전도' },
    { measurement: 'emg', status: true, text: '근전도' },
    { measurement: 'gsr', status: true, text: '피부반응' },
    { measurement: 'nibp', status: true, text: '혈압측정' },
      { measurement: 'eog', status: true, text: '안구전도' },
  ]);

  //사용자가 주의할 요소를 클릭했을때 뒤집히는 이벤트와 fetchData함수 실행
  const handleNoticeModalShow = (breakpoint) => {
    setFullscreen(breakpoint);
    // setNoticeModalShow(true);
    //fetchData();
    setList(true);
  }

  //사용자의 주의할 요소를 불러오는 함수
  const fetchData = async () => {
    try {
      const data = await postMeasurePatient(userInfo.email);

      const predefinedList = [
          { measurement: 'spo2', status: true, text: '산소포화도' },
          { measurement: 'airflow', status: true, text: '호흡센서' },
          { measurement: 'bodytemp', status: true, text: '체온센서' },
          { measurement: 'ecg', status: true, text: '심전도' },
          { measurement: 'emg', status: false, text: '근전도' },
          { measurement: 'gsr', status: true, text: '피부반응' },
          { measurement: 'nibp', status: false, text: '혈압측정' },
          { measurement: 'eog', status: false, text: '안구전도' },
      ];

        // data에서 받아온 값을 status에 반영
        const newList = predefinedList.map((item) => ({
            ...item, // 기존 구조 유지
            status: data[item.measurement] === 'true', // data 값이 'true' 문자열이면 true로 변환
        }));

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
                  <Image
                      className="user-image"
                      src={device}
                  />
                  <div className="divider"></div>
                  <NavLink href="/DeviceView">기기 안내</NavLink>
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
                      flexDirection: "column", // 세로 정렬로 변경
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                >
                  {!list &&(
                      <>
                          <Image
                              className="user-image"
                              src={notice}
                          />
                          <div className="divider"></div>
                          <NavLink onClick={handleNoticeModalShow}>주의 할 요소</NavLink>
                      </>
                      )}
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
                            display: "block", // Flexbox 해제
                            flexDirection: "column", // 세로로 리스트 정렬
                            boxSizing: "border-box", // 패딩 포함 크기 계산
                        }}
                    >
                        {listUser.filter((item) => item.status).length > 0 ? (
                            listUser
                                .filter((item) => item.status)
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            width: "100%", // 모든 li 요소의 너비 동일
                                            height: "40px", // 고정된 높이로 설정
                                            display: "flex", // Flexbox로 내부 중앙 정렬
                                            alignItems: "center", // 수직 중앙 정렬
                                            justifyContent: "center", // 수평 중앙 정렬
                                            backgroundColor: "#f9f9f9", // 리스트 항목의 배경
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s ease",
                                        }}
                                        onMouseOver={(e) =>
                                            (e.target.style.backgroundColor = "#e0e0e0")
                                        }
                                        onMouseOut={(e) =>
                                            (e.target.style.backgroundColor = "#f9f9f9")
                                        }
                                    >
                                        {item.measurement}: {item.text}
                                    </li>
                                ))
                        ) : (
                            <li
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#f2f2f2",
                                    borderRadius: "3px",
                                    color: "#999",
                                }}
                            >
                                필수로 검사할 요소가 없습니다.
                            </li>
                        )}
                      {/*{userInfo.role === "Patient" ? (
                          listUser.filter((item) => item.status).length > 0 ? (
                            listUser
                                .filter((item) => item.status)
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            width: "100%", // 모든 li 요소의 너비 동일
                                            height: "40px", // 고정된 높이로 설정
                                            display: "flex", // Flexbox로 내부 중앙 정렬
                                            alignItems: "center", // 수직 중앙 정렬
                                            justifyContent: "center", // 수평 중앙 정렬
                                            backgroundColor: "#f9f9f9", // 리스트 항목의 배경
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s ease",
                                        }}
                                        onMouseOver={(e) =>
                                            (e.target.style.backgroundColor = "#e0e0e0")
                                        }
                                        onMouseOut={(e) =>
                                            (e.target.style.backgroundColor = "#f9f9f9")
                                        }
                                    >
                                        {item.measurement}: {item.text}
                                    </li>
                                ))
                        ) : (
                            <li
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#f2f2f2",
                                    borderRadius: "3px",
                                    color: "#999",
                                }}
                            >
                                필수로 검사할 요소가 없습니다.
                            </li>
                          )
                      ) : (
                          <li
                              style={{
                                  color: "red",
                                  fontWeight: "bold",
                                  textAlign: "center", // 텍스트 가운데 정렬
                                  fontSize: "22px", // 글자 크기를 크게 설정
                              }}
                          >
                              로그인 후 이용하십시오.
                          </li>
                      )}*/}
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
                <Image
                    className="user-image"
                    src={measure}
                />
                <div className="divider"></div>
              <NavLink href="/Measurement">측정 치수</NavLink>
            </Col>
            <Col className="c-content">
                <Image
                    className="user-image"
                    src={volunteer}
                />
                <div className="divider"></div>
              <NavLink href="/Volunteer">자원 봉사</NavLink>
            </Col>
          </Row>
        </div>
      </div>
  );
};

export default Content;
