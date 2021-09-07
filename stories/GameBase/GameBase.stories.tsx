import React from 'react';
import { storiesOf } from '@storybook/react';
import  GameBase  from '../../src/components/GameBase/GameBase' ; 
import { MemoryRouter } from 'react-router-dom';

storiesOf('GameBase',module)
  .add(' GameBase',data=>(
    <MemoryRouter> 
       <GameBase {...data} />
    </MemoryRouter>
  ));