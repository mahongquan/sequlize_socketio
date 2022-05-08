import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
export default class DlgOkCancel extends React.Component {
  constructor(props) {
    super();
  }

  ok = () => {
    this.props.ok();
    this.props.onClose();
  };
  render = () => {
    return (
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <DialogTitle>
          {this.props.prompt}
          </DialogTitle>
          <DialogActions>
            <Button
              variant="outlined"
              className="btn btn-primary"
              onClick={this.ok}
            >
              确定
            </Button>
            <Button
              variant="outlined"
              className="btn btn-primary"
              onClick={this.props.onClose}
            >
              取消
            </Button>
          </DialogActions>
        </Dialog>
    );
  };
}
