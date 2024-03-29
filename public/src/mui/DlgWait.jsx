import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Client from './Client';
class DlgWait extends React.Component {
  state = {
    showModal: false,
    hiddenPacks: true,
    error: '',
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open(contact_id) {
    var self = this;
    this.setState({ showModal: true });
    Client.get('/rest/allfile', { id: contact_id }, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        self.close();
      }
    });
  }
  render() {
    return (
      <Dialog
        open={this.state.showModal}
        onClose={this.close}
      >
        <DialogTitle>
          请等待。。。
        </DialogTitle>
        <DialogContent>
          <div>{this.state.error}</div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default DlgWait;
