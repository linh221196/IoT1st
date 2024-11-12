import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Image, NavLink, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './DeviceView.scss'
import Devices from '../../assets/Devices/Devices';
import { RxVideo } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import noimg from '../../assets/Devices/noimg.png'
import Modal from "react-bootstrap/Modal";


const DeviceView = () => {
    const devices = Devices;
    const [showModal, setShowModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    // 모달 열기 및 닫기 함수
    const handleShowModal = (device) => {
        setSelectedDevice(device); // 선택된 디바이스 설정
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDevice(null); // 모달 닫을 때 선택된 디바이스 초기화
    };

    return (
    <div className='container'>
      <Row xs={1} md={2} xl={4} className="g-4">
        {devices.map((device) =>
          <Col key={device.id}>
            <Card className="h-100 d-flex flex-column" onClick={() => handleShowModal(device)} style={{ cursor: 'pointer' }}>
              <div className="card-img-container p-3">
                <Card.Img variant="top" src={device.img} />
              </div>
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>
                  <Image src={device.imoticon ? device.imoticon : noimg} style={{ width: 100, height: 100 }} />
                  {device.des}


                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                  <NavLink
                      href={device.link} // device.link 사용
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <RxVideo size={20} />영상보기
                  </NavLink>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>

        {/* 모달 창 */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedDevice?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{selectedDevice?.des}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    );
}
export default DeviceView;

//<NavLink href="#"><RxVideo size={20} />더보기</NavLink>