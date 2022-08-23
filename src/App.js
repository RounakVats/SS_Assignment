import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { FixedSizeList as List } from "react-window";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetchProducts();
  },[]);

  const fetchProducts = async () =>{
    const {data} = await axios.get("https://s3.amazonaws.com/open-to-cors/assignment.json");
    const arr = Object.values(data.products);
    setProducts(arr.sort((a, b) => a.popularity - b.popularity));
  }

  return (
    <div className="App">
      <header className="App-header">Demo App</header>
      <List
        innerElementType="ul"
        itemCount={products.length}
        itemSize={20}
        height={600}
      >
        {({ index, style }) => {
          return (
            <li style={style}>
              {products[index].title+" costs "+products[index].price+" Rs"}
            </li>
          );
        }}
      </List>
    </div>
  );
}

export default App;
