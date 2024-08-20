import { useState, useRef } from "react";
import accessoryData from "./accessory.json";
import DataTable from "./components/DataTable";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import { TotalPriceContext } from "./context";

function App() {
  const [selectedItems, setSelectedItems] = useLocalStorage(
    "selected-items",
    []
  );
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([
    ...selectedItems,
  ]);
  const [totalPrice, setTotalPrice] = useState();

  const quantityRef = useRef();
  const productRef = useRef();
  const [price, setPrice] = useState(accessoryData[0].price);

  const handleSubmit = (e) => {
    const productId = parseInt(productRef.current.value);
    const product = accessoryData.find(
      (accessory) => accessory.id === productId
    );
    const order = {
      ...product,
      quantity: quantityRef.current.value,
    };
    console.table(order);
    selectedItems.push(order);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  const filter = (keyword) => {
    const filteredItems = selectedItems.filter((item) =>
      item.name.includes(keyword)
    );
    setFilteredSelectedItems(filteredItems);
  };

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value);
    const product = accessoryData.find(
      (accessory) => accessory.id === productId
    );
    setPrice(product.price);
  };

  const sort = (sortingWay) => {
    console.log("Helo");
    console.log(filteredSelectedItems.sort());
    if (sortingWay === "ascendingly") {
      setFilteredSelectedItems([
        ...filteredSelectedItems.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        }),
      ]);
    } else if (sortingWay === "descendingly") {
      setFilteredSelectedItems([
        ...filteredSelectedItems.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        }),
      ]);
    }
  };

  return (
    <>
      <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
        <Container>
          <Row>
            <Col xs={2}> Product: </Col>
            <Col xs={10}>
              <select ref={productRef} onChange={updatePrice}>
                {accessoryData.map((accessory, index) => (
                  <option key={index} value={accessory.id}>
                    {accessory.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col xs={2}> Price: </Col>
            <Col xs={10}> {price} </Col>
          </Row>
          <Row>
            <Col xs={2}> Quantity: </Col>
            <Col xs={10}>
              <input type="number" ref={quantityRef} defaultValue={1} />{" "}
            </Col>
          </Row>
          <Button onClick={handleSubmit}>Submit</Button>
        </Container>

        <Container>
          <DataTable
            data={filteredSelectedItems}
            onDelete={deleteItemByIndex}
            onFilter={filter}
            onSort={sort}
          />
        </Container>
      </TotalPriceContext.Provider>
    </>
  );
}

export default App;