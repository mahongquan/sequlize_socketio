import React from 'react';
import ReactDOM from 'react-dom';
import Store from './reducers/store';
import App from './App2';
export default class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Store.Provider>
        <App store={Store} />
      </Store.Provider>
    );
  }
}
