import React, { Component } from 'react';
import DropdownButton from './DropdownButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Client from './Client';
import { Bar } from 'react-chartjs-2';

//import Select from 'react-select';
//import 'react-select/dist/react-select.css';
var _ = require('lodash');
class DlgStat extends Component {
  state = {
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    baoxiang: '',
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    ) {
      return true;
    } else {
      return false;
    }
  }
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({ showModal: true });
    this.loaddata('%');
  };
  loaddata = baoxiang => {
    var self = this;
    var data = { limit: 10, search: 'xls', baoxiang: baoxiang };
    Client.get('/rest/month12', data, function(result) {
      console.log(result);
      self.setState({ lbls: result.lbls, values: result.values, baoxiang: '' });
    });
  };
  onClickBaoxiang = baoxiang => {
    this.setState({ baoxiang: baoxiang });
    this.loaddata(baoxiang);
  };
  logChange = val => {
    console.log('Selected: ' + JSON.stringify(val));
    if (val != null) {
      this.setState({ baoxiang: val.value });
      this.loaddata(val.value);
    } else {
      this.setState({ baoxiang: '%' });
      this.loaddata('%');
    }
  };
  render = () => {
    var bg = []; //values.length);
    for (var i = 0; i < this.state.values.length; i++) {
      bg.push('rgba(95, 192, 99, 1)');
    }
    var data = {
      labels: this.state.lbls,
      datasets: [
        {
          label: '调试台数',
          data: this.state.values,
          backgroundColor: bg,
          borderWidth: 2,
        },
      ],
    };
    //console.log(data);
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
        <DialogTitle>月统计</DialogTitle>
        <DialogContent>
          <DropdownButton title={this.state.baoxiang} id="id_dropdown2">
            <MenuItem onClick={() => this.onClickBaoxiang('马红权')}>
              马红权
            </MenuItem>
            <MenuItem onClick={() => this.onClickBaoxiang('陈旺')}>
              陈旺
            </MenuItem>
            <MenuItem onClick={() => this.onClickBaoxiang('吴振宁')}>
              吴振宁
            </MenuItem>
            <MenuItem onClick={() => this.onClickBaoxiang('%')}>*</MenuItem>
          </DropdownButton>
          <Bar data={data} options={options} width={600} height={300} />
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgStat;
