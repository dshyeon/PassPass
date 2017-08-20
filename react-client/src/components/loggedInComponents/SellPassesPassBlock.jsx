import React from 'react';

class SellPassesPassBlock extends React.Component {
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
    var day = splitData[2].substring(0, 2);
    return [day, ' ', month, ' ', year];
  }

  //FORMAT NULL EXCLUSIONS
  commentary(data) {
    if (data === null) {
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
      <div className="sellPassesPassBlock">
        <div className="row">
          <div className="col-sm">
            <div className="sellPassesPassBlockInfo">
              <b>Passes Available:</b>
              <div className="sellPassesPassBlockInfoContent">{this.props.BlockData.pass_volume}</div>
            </div>
            <div className="sellPassesPassBlockInfo">
              <b>Pass Price:</b>
              <div className="sellPassesPassBlockInfoContent">${this.props.BlockData.current_price.toFixed(2)}</div>
            </div>
          </div>
          <div className="col-sm">
            <div className="sellPassesPassBlockInfo">
              <b>Sale Period:</b>
              <div className="sellPassesPassBlockInfoContent">{new Date(this.props.BlockData.period_start.slice(0, 10)).toDateString().slice(4) + ' through ' + new Date(this.props.BlockData.period_end.slice(0, 10)).toDateString().slice(4)}</div>
            </div>
            <div className="sellPassesPassBlockInfo">
              <b>Restricted Studios:</b>
              <div className="restrict">{this.commentary(this.props.BlockData.exclusions)}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <button className="editSaleButton btn btn-md btn-primary btn-block">Edit This Post</button>
          </div>
          <div className="col-md-9">
          </div>
        </div>
      </div>
    ); 
  }
}

export default SellPassesPassBlock;