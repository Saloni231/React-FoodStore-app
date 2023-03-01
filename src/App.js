import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Context/CartProvider";

function App() {

  const [cartIsVisible, setCartIsVisible] = useState(false);

  const modalHandler = () => {
    setCartIsVisible(!cartIsVisible);
  }

  return (
    <CartContextProvider>
      <Header modalHandler={modalHandler} />
      {cartIsVisible && <Cart modalHandler={modalHandler} />}
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;