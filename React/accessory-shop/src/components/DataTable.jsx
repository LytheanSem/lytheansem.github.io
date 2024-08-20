import React, { useContext } from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { TotalPriceContext } from "../context";
import { useEffect } from "react";

const DataTable = ({ data, onDelete, onFilter, onSort }) => {
  const sRef = React.useRef();

  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  console.log(totalPrice)
  let sum = data.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    setTotalPrice(sum);
  });

  const handleSearch = () => {
    const keyword = sRef.current.value;
    console.debug("Search", keyword);
    onFilter(keyword);
  };

  const handleDelete = (index) => {
    console.debug("Delete", index);
    onDelete(index);
  };

  const sortAscendingly = () => {
    onSort("ascendingly");
  };

  const sortDescendingly = () => {
    onSort("descendingly");
  };

  return (
    <Container>
      <input type="text" placeholder="Search..." ref={sRef} />{" "}
      <Button onClick={handleSearch} variant="outline-dark">
        <i className="bi bi-search"></i> Search
      </Button>
      <br />
      <span>Sort</span>
      <Button onClick={sortAscendingly} variant="outline-dark">
        <i className="bi bi-arrow-up-short"></i>
      </Button>
      <Button onClick={sortDescendingly} variant="outline-dark">
        <i className="bi bi-arrow-down-short"></i>
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
                <i
                  className="bi bi-trash"
                  onClick={() => handleDelete(index)}
                ></i>
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