import React from 'react';
import $ from 'jquery';

var testData = 123;

class SellPassesPassBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      pass_volume: this.props.BlockData.pass_volume,
      passes_sold: this.props.BlockData.passes_sold,
      current_price: this.props.BlockData.current_price,
      current_start: this.formatDateForYYYMMDDOutPut(this.props.BlockData.period_start),
      current_end: this.formatDateForYYYMMDDOutPut(this.props.BlockData.period_end),
      excluded: this.props.BlockData.exclusions,
      current_block_id: this.props.id,
      last_state: {}
    };
  }

  //FORMAT DATES
  cleanDates (data) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var splitData = (data.split('-'));
    var year = splitData[0];
    var month = months[parseInt(splitData[1] - 1)];
    var day = splitData[2].substring(0, 2);
    return [day, ' ', month, ' ', year];
  }

  formatDateForYYYMMDDOutPut(rawDate) {
    var cutDate = rawDate.split('T');
    return cutDate[0];
  };

  //FORMAT NULL EXCLUSIONS
  commentary(data) {
    if (data === null) {
      return 'No Exclusions';
    } else {
      return data;
    }
  }

  uncommentForSQL(data) {
    if(data.length === 0) {
      return null;
    }
  }

  //FORMAT PRICE TO USD FORMAT
  dollars(num) {
    if(this.state.active === false) {
    return (num).toFixed(2);
    } else {
      return num;
    }
  }

  //ON EDIT POST BUTTON CLICK
  editPost() {
    if(this.state.active === false) {this.setState({active: true});
    } else {
      this.setState({active: false});
    }
    this.state.last_state = this.state;
  }

  addPass() {
    this.setState({pass_volume: this.state.pass_volume + 1});
  }

  subtractPass() {
    if(this.state.pass_volume > 0) {
      this.setState({pass_volume: this.state.pass_volume - 1});
    }
  }

  addPassSold() {
    this.setState({passes_sold: this.state.passes_sold + 1});
  }

  subtractPassSold() {
    if(this.state.passes_sold > 0) {
      this.setState({passes_sold: this.state.passes_sold - 1});
    }
  }

  cleanUpPriceInput(priceString) {
    return parseFloat(priceString);
  }

infoChanged () {
  var that = this;
    $.ajax({
      method: 'POST',
      url: '/pass/edit',
      contentType: 'application/json',
      data: JSON.stringify(that.state),
      context: this,
      success: function(res) {console.log(res)
        console.log('SUCCESS!!!! RES = ', res);
      },
      error: function(err) { console.log('INFOCHANGED FUNCTION FOR SELLPASSES FAILED', err); }
    });
  }

//UPON SAVE DATA CLICK
  saveNewBlockData() {
    this.editPost();
    this.state.last_state = {};
    console.log('NOW THE STATE SAVED WILL BE = ', this.state);
    this.infoChanged();
  }

  notSavingData() {
    this.state = this.state.last_state;
    this.setState({active: false});
    // this.editPost();
    console.log('NOW THE STATE SAVED WILL BE = ', this.state);
  }

  handleChangeExclusions(event) {
    this.setState({excluded: event.target.value});
  }

  handleChangePrice(event) {
    this.setState({current_price: parseFloat(event.target.value)});
  }

  handleChangeStart(event) {
    this.setState({current_start: event.target.value});
  }

  handleChangeEnd(event) {
    this.setState({current_end: event.target.value});
  }

  render() {
    // return (
    //   <div className="sellPassesPassBlock">
    //     <div className="row">
    //       <div className="col-sm">
    //         <div className="sellPassesPassBlockInfo">
    //           <b>Passes Available:</b>
    //           <div className="sellPassesPassBlockInfoContent">{this.props.BlockData.pass_volume}</div>
    //         </div>
    //         <div className="sellPassesPassBlockInfo">
    //           <b>Pass Price:</b>
    //           <div className="sellPassesPassBlockInfoContent">${this.props.BlockData.current_price.toFixed(2)}</div>
    //         </div>
    //       </div>
    //       <div className="col-sm">
    //         <div className="sellPassesPassBlockInfo">
    //           <b>Sale Period:</b>
    //           <div className="sellPassesPassBlockInfoContent">{new Date(this.props.BlockData.period_start.slice(0, 10)).toDateString().slice(4) + ' through ' + new Date(this.props.BlockData.period_end.slice(0, 10)).toDateString().slice(4)}</div>
    //         </div>
    //         <div className="sellPassesPassBlockInfo">
    //           <b>Restricted Studios:</b>
    //           <div className="restrict">{this.commentary(this.props.BlockData.exclusions)}</div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-md-3">
    //         <button className="editSaleButton btn btn-md btn-primary btn-block">Edit This Post</button>
    //       </div>
    //       <div className="col-md-9">
    //       </div>
    //     </div>
    //   </div>
    // ); 
    if(this.state.active === false) {
      return (
        <div>
          <li>{this.state.pass_volume} &nbsp;
          Passes Priced At ${this.dollars(this.state.current_price)} &nbsp;
          Offered For Dates: {this.cleanDates(this.state.current_start)} - {this.cleanDates(this.state.current_end)} &nbsp;
          ||&nbsp; Exclusions: {this.commentary(this.state.excluded)}<button className="editbutton" type="button" onClick={this.editPost.bind(this)}>Edit This Post</button></li>
          <br />
        </div>
      );
    } else {
      return (
        <div>
        <h3>Edit This Block Of Passes You Are Selling</h3>
        Pass Volume: <input type="text" value = {this.state.pass_volume}/>
        <button type="button" onClick={this.addPass.bind(this)}>+</button>
        <button type="button" onClick={this.subtractPass.bind(this)}>-</button>
        <br/>
        Passes You Have Sold From This Block: <input type="text" value = {this.state.passes_sold}/>
        <button type="button" onClick={this.addPassSold.bind(this)}>+</button>
        <button type="button" onClick={this.subtractPassSold.bind(this)}>-</button>
        <br/>
        Current Price: $<input type="number" step="0.01" min="0" value={this.dollars(this.state.current_price)} onChange={this.handleChangePrice.bind(this)}/>
        <br/>
        Start Date: <input type="date" className="form-control" id="addSaleDateStart" placeholder="Start Date" value={this.formatDateForYYYMMDDOutPut(this.state.current_start)} onChange={this.handleChangeStart.bind(this)} required />
        <br/>
        End Date: <input type="date" className="form-control" id="addSaleDateEnd" placeholder="End Date" value={this.formatDateForYYYMMDDOutPut(this.state.current_end)} onChange={this.handleChangeEnd.bind(this)} required />
        <br/>
        Current Exclusions: <input type="text" value = {(this.state.excluded === null) ? undefined : this.state.excluded} onChange={this.handleChangeExclusions.bind(this)}/>
        <br/>
        <br/>
        <button type="button" onClick={this.saveNewBlockData.bind(this)}>Save These Changes</button>
        <br/>
        <button type="button" onClick={this.notSavingData.bind(this)}>Do NOT Save These Changes</button>
        </div>
      )
    }
  }
}

export default SellPassesPassBlock;
