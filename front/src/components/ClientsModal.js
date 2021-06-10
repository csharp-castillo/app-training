import React from "react";
import { Modal, Table} from 'react-bootstrap';

function ClientsModal({clients, showModal, toggleModal}) {
  const renderClient = (client)=> {
    return (
    <tr key={client.id}>
      <td>{client.id}</td>
      <td>{client.name}</td>
      <td>{client.priority}</td>
    </tr>
    )
  }
   return (
    <Modal show={showModal} onHide={()=> toggleModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>CLIENTES</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Table striped bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Preferencia</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client=> renderClient(client))}
      </tbody>
    </Table>
    </Modal.Body>
    </Modal>
  );
}

export default ClientsModal;
