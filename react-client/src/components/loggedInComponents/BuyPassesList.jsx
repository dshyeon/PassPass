import React from 'react';
import BuyPassesListItem from './BuyPassesListItem.jsx';

const BuyPassesList = (props) => (
	<div className="buyPassesList">
		{props.forSaleBlocks.map((forSaleBlock) => (
			<BuyPassesListItem forSaleBlock={forSaleBlock}/>
		))}
	</div>
);

export default BuyPassesList;