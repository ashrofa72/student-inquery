import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'

function GoldPrice() {
  const [price, setPrice] = useState(0);
  const [pricedate, setPricedate] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
      const data = await response.json();
      console.log(data.date)
      setPricedate(data.date)
      setPrice(data.items[0].xauPrice);
    }
    fetchData();
  }, []);

  return (
    <div style={{height: '100vh'}}>
      <Navbar/>
      <h2 style={{textAlign: 'center',marginTop: '20px'}}>Gold Price</h2>
      <h2 style={{textAlign: 'center'}}>{pricedate}</h2>
      <strong style={{textAlign: 'center',fontSize: '25px'}}><p>${price}</p></strong>

    </div>
  );
}

export default GoldPrice;




