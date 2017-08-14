import React from 'react';
import BuyPassesListItem from './BuyPassesListItem.jsx';

const BuyPassesList = (props) => (
	<div>
		<h1>Passes For Sale</h1>
		{props.forSaleBlocks.map((forSaleBlock) => (
			<BuyPassesListItem forSaleBlock={forSaleBlock}/>
		))}
	</div>
);

export default BuyPassesList;