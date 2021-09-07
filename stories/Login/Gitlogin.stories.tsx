import React from 'react';
import { storiesOf } from '@storybook/react';

import GitLogin from '../../src/components/Login/GitLogin';
import { MemoryRouter } from 'react-router-dom';


const login = () => {
  alert("Login button has been clicked successfully.")
}

storiesOf('GitLogin', module)
  .add('gitlogin', data => (
    <MemoryRouter>
      <GitLogin {...data} />
    </MemoryRouter>
  ));
