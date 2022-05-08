import React from 'react';
// import LoginFormComponent from './LoginFormComponent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';

class DlgLogin extends React.Component {
  state = {
    showModal: false,
    name: '马红权',
    pwd: '333333',
  };
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePwdChange = (e) => {
    this.setState({
      pwd: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var data = {};
    data['username'] = this.state.name;
    data['password'] = this.state.pwd;
    this.props.onLoginSubmit(data);
    this.props.handleClose();
  };
  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };
  // onLoginSubmit=(data)=>  {
  //   this.props.onLoginSubmit(data);
  // }
  render() {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>{this.props.title || ' '}</DialogTitle>
        <DialogContent>
          <table className="table-condensed">
            <tbody>
              <tr>
                <td>
                  <label>用户名:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>密码:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="password"
                    value={this.state.pwd}
                    onChange={this.handlePwdChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <button onClick={this.handleSubmit}>确定</button>
          <button onClick={this.props.handleClose}>取消</button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default DlgLogin;
