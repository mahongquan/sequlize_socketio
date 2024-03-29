import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
export default class DlgInput extends React.Component {
  constructor(props) {
    super();
    this.state = {color: props.value };
  }
  componentDidUpdate(prevProps) {
    if (this.props.value) {
      this.props.setState({color:this.props.value});
    }
  }
  ok = () => {
    this.props.ok(this.state.color);
    this.props.onClose();
  };
  onChange = e => {
    this.setState({ color: e.target.value });
  };
  render = () => {
    return (
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <DialogTitle>
          {this.props.prompt}
          </DialogTitle>
          <DialogContent>
            <input 
              value={this.state.color}
              onChange={this.onChange}
            />
          </DialogContent>
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
