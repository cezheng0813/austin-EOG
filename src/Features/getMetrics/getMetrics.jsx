import { Query } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, gql } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as React from 'react';

const httpLink = createHttpLink({
  uri: 'https://react.eogresources.com/graphql',
});
const cache = new InMemoryCache();
// const client = new ApolloClient({
//   link:httpLink,
//   cache
// });
// const names = [];
// client.query({
//   query: gql`
//     {
//     getMetrics,
//     }
//   `
// }).then(res=> console.log(res))




const GET_METRICS_QUERY = gql`
    {
    getMetrics
    }
`;
const GetMetrics = () => (
    <Query query={GET_METRICS_QUERY}>
    {
       ({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
    
        return data.getMetrics.map(item => (
          <li key={item}>{item}</li>
          
          ))
       } 
    }

    </Query>
)

export default GetMetrics;
