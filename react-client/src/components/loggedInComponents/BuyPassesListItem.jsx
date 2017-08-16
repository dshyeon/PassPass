import React from 'react';

const BuyPassesListItem = (props) => {
	var restricted;
	if (props.forSaleBlock.studio) {
		restricted = <div className="buyPassesListItemRowThree">
									No Passes Available For:
									{props.forSaleBlock.studio.split(',').map((restrict) => (
										<div>{restrict}</div>
									))}
									</div>
	} else {
		restricted = '';
	}
	return (
		<div>
			<div className="buyPassesListItemRowOne">
				<div>{props.forSaleBlock.first_name}</div>
				<div>Rating: {props.forSaleBlock.rating}</div>
				<div>{props.forSaleBlock.email}</div>
			</div>
			<div className="buyPassesListItemRowTwo">
				<div>{props.forSaleBlock.pass_volume - props.forSaleBlock.passes_sold} Passes Available</div>
				<div>Pass Price: ${props.forSaleBlock.current_price}</div>
				<div>Sale Period: {props.forSaleBlock.period_start.slice(0, 10) + ' through ' + props.forSaleBlock.period_end.slice(0, 10)}</div>
			</div>
			<div>
				{restricted}
			</div>
		</div>
	);
};

export default BuyPassesListItem;