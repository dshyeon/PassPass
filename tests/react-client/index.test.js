var expect = require('chai').expect;
var ReactTestUtils = require('react-dom/test-utils');
var React = require('react');
var AppLoggedOut = require('../../react-client/src/index.jsx');
var AppLoggedIn = require('../../react-client/src/loggedIn.jsx');

describe('appLoggedOut', function() {

  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  var appLoggedOut;

  beforeEach(function() {
    // TODO
    // appLoggedOut = renderIntoDocument(
    //   <AppLoggedOut />
    // );
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(AppLoggedOut)).to.be.true;
  });

  xit('should render a single sign up form', function() {
    var signUpForm = findRenderedDOMComponentWithClass(appLoggedOut, 'TODO');
    expect(signUpForm).to.exist;
  });  

  xit('should send a POST request for sign up', function() {
    //TODO
  })

  xit('should send a POST request for login', function() {
    //TODO
  })

});