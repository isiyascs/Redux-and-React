import React, { Component } from "react";
import ReactDOM from "react-dom";
import { pages } from "./Constants";
import ProductList from "./Components/ProductList";
import CartList from "./Components/CartList";
import Button from "./Components/Button";
import { getProducts, findProductById } from "./api";
//var totalCount = 0;

// App Component (is a stateful component)
export default class App extends Component {
  constructor(props) {
    super(props);
    // Sets the initial state.
    this.state = {
      currentPage: pages.PRODUCT_LIST, // Initial page is PRODUCT_LIST
      isLoading: true, // Should show loading until the products are loaded.
      products: [], // Initially the products list is empty
      cart: [], // Initially the cart list is empty
      totalCount: 0,
      totalCost: 0
    };
  }

  /**
   * componentDidMount is a React lifecycle method
   * that would be called immediately after the component is
   * mounted in the DOM.
   * Should make all the asynchronous or side effect casusing calls
   * from here.
   * Since we are using `await` inside this method
   * `async` is needed in front of this method signature.
   */
  async componentDidMount() {
    // Get the products this is an async function
    // returns a Promise
    const products = await getProducts();
    // Sets the products and isLoading to false
    this.setState({ products, isLoading: false });
  }

  /**
   * Sets the currentPage as CART_LIST
   */
  goToCart = () => {
    this.setState({
      currentPage: pages.CART_LIST
    });
  };

  /**
   * Sets the currentPage as PRODUCT_LIST
   */
  goToCatalog = () => {
    this.setState({
      currentPage: pages.PRODUCT_LIST
    });
  };

  /**
   * Add product to the cart list
   */
  addToCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    if (cart.includes(product)) {
      this.setState({});
    } else {
      this.setState({
        cart: [...cart, product]
      });
    }
    product.count++;
    this.setState({
      totalCost: this.state.totalCost + product.price,
      totalCount: this.state.totalCount + 1
    });
  };

  /**
   * Remove product from cart
   */

  removeFromCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    this.setState({
      totalCost: this.state.totalCost - product.count * product.price,
      totalCount: this.state.totalCount - product.count
    });
    product.count = 0;
    cart.splice(cart.indexOf(product), 1); //Deleting from the index
    this.setState({
      cart: [...cart]
    });
  };

  /*
 * Function that manages the Textfield in cart
 */
  textCount = productId => {
    var val = document.getElementById(productId).value;
    var numberCheck = document.getElementById(productId);
    numberCheck.onkeydown = function(e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        return false;
      }
    };
    console.log(productId, val);
    const product = findProductById(productId);
    var difference = val - product.count;
    product.count = val;
    this.setState({
      totalCost: this.state.totalCost + product.price * difference,
      totalCount: this.state.totalCount + difference
    });
    if (val === "0") {
      const { cart } = this.state;
      const product = findProductById(productId);
      cart.splice(cart.indexOf(product), 1);
      this.setState({ cart: [...cart] });
    }
  };

  /**
   * Decrement a quantity of product from cart
   */
  decrementFromCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);

    if (product.count >= 1 && this.state.totalCount > 0) {
      this.setState({
        totalCost: this.state.totalCost - product.price,
        totalCount: this.state.totalCount - 1
      });
      product.count--;
    }
    if (product.count === 0) {
      cart.splice(cart.indexOf(product), 1);
    }
    this.setState({
      cart: [...cart]
    });
  };

  render() {
    const { isLoading, currentPage, cart, products } = this.state;

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    const listing =
      currentPage === pages.PRODUCT_LIST ? (
        <ProductList products={products} addToCart={this.addToCart} />
      ) : (
        <CartList
          cart={cart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
          decrementFromCart={this.decrementFromCart}
          tc={this.state.totalCost}
          textCount={this.textCount}
        />
      );

    let navBtnMsg, navBtnFn;
    if (currentPage === pages.PRODUCT_LIST) {
      navBtnMsg = `Cart(${this.state.totalCount})`;
      navBtnFn = this.goToCart;
    } else {
      navBtnMsg = "Back";
      navBtnFn = this.goToCatalog;
    }

    return (
      <div>
        <Button
          className="goto-cart-btn"
          onClick={navBtnFn}
          message={navBtnMsg}
        />
        {listing}
      </div>
    );
  }
}
