import React from 'react';
import sinon from 'sinon';
import AppLoggedOut from '../../react-client/src/components/loggedOutComponents/AppLoggedOut.jsx';
import SignInBox from '../../react-client/src/components/loggedOutComponents/SignInBox.jsx';

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

  describe('SignInBox', () => {
    test('POST called when sign in button is clicked', () => {
      sinon.spy(SignInBox.prototype, 'handleSignIn');
      const app = mount(<SignInBox />);
      app.find('button').simulate('click');
      expect(SignInBox.prototype.handleSignIn.calledOnce).toBe(true);
    });
  
  });
});
