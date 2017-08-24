import React from 'react';
import $ from 'jquery';

class YourProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: 0
    };
  }

  componentDidMount () {
    this.setState ({
      userId: this.props.profileData.id
    },
    // this.getPastBoughtSoldPasses()
    );
  }

  componentDidUpdate() {
    this.getPastBoughtSoldPasses();
  }

  getPastBoughtSoldPasses() {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/pass/boughtsold',
      contentType: 'application/json',
      data: JSON.stringify({userId: this.state.userId}),
      success: function(boughtSold) {
				console.log(boughtSold, 'boughtSold')
      },
      error: function(xhr, error) {
        console.log('error:', error);
      }
    });
  }

  render() {
    return (
      <div className="about" >
        <br></br>
      <h2 className="profileHeader">
          Welcome to PassPass, {this.props.profileData.first_name}!
        </h2>
      </div>
    )
  }
}


//SELECT * FROM sold_passes WHERE seller_id = <CURRENT USER ID>
//SELECT * FROM sold_passes WHERE buyer_id = <CURRENT USER ID>


export default YourProfile;
