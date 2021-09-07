import React from 'react';
import { storiesOf } from '@storybook/react';
import {BgProvider} from '../../src/components/Theme/BgProvider';
import { FontProvider } from '../../src/components/Theme/FontProvider';
import LogoutBtn from '../../src/components/Login/LogoutBtn';
import { MemoryRouter } from 'react-router-dom';

const data1 = () => {
    alert("Log out button has been clicked successfully.")
}
   


storiesOf('GitLogin', module)
    .add('LogoutBtn', data => (
        <MemoryRouter >
            <BgProvider>
                <FontProvider>
                <LogoutBtn {...data} logout = {() => data1()} />
                </FontProvider>
            </BgProvider>
        </MemoryRouter>
    )        
    );


