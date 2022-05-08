import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Browser from './Browser2';
export default class DlgFolder2 extends React.Component {
  // constructor(props){
  //   // this.state= {
  //   //   error: '',
  //   // };
  // },
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose} fullScreen>
        <DialogTitle>
          <IconButton
            color="inherit"
            onClick={this.props.onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          文件浏览
        </DialogTitle>
        <DialogContent>
          <Browser initpath={this.props.initpath} />
        </DialogContent>
      </Dialog>
    );
  }
}
