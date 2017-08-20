import React from 'react';
import BuyPassesListItem from './BuyPassesListItem.jsx';

const BuyPassesList = (props) => (
	<div className="buyPassesList container">
    <div className="row searchRow"><h2 className="col">Passes Available For Sale</h2></div>
		{props.forSaleBlocks.map((forSaleBlock) => (
			<BuyPassesListItem forSaleBlock={forSaleBlock}/>
		))}
	</div>
);

export default BuyPassesList;
