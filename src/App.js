import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [coinPerPage, setPage] = useState('')

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=${coinPerPage}&page=1&sparkline=false`)
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
  }, [coinPerPage]);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleCoinPerPageChange = e => {
    setPage(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <div className="coin-search-row">
          <form>
            <input type="text" placeholder="Search" className="coin-input"
              onChange={handleChange}
            />
          </form>
          <form>
            <select onChange={handleCoinPerPageChange} className="coin-per-page">
              <option value="100">100</option>
              <option value="50">50</option>
              <option value="25">25</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
          </form>
        </div>
        
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })}

    </div>
  );
}

export default App;
