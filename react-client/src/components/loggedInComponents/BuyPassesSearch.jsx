import React from 'react';

class BuyPassesSearch extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render () {
    return (
      <form>
        <input className="form-control" placeholder="Email address" required autoFocus/>
        <input className="form-control" placeholder="Email address" required autoFocus/>
        <input className="form-control" placeholder="Email address" required autoFocus/>
        <input className="form-control" placeholder="Email address" required autoFocus/>
      </form>
    )
  }
}

export default BuyPassesSearch;