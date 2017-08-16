import React from 'react';
import $ from 'jquery';

//STUBBED TEST DATA
var PassData = [{Passes: 15, StartDate: 'June 3', EndDate: 'June 30', Exclusions: 'Neko Yoga'}, {Passes: 9, StartDate: 'July 6', EndDate: 'July 20', Exclusions: null}];
var UsersEmail = 'billy@bob.com';



class SellPasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentlySelling: null};
  }


componentDidMount() {
  console.log('MOUNTED');
  this.getInfo();
}


  getInfo () {
    console.log('getInfoClicked');
    $.ajax({
      method: 'GET',
      url: '/pass/seller/search',
      contentType: 'application/json',
      data: {users_email: UsersEmail},
      success: function(passesBeingSoldByBuyer) {console.log('ajax success', passesBeingSoldByBuyer);},
      error: function(err) { console.log('GETINFO FUNCTION FOR SELLPASSES FAILED', err)}
    })
  }



  render () {
    return (
      <div>
        <h2>Add Passes To Sell</h2>
        <AddPasses/>
        <PassList data = {PassData}/>
        <button type="button" onClick = {this.getInfo}>Refresh Information</button>
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

  render() {
    return (
      <div>
        <li>{this.props.BlockData.Passes} Passes For Dates: {this.props.BlockData.StartDate} - {this.props.BlockData.EndDate} || Exclusions: {this.props.BlockData.Exclusions} <button type="button">Edit This Post</button></li>
        <br />
      </div>
    ) 
  }
}




export default SellPasses;


