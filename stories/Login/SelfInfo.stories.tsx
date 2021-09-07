import React from 'react';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import SelfInfo from '../../src/components/Login/SelfInfo';
import { MemoryRouter } from 'react-router-dom';
import {BgProvider} from '../../src/components/Theme/BgProvider';
import { FontProvider } from '../../src/components/Theme/FontProvider';

var self = {
    name: "test",
    gitHub: "test",
    age: "test"
}

const data1 = {self}

storiesOf('GitLogin', module)
    .addDecorator(story => <div style={{ margin: 'auto' }}>{story()}</div>)
    .add('SelfInfo', data => (
        <MemoryRouter>
              <BgProvider>
                <FontProvider>
                <SelfInfo data={data1}  />
                </FontProvider>
                </BgProvider>
        </MemoryRouter>
    ));

