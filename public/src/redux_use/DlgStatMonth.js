import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Client from './Client';
import UserDropDown from "./UserDropDown";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
class DlgStat extends Component {
  state = {
    error: '',
    baoxiang: '',
    data: [],
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.open();
    } else if (this.props.open && !nextProps.open) {
    }
  }
  close = () => {
    // this.setState({ showModal: false });
  };
  open = () => {
    this.loaddata('%');
  };
  loaddata = (baoxiang) => {
    var data = { baoxiang: baoxiang };
    Client.get('/rest/month12/', data, (result)=> {
      console.log(result);
      let data1 = [];
      for (var i = 0; i < result.lbls.length; i++) {
        data1.push({ month: result.lbls[i], count: result.values[i] });
      }
      this.setState({ data: data1 });
    });
  };
  onClickBaoxiang = (baoxiang) => {
    this.setState({ baoxiang: baoxiang });
    this.loaddata(baoxiang);
  };
  logChange = (val) => {
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
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose}>
        <DialogTitle>月统计</DialogTitle>
        <DialogContent>
          <UserDropDown title="" onSelect={this.onClickBaoxiang} />
          <span>{this.state.baoxiang}</span>
          <div style={{ width: '500px', height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={this.state.data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" barSize={20} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgStat;
