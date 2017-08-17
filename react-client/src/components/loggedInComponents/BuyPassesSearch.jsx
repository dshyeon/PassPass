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
      <form onSubmit={this.handleSubmit.bind(this)} className="buyPassesSearch">
        Start Date:
        <input value={this.state.startDateInput}
               type="date"
               onChange={this.handleChange.bind(this)}
               id="startDateInput"
               className="form-control buyPassesSearchInput" 
               autoFocus/>
        End Date:
        <input value={this.state.endDateInput} 
               type="date"
               onChange={this.handleChange.bind(this)}
               id="endDateInput"
               className="form-control buyPassesSearchInput"  
               autoFocus/>
        Maximum Price:
        <input value={this.state.priceInput} 
               type="number" 
               min="0"
               step="0.01"
               onChange={this.handleChange.bind(this)}
               id="priceInput"
               className="form-control buyPassesSearchInput" 
               placeholder="e.g. 4.50" 
               autoFocus/>
        Minimum # of Passes:
        <input value={this.state.passesCountInput} 
               type="number"
               min="1"
               step="1"
               onChange={this.handleChange.bind(this)}
               id="passesCountInput"
               className="form-control buyPassesSearchInput" 
               placeholder="e.g. 3" 
               autoFocus/>
        Gym:
        <input value={this.state.gymInput}
               type="text"
               onChange={this.handleChange.bind(this)}
               id="gymInput"
               className="form-control buyPassesSearchInput" 
               placeholder="e.g. Edmond Climbing" 
               autoFocus/>
        <button className="btn btn-md btn-primary btn-block buyPassesSearchInput" type="submit">Search</button>
      </form>
    )
  }
}

export default BuyPassesSearch;
