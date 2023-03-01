import React, { useReducer } from "react";
import CartContext from "./cart-context";

const CartItemHandler = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const totalAmount =
      state.amount + action.payload.price * action.payload.amount;

    const index = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const itemExist = state.items[index];

    let updateItems;

    if (itemExist) {
      const updateItem = {
        ...itemExist,
        amount: itemExist.amount + action.payload.amount,
      };
      updateItems = [...state.items];
      updateItems[index] = updateItem;

      return { items: updateItems, amount: totalAmount };
    } else {
      return { items: state.items.concat(action.payload), amount: totalAmount };
    }
  } else if (action.type === "REMOVE_ITEM") {
    const index = state.items.findIndex((item) => item.id === action.payload);
    const itemToRemove = state.items[index];

    let updatedArray;

    if (itemToRemove.amount > 1) {
      const updateItem = {
        ...itemToRemove,
        amount: itemToRemove.amount - 1,
      };
      updatedArray = [...state.items];
      updatedArray[index] = updateItem;
      return { items: updatedArray, amount: state.amount - itemToRemove.price };
    } else {
      const totalAmount =
        state.amount - itemToRemove.price * itemToRemove.amount;

      updatedArray = state.items.filter((item) => item.id !== action.payload);

      return { items: updatedArray, amount: totalAmount };
    }
  } else if(action.type === "CLEAR_CART") {
    return {items: [], amount: 0}
  }
   else {
    return { items: [], amount: 0 };
  }
};

const CartContextProvider = (props) => {
  const [cartItems, dispatchItems] = useReducer(CartItemHandler, {
    items: [],
    amount: 0,
  });

  const addItemToCartHandler = (item) => {
    dispatchItems({ type: "ADD_ITEM", payload: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchItems({ type: "REMOVE_ITEM", payload: id });
  };

  const emptyCartHandler = () => {
    dispatchItems({type: 'CLEAR_CART'});
  }

  const cartContext = {
    items: cartItems.items,
    totalAmount: cartItems.amount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    emptyCart: emptyCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
