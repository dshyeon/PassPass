var expect = require('chai').expect;
var ReactTestUtils = require('react-dom/test-utils');

describe('App', function() {

  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  beforeEach(function() {
    // index = <index? >
  });

  describe('Test category 1', function() {
    it('should render login page', function() {
      expect(React.Component.isPrototypeOf(App)).to.be.true;
    });
  });

});