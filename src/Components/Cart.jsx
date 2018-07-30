import React from "react";
import CartList from "./CartList";
// Product component (is a Stateless component)
export default ({ id, name, price, count, change, children }) => (
  <div>
    <li className="product">
      <div className="inline">
        Item: {name} <br />
        Count: {count}
        <br />
        {children}
      </div>
    </li>
  </div>
);
