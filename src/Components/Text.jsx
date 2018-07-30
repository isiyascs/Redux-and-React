import React from "react";

//Textbox component is a stateless component
export default ({ onChange, value, id }) => (
  <input type="number" min="0" onChange={onChange} id={id} value={value} />
);
