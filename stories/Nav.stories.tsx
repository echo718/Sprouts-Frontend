import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import  Nav  from '../src/components/Nav/nav' ; 
import {BgProvider} from '../src/components/Theme/BgProvider';
import { FontProvider } from '../src/components/Theme/FontProvider';
import 'bootstrap/dist/css/bootstrap.css';

  export default {
    title: 'Nav',
    component: Nav,
    decorators:[(Story) => {
        return <Router> <BgProvider ><FontProvider>
        <Story />  </FontProvider></BgProvider></Router>
         
    }],
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    //     color: { control: 'color' },
    // },
  };

  
  export const nav = (args) => <Nav {...args} />
