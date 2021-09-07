import React from 'react';
import { storiesOf } from '@storybook/react';
import  HomePage  from '../../src/components/Home/HomePage' ; 
import { MemoryRouter } from 'react-router-dom';

storiesOf('HomePage',module)
  .add(' HomePage',data=>(
    <MemoryRouter> 
       <HomePage {...data} />
    </MemoryRouter>
  ));