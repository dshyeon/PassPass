import React from 'react';

const BuyPassesListItem = (props) => {
	var restricted;
	if (props.forSaleBlock.studios && props.forSaleBlock.studios !== 'none') {
		restricted = <div className="buyPassesListItemInfo">
									<b>No Passes Available For:</b>&nbsp;<div className="restrict">{props.forSaleBlock.studios.replace(',', ', ')}</div>
									</div>
	} else {
		restricted = '';
	}
	return (
		<div className="buyPassesListItem">
			<div className="buyPassesListItemColumnOne">
				<div className="buyPassesListItemInfo"><b>Seller:</b>&nbsp;{props.forSaleBlock.first_name}</div>
				<div className="buyPassesListItemInfo"><b>Email:</b>&nbsp;{props.forSaleBlock.email}</div>
				<div className="buyPassesListItemInfo"><b>Passes Available:</b>&nbsp;{props.forSaleBlock.pass_volume - props.forSaleBlock.passes_sold}</div>
				<div className="buyPassesListItemInfo"><b>Pass Price:</b>&nbsp;${props.forSaleBlock.current_price.toFixed(2)}</div>
			</div>
			<div className="buyPassesListItemColumnTwo">
				<div className="buyPassesListItemInfo"><b>Sale Period:</b>&nbsp;{new Date(props.forSaleBlock.period_start.slice(0, 10)).toDateString().slice(4) + ' through ' + new Date(props.forSaleBlock.period_end.slice(0, 10)).toDateString().slice(4)}</div>
				{restricted}
			</div>
		</div>
	);
};

export default BuyPassesListItem;

// .map((restrict) => (
// 										<div className="restrict">{restrict}</div>
// 									))