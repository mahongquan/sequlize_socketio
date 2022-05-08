import React, { Component } from 'react';
import Select from 'react-select'
import { colourOptions } from '../data';
import Client from './Client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
export default class WithCallbacks extends Component {
  state = { inputValue: '',options:[] ,menuIsOpen:false};
loadOptions = (inputValue, callback) => {
  // console.log("--------------------"+inputValue)
  Client.get(
    '/rest/Pack/',
    {
      start: 0,
      limit: 20,
      search: inputValue,
    },
    (res) => {
      // console.log(res);
      if (res.success) {
        this.setState({options:res.data})
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

  handleInputChange = (newValue) => {
    if(newValue.length>1)  {
      this.setState({inputValue: newValue });
      this.loadOptions(newValue);
    }
    // return newValue;
  };
  render() {
    // console.log(this.state);
    return (
     <Grid container spacing={1} style={{ maxWidth: '400px' }}>
        <Grid item xs={9}>
        <Select style={{ maxWidth: '400px' }}
          menuIsOpen={this.state.menuIsOpen}
          getOptionValue={(item)=>{
            return item
          }}
          getOptionLabel={(item)=>{
            return item.name
          }}
          options={this.state.options}
          onInputChange={this.handleInputChange}
          onMenuOpen={() => this.setState({ menuIsOpen: true })}
          onMenuClose={() => this.setState({ menuIsOpen: false })}
          onChange={this.props.onChange}
        />
        </Grid>
        <Grid item xs={3}>
        <Button onClick={()=>{
          this.setState({inputValue:"必备",menuIsOpen:true});
          this.loadOptions("必备");
        }} variant="outlined">
            必备
        </Button>
      </Grid>
      </Grid>
    );
  }
}