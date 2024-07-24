import React from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const DataTable = ({ data, onDelete, onFilter, onSortAscending, onSortDescending }) => {
  const sRef = React.useRef()

  const handleSearch = () => {
    const keyword = sRef.current.value
    console.debug("Search", keyword)
    onFilter(keyword)
  }

  const handleDelete = (index) => {
    console.debug("Delete", index)
    onDelete(index)
  }

  return (
    <Container>
      <input type="text" placeholder="Search..." ref={sRef} />{' '}
      <Button onClick={handleSearch} variant="outline-dark">
        <i className="bi bi-search"></i> Search
      </Button>{' '}
      Sort by:
      <Button onClick={onSortAscending} variant="outline-dark">
        <i className="bi bi-arrow-up-circle-fill"></i>
      </Button>{' '}
      <Button onClick={onSortDescending} variant="outline-dark">
        <i className="bi bi-arrow-down-circle-fill"></i>
      </Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <i className="bi bi-trash" onClick={() => handleDelete(index)}></i>
              </td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;
