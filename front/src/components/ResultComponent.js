import React from "react";
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

function ResultComponent({trainers}) {
 
  const renderTrainerData = (trainer, index) => {
    return (
    <Col>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>ENTRENADOR: {trainer.name}</Card.Title>
          <Card.Text>
          <ListGroup.Item>Reputación: {trainer.reputation}</ListGroup.Item>
          <ListGroup.Item>Plazas: {trainer.places}</ListGroup.Item>
          <ListGroup.Item>
            <ListGroup.Item>
              Clientes
            </ListGroup.Item>
            {trainer.users.map(user => <div>Cliente:{user.name}</div>)}</ListGroup.Item>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    )
  }
   return (
      <Container>
        <Row>
        {trainers.map((trainer, index) => renderTrainerData(trainer, index))}
        </Row>
      </Container>
  );
}

export default ResultComponent;
