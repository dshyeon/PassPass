import React from 'react';
import sinon from 'sinon';
import AppLoggedOut from '../../react-client/src/components/loggedOutComponents/AppLoggedOut.jsx';
import SignInBox from '../../react-client/src/components/loggedOutComponents/SignInBox.jsx';
import AppLoggedIn from '../../react-client/src/components/loggedInComponents/AppLoggedIn.jsx';
import BuyPasses from '../../react-client/src/components/loggedInComponents/BuyPasses.jsx';
import BuyPassesSearch from '../../react-client/src/components/loggedInComponents/BuyPassesSearch.jsx';
import BuyPassesList from '../../react-client/src/components/loggedInComponents/BuyPassesList.jsx';
import { shallow, mount } from 'enzyme';

describe('AppLoggedOut', () => {

  test('AppLoggedOut has SignInBox', () => {
    const app = shallow(<AppLoggedOut />);
    expect(app.find('SignInBox')).toHaveLength(1);
  });

  test('SignInBox renders correctly in AppLoggedOut', () => {
    const app = mount(<AppLoggedOut />);
    expect(app.find('input')).toHaveLength(3);
  });

  xdescribe('SignInBox', () => {
    test('POST called when sign in button is clicked', () => {
      // TODO fix signup to post to correct endpoint and for server to handle
      sinon.spy(SignInBox.prototype, 'handleSignIn');
      const app = mount(<SignInBox />);
      app.find('button').simulate('click');
      expect(SignInBox.prototype.handleSignIn.calledOnce).toBe(true);
    });
  
  });
});

describe('BuyPasses', () => {

  test('BuyPasses has BuyPassesSearch Component', () => {
    const buyPasses = shallow(<BuyPasses />);
    expect(buyPasses.find('BuyPassesSearch')).toHaveLength(1);
  });

  test('BuyPassesSearch has 5 inputs', () => {
    const buyPassesSearch = shallow(<BuyPassesSearch />);
    expect(buyPassesSearch.find('input')).toHaveLength(5);
  });

  test('BuyPasses has BuyPassesList Component', () => {
    const buyPasses = shallow(<BuyPasses />);
    expect(buyPasses.find('BuyPassesList')).toHaveLength(1);
  });

  describe('BuyPassesSearch', () => {
    test('handleSubmit called when search is submitted', () => {
      sinon.spy(BuyPassesSearch.prototype, 'handleSubmit');
      const buyPasses = mount(<BuyPasses />);
      buyPasses.find('form').simulate('submit');
      expect(BuyPassesSearch.prototype.handleSubmit.calledOnce).toBe(true);
    });
  
  });
});
