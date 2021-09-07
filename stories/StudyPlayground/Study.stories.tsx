 import React from 'react';
import { storiesOf } from '@storybook/react';
import  StudyPlayground  from '../../src/components/StudyPlayground/StudyPlayground' ; 
import { MemoryRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/client' ;
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ApolloClient from "apollo-client";
import {BgProvider} from '../../src/components/Theme/BgProvider';
import { FontProvider } from '../../src/components/Theme/FontProvider';
import 'bootstrap/dist/css/bootstrap.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri:'http://sproutsui.azurewebsites.net/graphql/'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('Token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "failed",
    }
  }
});


const client:any = new ApolloClient({
  cache,
  link:authLink.concat(link),
  
 })

const data1 =[
    {
      id:'1',
      content:'test',
      kidId:1,
      language:'test',
      created:Date
    },
    {
      id:'2',
      content:'test',
      kidId:1,
      language:'test',
      created:Date
    }
  ]

storiesOf('StudyPlayground',module)
.addDecorator(story => <div style={{ fontSize:"10px" }}>{story()}</div> )
  .add(' Study',data=>(
    <MemoryRouter> 
       <ApolloProvider client={client}> 
       <BgProvider>
         <FontProvider>
         <StudyPlayground data = {data1} />
         </FontProvider>
         </BgProvider> 
      
       </ApolloProvider>,
    </MemoryRouter>
  ));