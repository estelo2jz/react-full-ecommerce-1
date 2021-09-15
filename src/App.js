import React, {useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components';
import './App.css';

const App = () => {
  const [productData, setProducts] = useState([]);

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

  //this useEffect hook will its dependency array set to empty whichs means it will run a the start, at the render.
  // in class based component we would have used componentDidMount
  useEffect(() => {
    // inside here we can use that function call to fetch the products
    fetchProducts();
  }, [])

  console.log(productData);

  return (
    <div className="App">
      <Navbar />
      <Products productData={productData} />
    </div>
  );
}

export default App;
