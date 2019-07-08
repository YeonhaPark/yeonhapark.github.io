
// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Contacts from './Contacts';

describe('Contacts', () => {
  const props = {
    contacts: {
      email: 'yonaprisca@gmail.com',
      blog: 'http://yeonhapark.github.io',

      github: 'https://github.com/YeonhaPark',

    }
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Contacts {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
