import React from 'react';

var PendingSellerData = (props) => (
  <div>
    <li>
      Seller: {props.seller.first_name}
    </li>
    <li>
      Email: {props.seller.email}
    </li>
  </div>
);



// [ RowDataPacket { first_name: 'Billy', email: 'billy@bob.com' } ]



export default PendingSellerData;
