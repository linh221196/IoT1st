import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Content.scss";
import { NavLink } from "react-bootstrap";
import PatientNoticeMeasure from "./User/PatientNoticeMeasure";
import { useState } from 'react';

const Content = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [showNoticeModal, setNoticeModalShow] = useState(false);
  const handleNoticeModalShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setNoticeModalShow(true);

  }
  return (
    <div>
      <Container >
        <Row className="r-content">
          <Col className="c-content">
            <NavLink href="/DeviceView">기계 안내</NavLink>
          </Col>
          <Col className="c-content">
            <NavLink onClick={handleNoticeModalShow}>주의 할 요소</NavLink>
            <PatientNoticeMeasure
              showNoticeModal={showNoticeModal}
              handleNoticeModalShow={handleNoticeModalShow}
              setNoticeModalShow={setNoticeModalShow}
              fullscreen={fullscreen}
            />
          </Col>
        </Row>
        <Row className="r-content">
          <Col className="c-content">
            <NavLink>측정 치수</NavLink>
          </Col>
          <Col className="c-content">
            <NavLink href="/Volunteer" >자원 봉사</NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Content;
