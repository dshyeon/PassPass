import React from 'react';
import $ from 'jquery';

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
    var that = this;

    $.ajax({
      method: 'GET',
      url: '/pass/seller/search',
      contentType: 'application/json',
      data: {users_email: UsersEmail},
      success: function(passesBeingSoldByBuyer) {console.log('ajax success', passesBeingSoldByBuyer);
      that.setState({currentlySelling: passesBeingSoldByBuyer});
      // console.log('STATE', that.state.currentlySelling);
    },
      error: function(err) {console.log('GETINFO FUNCTION FOR SELLPASSES FAILED', err)}
    })
  }



  render () {
    return (
      <div>
        <h2>Add Section To Add New Passes To Sell Here</h2>
        <AddPasses/>
        <PassList data = {this.state.currentlySelling}/>
        {/*<button type="button" onClick = {this.getInfo}>Refresh Information</button>*/}
      </div>
    )
  }
}




//PLACEHOLDER LOCATION TO ADD NEW SALES MODULE
var AddPasses = () => (
  <div>
  <p>Place Options to add passes for sale here.</p>
  </div>
)


var PassList = (props) => (
  <div>
    <h2>The Passes You Are Currently Offering For Sale</h2>
    <ul>
      {props.data.map(function (item, i) {
        return <PassBlock BlockData = {item} key = {i}/>
      })}
    </ul>
  </div>  
)



class PassBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //FORMAT DATES
  cleanDates (data) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var splitData = (data.split('-'));
    var year = splitData[0];
    var month = months[parseInt(splitData[1] - 1)];
    var day = splitData[2].substring(0,2);
    return[day, ' ', month, ' ', year];
  };

  //FORMAT NULL EXCLUSIONS
  commentary(data) {
    if(data === null) {
      return 'No Exclusions';
    } else {
      return data;
    }
  }

  //FORMAT TO USD FORMAT
  dollars(num) {
   return (num).toFixed(2);
  }

  render() {
    return (
      <div>
        <li>{this.props.BlockData.pass_volume} Passes Priced At ${this.dollars(this.props.BlockData.current_price)} Offered For Dates: {this.cleanDates(this.props.BlockData.period_start)} - {this.cleanDates(this.props.BlockData.period_end)} || Exclusions: {this.commentary(this.props.BlockData.exclusions)}<button type="button">Edit This Post</button></li>
        <br />
      </div>
    ) 
  }
}



export default SellPasses;


