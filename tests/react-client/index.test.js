var expect = require('chai').expect;
var ReactTestUtils = require('react-dom/test-utils');
var React = require('react');
var AppLoggedOut = require('../../react-client/src/components/loggedOutComponents/AppLoggedOut.jsx');
var AppLoggedIn = require('../../react-client/src/components/loggedInComponents/AppLoggedIn.jsx');

var enzyme = require('enzyme');

describe('appLoggedOut', function() {

  // var {
  //   Simulate,
  //   renderIntoDocument,
  //   findRenderedDOMComponentWithClass,
  //   scryRenderedDOMComponentsWithClass
  // } = ReactTestUtils;

  var wrapper = enzyme.shallow(<AppLoggedOut />);
  // var appLoggedOut;

  beforeEach(function() {
    // TODO
    // appLoggedOut = renderIntoDocument(
    //   <AppLoggedOut />
    // );
  });

  xit('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(AppLoggedOut)).to.be.true;
  });

  xit('should render a single sign up form', function() {
    var signUpForm = findRenderedDOMComponentWithClass(AppLoggedOut, 'TODO');
    expect(signUpForm).to.exist;
  });

  xit('should send a POST request for sign up', function() {
    //TODO
  });

  xit('should send a POST request for login', function() {
    //TODO
  });

});
