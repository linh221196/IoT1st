import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import blood from '../../assets/blood.jpeg';
import heart from '../../assets/heart.jpg';
import brainWaves from '../../assets/brain-waves.jpg';
import { NavLink } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './DeviceView.scss'

const DeviceView = () => {
  const devices = [
    {
      id: 1,
      name: "heart",
      img: heart,
      des: "심장 위한 디바이스 입니다, Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      id: 2,
      name: "blood",
      img: blood,
      des: "혈액 위한 디바이스 입니다. Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      id: 3,
      name: "brain-waves",
      img: brainWaves,
      des: "뇌 신호 디바이스. Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content."
    }
  ];

  return (
    <div className='container'>
      <Row xs={1} md={2} xl={3} className="g-4">
        {devices.map((device) =>
          <Col key={device.id}>
            <Card className="h-100 d-flex flex-column">
              <div className="card-img-container p-3">
                <Card.Img variant="top" src={device.img} />
              </div>
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>
                  {device.des}

                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <NavLink href="#">더보기</NavLink>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}
export default DeviceView;
