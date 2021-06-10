import './App.css';
import React from "react";
import ResultComponent from './components/ResultComponent'
import ClientsModal from './components/ClientsModal'

import { Button, Container, Col, Row, Table } from 'react-bootstrap';

function App() {
  const [trainers, setTrainers] = React.useState([]);
  const [clients, setClients] = React.useState([]);
  const [showClients, toggleModal] = React.useState(false);
  const [result, setResult] = React.useState([]);

  React.useEffect( () => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    fetch("/trainers")
      .then((res) => res.json())
      .then((data) =>  setData(data)); 
  }

  const setData = ({trainers, clients}) =>{
    setTrainers(trainers)
    setClients(clients)

  }
  
  const changeValue = (event, index, key) =>{
    const updatedTrainers = [...trainers];
    updatedTrainers[index][key] = event.target.value
    setTrainers(updatedTrainers)
  }

  const calculateClients = () =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trainers })
  };
    fetch("/trainers", requestOptions)
      .then((res) => res.json())
      .then((data) => setResult(data)); 
  }

  const renderTrainerData = (trainer, index) => {
    return (
      <tr key={trainer.id}>
        <th>{trainer.id} </th>
        <th><input type="text" value={trainer.name}  onChange={(event) => changeValue(event,index, 'name')} name="name" /> </th>
        <th><input type="number" value={trainer.reputation} onChange={(event) => changeValue(event,index, 'reputation')} name="reputation" /> </th>
        <th><input type="number" value={trainer.places} onChange={(event) => changeValue(event,index, 'places')} name="places" /> </th>
      </tr>
    )
  }

  return (
    <Container>
      
      {!result.length ? 
      <>
      <Row fluid>
          <Col>
            <h1>PANTALLA DE CONFIGURACIÓN</h1>
          </Col>
      </Row>
      <Row fluid>
        <Col>
          <Table striped bordered hover>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Reputación</th>
              <th>Plazas</th>
            </tr>
            {trainers.map((trainer, index) => renderTrainerData(trainer, index))}
            </Table>
            <Button variant="secondary" onClick={()=> toggleModal(true)}>
              Ver clientes
            </Button>
            <Button variant="primary" onClick={calculateClients}>
              Calcular Resultado 
            </Button>
          </Col> 
          </Row> 
          </>:
        <ResultComponent trainers={result} />}
        <ClientsModal showModal={showClients} toggleModal={toggleModal} clients={clients} />
  </Container>      

  );
}

export default App;
