import React from 'react';

class Interactions extends React.Component {
	constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="interactionsRow">
        <div className="interactionsContainer">
          <div>
            <small>Welcome To PassPass!</small>
          </div>
          <br></br>
          <div>
            <smallest>Are you looking to</smallest>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">BUY PASSES</button>
          <div>
            <smallest>OR</smallest>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">SELL PASSES</button>
        </div>
      </div>
    )
  }
}

export default Interactions;
