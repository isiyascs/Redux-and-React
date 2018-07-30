import React from "react";
import Product from "./Product";
import Cart from "./Cart.jsx";
import AddToCartButton from "./Button.jsx";
import RemoveFromCartButton from "./Button.jsx";
import DecrementFromCart from "./Button.jsx";
import Text from "./Text.jsx";
// CartList component (is a Stateless component)
export default ({
  cart,
  addToCart,
  removeFromCart,
  decrementFromCart,
  tc,
  textCount
}) => {
  //console.log("HII");
  return (
    <React.Fragment>
      <h2>Cart List </h2>
      <ul>
        {cart.map(product => (
          <Cart {...product}>
            {console.log("HELLO")}
            <AddToCartButton
              onClick={addToCart.bind(null, product.id)}
              message="+"
            />
            <Text
              // placeholder={product.count}
              onChange={textCount.bind(null, product.id)}
              id={product.id}
              value={product.count}
            />
            <DecrementFromCart
              onClick={decrementFromCart.bind(null, product.id)}
              message="-"
            />
            <RemoveFromCartButton
              onClick={removeFromCart.bind(null, product.id)}
              message="Remove From Cart"
            />
          </Cart>
        ))}
      </ul>
      <div>
        <span>Subtotal: </span>
        <strong>{tc}</strong>
      </div>
    </React.Fragment>
  );
};
