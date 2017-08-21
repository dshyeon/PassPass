import React from 'react';
import $ from 'jquery';
import SellPassesAddSale from './SellPassesAddSale.jsx';
import SellPassesList from './SellPassesList.jsx';

class SellPasses extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {currentlySelling: []};
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo () {
    $.ajax({
      method: 'GET',
      url: '/pass/seller/search',
      contentType: 'application/json',
      context: this,
      success: function(passesBeingSoldByBuyer) {console.log('ajax success', passesBeingSoldByBuyer);
        this.setState({currentlySelling: passesBeingSoldByBuyer});
        console.log('STATE', this.state.currentlySelling);
      },
      error: function(err) {console.log('GETINFO FUNCTION FOR SELLPASSES FAILED', err);}
    });
  }

  render () {
    return (
      <div className="sellPasses">
        <SellPassesAddSale />
        <SellPassesList className="sellPassesList" data={this.state.currentlySelling}/>
      </div>
    );
  }
}

export default SellPasses;
