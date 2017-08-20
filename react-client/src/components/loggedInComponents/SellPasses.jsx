import React from 'react';
import $ from 'jquery';
import SellPassesAddSale from './SellPassesAddSale.jsx';
import SellPassesList from './SellPassesList.jsx';

//STUBBED TEST DATA
var UsersEmail = 'billy@bob.com';

// var PassData = [{"id":3,"email":"billy@bob.com","pass_volume":11,"seller_id":1,"current_price":10,"period_start":"2017-03-03T08:00:00.000Z","period_end":"2017-03-15T07:00:00.000Z","passes_sold":1,"exclusions":"Hardcore Cycle Spin"},{"id":4,"email":"billy@bob.com","pass_volume":9,"seller_id":1,"current_price":9.25,"period_start":"2017-04-01T07:00:00.000Z","period_end":"2017-04-19T07:00:00.000Z","passes_sold":1,"exclusions":null}];

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
      data: {users_email: UsersEmail},
      context: this,
      success: function(passesBeingSoldByBuyer) {console.log('ajax success', passesBeingSoldByBuyer);
        this.setState({currentlySelling: passesBeingSoldByBuyer});
        // console.log('STATE', this.state.currentlySelling);
      },
      error: function(err) { console.log('GETINFO FUNCTION FOR SELLPASSES FAILED', err); }
    });
  }

  render () {
    return (
      <div className="sellPasses">
        <SellPassesAddSale />
        <SellPassesList data={this.state.currentlySelling}/>
        {/*<button type="button" onClick = {this.getInfo}>Refresh Information</button>*/}
      </div>
    );
  }
}

export default SellPasses;
