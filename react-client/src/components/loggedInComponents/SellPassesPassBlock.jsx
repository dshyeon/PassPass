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
      <div>
        <li>{this.props.BlockData.pass_volume} Passes Priced At ${this.dollars(this.props.BlockData.current_price)} Offered For Dates: {this.cleanDates(this.props.BlockData.period_start)} - {this.cleanDates(this.props.BlockData.period_end)} || Exclusions: {this.commentary(this.props.BlockData.exclusions)}<button type="button">Edit This Post</button></li>
        <br />
      </div>
    ); 
  }
}

export default SellPassesPassBlock;