import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
class DlgWait extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.showModal}
        onClose={this.props.handleClose}
      >
        <DialogTitle>
          请等待。。。
        </DialogTitle>
        <DialogContent>
          <div>{this.props.store.allfile_err}</div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default DlgWait;
