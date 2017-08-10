var expect = require('chai').expect;
var ReactTestUtils = require('react-dom/test-utils');
var React = require('react');

describe('signUp', function() {

  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  var signUp;

  beforeEach(function() {
    // TODO
    // signUp = renderIntoDocument(
    //   <SignUp searchYouTube={() => {}}/>
    // );
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(SignUp)).to.be.true;
  });

  xit('should render a single sign up form', function() {
    var signUpForm = findRenderedDOMComponentWithClass(signUp, 'TODO');
    expect(signUpForm).to.exist;
  });  

  xit('should send a POST request for sign up', function() {
    //TODO
  })

  xit('should send a POST request for login', function() {
    //TODO
  })

});