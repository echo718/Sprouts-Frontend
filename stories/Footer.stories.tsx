import React from 'react';
import  Footer  from '../src/components/footer' ; 
import {BgProvider} from '../src/components/Theme/BgProvider';
import { FontProvider } from '../src/components/Theme/FontProvider';

export default {
  title: 'Footer',
  component: Footer,
  decorators:[(Story) => {
      return <BgProvider ><FontProvider>
       <Story /> </FontProvider></BgProvider>
  }],

};

export const footer = (args) => <Footer {...args} />


