import React, {useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const [productData, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // useing async function it like using .then and .catch bu the code looks much cleaner
  const fetchProducts = async () => {
    // you call it a function
    // this is going to return a promise so we have to await to see what is inside of them promise
    // once we get the response we can destructure the data from that response
    // and data is going to be our product
    const { data } = await commerce.products.list();

    // were gonna set the data inside our products variable
    setProducts(data);
  }

  const fetchCart = async () => {
    // const cart = await commerce.cart.retrieve();

    // setCart(cart);
    // same as above but shorter
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);

    setCart(response.cart);

    // using destructuring
    // const {cart} = await commerce.cart.add(productId, quantity);

    // setCart(cart);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    // we put the quantity in a new object because quantity is one of the things we want to update
    const response = await commerce.cart.update(productId, {quantity});
    setCart(response.cart);
  }
  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  }
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
      // console.log(error);
    }
  }

  //this useEffect hook will its dependency array set to empty whichs means it will run a the start, at the render.
  // in class based component we would have used componentDidMount
  useEffect(() => {
    // inside here we can use that function call to fetch the products
    fetchProducts();
    fetchCart();
  }, [])

  console.log(cart);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products productData={productData} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            {/* were passing the cart that contains all the items in the cart as a prop to Cart component */}
            <Cart 
              cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout 
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
