import React from 'react';
import SellPassesPassBlock from './SellPassesPassBlock.jsx';

var SellPassesList = (props) => (
  <div>
    <h2>The Passes You Are Currently Offering For Sale</h2>
    <ul>
      {props.data.map(function (item, i) {
        return <SellPassesPassBlock BlockData={item} key={i}/>;
      })}
    </ul>
  </div>  
);

export default SellPassesList;
