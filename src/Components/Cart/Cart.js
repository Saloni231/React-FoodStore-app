import React, { Fragment, useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Context/cart-context";
import CartItem from "./CartItem/CartItem";
import ConfirmOrder from "./confirmOrder";

const Cart = (props) => {
  const context = useContext(CartContext);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
  const [errorDetected, setErrorDetected] = useState(false);

  const totalAmount = `$${context.totalAmount.toFixed(2)}`;

  const hasItems = context.items.length > 0;

  const reduceItem = (id) => {
    context.removeItem(id);
  };

  const increaseItem = (item) => {
    context.addItem(item);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={reduceItem.bind(null, item.id)}
          onAdd={increaseItem.bind(null, item)}
        />
      ))}
    </ul>
  );

  const placeOrder = () => {
    setIsOrderPlaced(true);
  };

  const orderActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.modalHandler}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={placeOrder}>
          Order
        </button>
      )}
    </div>
  );

  const confirmOrderHandler = async (user) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-326e2-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          items: context.items,
        }),
      }
    );
    if (response.ok) {
      setIsSubmitting(false);
      setIsOrderSuccessful(true);
      context.emptyCart();
    } else {
      setIsSubmitting(false);
      setErrorDetected(true);
    }
  };

  let modalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isOrderPlaced && orderActions}
      {isOrderPlaced && (
        <ConfirmOrder
          onCancel={props.modalHandler}
          confirmOrderHandler={confirmOrderHandler}
        />
      )}
    </Fragment>
  );

  if (isSubmitting) {
    modalContent = <p>Sending Order Data . . .</p>;
  }

  if (isOrderSuccessful) {
    modalContent = (
      <Fragment>
        <p>Sucessfully sent the order!</p>
        <div className={styles.actions}>
          <button
            className={styles["button--alt"]}
            onClick={props.modalHandler}
          >
            Close
          </button>
        </div>
      </Fragment>
    );
  }

  if (errorDetected) {
    modalContent = (
      <Fragment>
        <p className={styles.error}>Some Error Occured!! Try Again Later</p>
        <div className={styles.actions}>
          <button
            className={styles["button--alt"]}
            onClick={props.modalHandler}
          >
            Close
          </button>
        </div>
      </Fragment>
    );
  }

  return <Modal modalHandler={props.modalHandler}>{modalContent}</Modal>;
};

export default Cart;
