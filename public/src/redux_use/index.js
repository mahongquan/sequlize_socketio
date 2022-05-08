import React from 'react';
import store from './reducers/store';
import { Provider } from 'react-redux';
import App from './App2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const outerTheme = createTheme({
});
export default class Index extends React.Component {
  render() {
    return (
    <ThemeProvider theme={outerTheme}>
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </ThemeProvider>
    );
  }
}
