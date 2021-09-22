
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import { InMemoryCache,defaultDataIdFromObject  } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/client' ;
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ApolloClient from "apollo-client";
import 'bootstrap/dist/js/bootstrap.bundle.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'foo': return object.id; // use `key` as the primary key
    
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
})

const link = new HttpLink({
  //uri: 'https://localhost:5001/graphql/'
  uri:'https://sproutsui.azurewebsites.net/graphql/'
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


ReactDOM.render(
   <ApolloProvider client={client}>
        <App />
     </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
