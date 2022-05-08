import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Client from './Client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ItemEdit from './ItemEdit';
import update from 'immutability-helper';
import { withStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// var _ = require('lodash');
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class DlgItems extends Component {
  mystate = {
    start: 0,
    limit: 7,
    baoxiang: '',
    logined: false,
    search: '',
  };
  state = {
    items: [],
    start: 0,
    total: 0,
    search: '',
    start_input: 1,
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.showModal && !this.props.showModal) {
      this.open();
    }
    if (nextProps.contact_id) {
      this.load_data(nextProps.contact_id);
    }
  }
  close = () => {
    console.log('close');
  };
  open = () => {
    this.loaddata();
  };
  loaddata = () => {
    Client.get(
      '/rest/Item',
      {
        start: this.mystate.start,
        limit: this.mystate.limit,
        query: this.mystate.search,
      },
      contacts2 => {
        console.log(contacts2);
        this.setState({
          items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          total: contacts2.total,
          start: this.mystate.start,
        });
        this.mystate.total = contacts2.total;
      }
    );
  };
  handlePrev = e => {
    this.mystate.start = this.mystate.start - this.mystate.limit;
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    //this.setState({start:start});
    this.loaddata();
  };
  handlePackItemChange = (idx, contact) => {
    console.log(idx);
    const contacts2 = update(this.state.items, { [idx]: { $set: contact } });
    console.log(contacts2);
    this.setState({ items: contacts2 });
  };
  handleNext = e => {
    this.mystate.start = this.mystate.start + this.mystate.limit;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  jump = () => {
    this.mystate.start = parseInt(this.state.start_input, 10) - 1;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };
  handleSearchChange = e => {
    this.mystate.search = e.target.value;
    this.setState({ search: this.mystate.search });
  };
  search = e => {
    this.mystate.start = 0;
    this.loaddata();
  };
  handleEdit = idx => {
    this.refs.dlg.open2(idx);
  };
  mapfunc = (contact, idx) => {
    if (!contact.image || contact.image === '')
      return (
        <TableRow key={idx}>
          <TableCell>{contact.id}</TableCell>
          <TableCell>{contact.bh}</TableCell>
          <TableCell>
            <Button variant="outlined" onClick={() => this.handleEdit(idx)}>
              {contact.name}
            </Button>
          </TableCell>
          <TableCell>{contact.guige}</TableCell>
          <TableCell>{contact.danwei}</TableCell>
          <TableCell />
        </TableRow>
      );
    else
      return (
        <TableRow key={idx}>
          <TableCell>{contact.id}</TableCell>
          <TableCell>{contact.bh}</TableCell>
          <TableCell>
            <Button variant="outlined" onClick={() => this.handleEdit(idx)}>
              {contact.name}
            </Button>
          </TableCell>
          <TableCell>{contact.guige}</TableCell>
          <TableCell>{contact.danwei}</TableCell>
          <TableCell>
            <img
              alt="no"
              src={'/media/' + contact.image}
              width="100"
              height="100"
            />
          </TableCell>
        </TableRow>
      );
  };
  render = () => {
    const contactRows = this.state.items.map(this.mapfunc);
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    //console.log(this.mystate);
    //console.log(this.state);
    if (this.state.start === 0) {
      hasprev = false;
    }
    //console.log(this.state.start+this.mystate.limit>=this.state.total);
    if (this.state.start + this.mystate.limit >= this.state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = (
        <Button variant="contained" onClick={this.handlePrev}>
          前一页
        </Button>
      );
    } else {
      prev = null;
    }
    if (hasnext) {
      next = (
        <Button variant="contained" onClick={this.handleNext}>
          后一页
        </Button>
      );
    } else {
      next = null;
    }
    return (
      <Dialog
        open={this.props.showModal}
        onClose={this.props.handleClose}
        fullScreen
      >
        <AppBar className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              
              onClick={this.props.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              
              className={this.props.classes.flex}
            >
              备件
            </Typography>
             <input
            type="text"
            value={this.state.search}
            placeholder=""
            onChange={this.handleSearchChange}
          />
          <Button
            id="id_bt_search"
            variant="contained"
            onClick={this.search}
          >
            搜索
          </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <ItemEdit ref="dlg" parent={this} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>编号</TableCell>
                <TableCell>名称</TableCell>
                <TableCell>规格</TableCell>
                <TableCell>单位</TableCell>
                <TableCell>图片</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="contact-list">{contactRows}</TableBody>
          </Table>
          {prev}
          <label id="page">
            {this.state.start + 1}../{this.state.total}
          </label>
          {next}
          <input
            maxLength="6"
            size="6"
            onChange={this.handlePageChange}
            value={this.state.start_input}
          />
          <Button
            variant="contained"
            id="page_go"
            className="btn btn-info"
            onClick={this.jump}
          >
            跳转
          </Button>
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(DlgItems);
