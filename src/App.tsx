import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';

import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';

import GetMetrics  from './Features/getMetrics/getMetrics';
import MultiSelect  from './Features/getMetrics/MultiSelect.component'


const httpLink = createHttpLink({
  uri: 'https://react.eogresources.com/graphql',
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link:httpLink,
  cache
});

client.query({
  query: gql`
    {
    getMetrics,
    getLastKnownMeasurement(metricName: "waterTemp"){
      metric
      at
      value
      unit
  }
    }
  `
}).then(res => console.log(res));

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Wrapper>
          <Header />
          <NowWhat />
          <GetMetrics></GetMetrics>
          <MultiSelect></MultiSelect>
          <ToastContainer />
        </Wrapper>
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
