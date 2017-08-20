import React from 'react';
import SellPassesPassBlock from './SellPassesPassBlock.jsx';

var SellPassesList = (props) => (
  <div className="sellPassesList container">
    <div className="row"><h2 className="col">Passes You Are Selling</h2></div>
    {props.data.map(function (item, i) {
      return <SellPassesPassBlock BlockData={item} key={i}/>;
    })}
  </div>  
);

export default SellPassesList;
