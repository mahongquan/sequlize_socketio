import React from 'react';
import Browser from './Browser';
import io from 'socket.io-client';
const HOST = 'http://localhost:8000';
var socket = io.connect(HOST);
export default class DlgFolder2 extends React.Component {
  state = {
    initpath: '.',
    showModal: false,
    hiddenPacks: true,
    error: '',
  };
  close = () => {
    this.setState({ showModal: false, initpath: '.' });
  };

  open = () => {
    this.setState({ showModal: true });
  };
  render = () => {
    return <Browser socket={socket} initpath={this.state.initpath} />;
  };
}
