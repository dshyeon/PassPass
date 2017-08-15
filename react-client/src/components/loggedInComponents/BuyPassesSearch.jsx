import React from 'react';

class BuyPassesSearch extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      startDateInput: '',
      endDateInput: '',
      priceInput: '',
      ratingInput: '',
      passesCountInput: ''
    };
  }

  handleChangeStartDateInput (event) {
    var newState = Object.assign({}, this.state);
    newState.startDateInput = event.target.value;
    this.setState(newState);
  }

  handleChangeEndDateInput (event) {
    var newState = Object.assign({}, this.state);
    newState.endDateInput = event.target.value;
    this.setState(newState);
  }

  handleChangePriceInput (event) {
    var newState = Object.assign({}, this.state);
    newState.priceInput = event.target.value;
    this.setState(newState);
  }

  handleChangeRatingInput (event) {
    var newState = Object.assign({}, this.state);
    newState.ratingInput = event.target.value;
    this.setState(newState);
  }

  handleChangePassesCountInput (event) {
    var newState = Object.assign({}, this.state);
    newState.passesCountInput = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSearch(this.state);
    this.setState({
      startDateInput: '',
      endDateInput: '',
      priceInput: '',
      ratingInput: '',
      passesCountInput: ''
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="buyPassesSearch">
        Start Date:
        <input value={this.state.startDateInput}
               pattern="\d{4}-\d{1,2}-\d{1,2}"
               onChange={this.handleChangeStartDateInput.bind(this)}
               className="form-control buyPassesSearchInput" 
               placeholder="yyyy-mm-dd" 
               autoFocus/>
        End Date:
        <input value={this.state.endDateInput} 
               pattern="\d{4}-\d{1,2}-\d{1,2}"
               onChange={this.handleChangeEndDateInput.bind(this)}
               className="form-control buyPassesSearchInput" 
               placeholder="yyyy-mm-dd" 
               autoFocus/>
        Maximum Price:
        <input value={this.state.priceInput} 
               onChange={this.handleChangePriceInput.bind(this)}
               className="form-control buyPassesSearchInput" 
               placeholder="e.g. 4.50" 
               autoFocus/>
        Minimum Rating:
        <input value={this.state.ratingInput} 
               pattern="\d{1}"
               onChange={this.handleChangeRatingInput.bind(this)}
               className="form-control buyPassesSearchInput" 
               placeholder="1-5" 
               autoFocus/>
        Minimum # of Passes:
        <input value={this.state.passesCountInput} 
               onChange={this.handleChangePassesCountInput.bind(this)}
               className="form-control buyPassesSearchInput" 
               placeholder="e.g. 3" 
               autoFocus/>
        <button className="btn btn-md btn-primary btn-block buyPassesSearchInput" type="submit">Search</button>
      </form>
    )
  }
}

export default BuyPassesSearch;