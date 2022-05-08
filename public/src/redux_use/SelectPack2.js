import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';
import { colourOptions } from '../data';
import Client from './Client';
import Button from '@mui/material/Button';
const loadOptions = (inputValue, callback) => {
  Client.get(
    '/rest/Pack',
    {
      start: 0,
      limit: 20,
      search: inputValue,
    },
    (res) => {
      console.log(res);
      if (res.success) {
        callback(res.data);
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export default class WithCallbacks extends Component {
  state = { inputValue: '' };
  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        <pre>inputValue: "{this.state.inputValue}"</pre>
        <AsyncSelect
          getOptionValue={(item)=>{
            return item
          }}
          getOptionLabel={(item)=>{
            return item.name
          }}
          cacheOptions
          loadOptions={loadOptions}
          onInputChange={this.handleInputChange}
        />
        <Button onClick={()=>{
          this.setState({inputValue:"必备"});
        }} variant="outlined">
            必备
        </Button>
      </div>
    );
  }
}