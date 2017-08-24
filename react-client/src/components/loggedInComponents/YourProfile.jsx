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
    });
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
				if(boughtSold.length === 0) {
          console.log(boughtSold, 'NULLLL')
        } else {
          console.log(boughtSold, 'NOTNULLL')
        }
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
        <div className="profilePicture">PROFILE PICTURE MAYBE</div>
        <h2 className="profileHeader">
          Welcome to PassPass, {this.props.profileData.first_name}!
        </h2>
        <br></br>
        <ul className="profileList">
          Expired Passes
        </ul>
        <ul className="profileList">
          Currently Available Passes
        </ul>
        <ul className="profileList">
          Pending Passes
        </ul>
        <div className="profileQuote">
          Workout Quote
        </div>
      </div>
    )
  }
}

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
// }
//
// ReactDOM.render(
//   // Try changing to isLoggedIn={true}:
//   <Greeting isLoggedIn={false} />,
//   document.getElementById('root')
// );


//SELECT * FROM sold_passes WHERE seller_id = <CURRENT USER ID>
//SELECT * FROM sold_passes WHERE buyer_id = <CURRENT USER ID>


export default YourProfile;
