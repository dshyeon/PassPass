import React from 'react';

class BuyPassesSearch extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      startDateInput: '',
      endDateInput: '',
      priceInput: '',
      ratingInput: '',
      passesCountInput: '',
      gymInput: ''
    };
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSearch(this.state);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="buyPassesSearch container">
        <div className="row searchRow"><h2 className="col">For Sale</h2></div>
        <div className="row searchRow">
          <div className="buyPassesSearchInput col-sm">
            Start Date:
            <input value={this.state.startDateInput}
                   type="date"
                   onChange={this.handleChange.bind(this)}
                   id="startDateInput"
                   className="form-control"
                   placeholder="mm/dd/yyyy" />
          </div>
          <div className="buyPassesSearchInput col-sm">
            End Date:
            <input value={this.state.endDateInput} 
                   type="date"
                   onChange={this.handleChange.bind(this)}
                   id="endDateInput"
                   className="form-control"
                   placeholder="mm/dd/yyyy" />
          </div>
          <div className="buyPassesSearchInput col-sm">
            Maximum Price:
            <input value={this.state.priceInput} 
                   type="number" 
                   min="0"
                   step="0.01"
                   onChange={this.handleChange.bind(this)}
                   id="priceInput"
                   className="form-control" 
                   placeholder="e.g. 4.50" />
          </div>
        </div>
        <div className="row searchRow">
          <div className="buyPassesSearchInput col-sm">
            Minimum # of Passes:
            <input value={this.state.passesCountInput} 
                   type="number"
                   min="1"
                   step="1"
                   onChange={this.handleChange.bind(this)}
                   id="passesCountInput"
                   className="form-control" 
                   placeholder="e.g. 3" />
          </div>
          <div className="buyPassesSearchInput col-sm">
            Gym:
            <input value={this.state.gymInput}
                   type="text"
                   onChange={this.handleChange.bind(this)}
                   id="gymInput"
                   className="form-control" 
                   placeholder="e.g. Edmond Climbing" />
          </div>
          <div className="buyPassesSearchInput col-sm">
            <button className="searchButton btn btn-md btn-primary btn-block" type="submit">Search</button>
          </div>
        </div>
      </form>
    )
  }
}

export default BuyPassesSearch;
