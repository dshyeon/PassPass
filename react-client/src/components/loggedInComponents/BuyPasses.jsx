import React from 'react';
import $ from 'jquery';
import BuyPassesList from './BuyPassesList.jsx';
import BuyPassesSearch from './BuyPassesSearch.jsx';

class BuyPasses extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      userEmail: 'billy@bob.com',
      forSaleBlocks: []
    };
  }

  updateForSaleBlocks(forSaleBlocks) {
    var newState = Object.assign({}, this.state);
    newState.forSaleBlocks = forSaleBlocks;
    this.setState(newState);
  }

  componentDidMount() {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/pass/buyer/search',
      contentType: 'application/json',
      data: JSON.stringify({ignoreUserEmail: context.state.userEmail}),
      success: function(forSaleBlocks) {
        context.updateForSaleBlocks(JSON.parse(forSaleBlocks));
      }
    });
  }

  render () {
    return (
      <div>
        <BuyPassesSearch />
        <BuyPassesList forSaleBlocks={this.state.forSaleBlocks}/>
      </div>
    )
  }
}

export default BuyPasses;