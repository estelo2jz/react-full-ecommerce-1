import React, {useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';
import './App.css';

const App = () => {
  const [productData, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  //this useEffect hook will its dependency array set to empty whichs means it will run a the start, at the render.
  // in class based component we would have used componentDidMount
  useEffect(() => {
    // inside here we can use that function call to fetch the products
    fetchProducts();
    fetchCart();
  }, [])

  console.log(cart);

  return (
    <div className="App">
      <Navbar totalItems={cart.total_items} />
      {/* <Products productData={productData} onAddToCart={handleAddToCart} /> */}

      {/* were passing the cart that contains all the items in the cart as a prop to Cart component */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
