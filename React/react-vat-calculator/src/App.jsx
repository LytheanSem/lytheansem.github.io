import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(0);

  const handlerPrice = (e) => {
    const price = e.target.value;
    console.log(price);
    setPrice(price);
    let v = (price - discount) * 0.07;
    setVat(Math.round(v * 100) / 100);
  };
  const handlerDiscount = (e) => {
    const d = e.target.value;
    setDiscount(d);
    let v = (price - discount) * 0.07;
    setVat(Math.round(v * 100) / 100);
  };

  return (
    <>
      <label>
        <h1>Price:</h1>
      </label>
      <input
        type="number"
        value={price}
        style={{ fontSize: "20pt" }}
        onChange={handlerPrice}
      />

      <label>
        <h1>Discount:</h1>
      </label>
      <input
        type="number"
        value={discount}
        style={{ fontSize: "20pt" }}
        onChange={handlerDiscount}
      />

      <h1>Gross Price = {price - discount}</h1>
      <h1>Vat = {vat}</h1>
    </>
  );
}

export default App;
