import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import Webview from './react-electron-web-view/index';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// const fontSize = 16;
// const toolbar_h = 80;
const styles = {
  root: { flexGrow: 1 },
  grow: { flexGrow: 1 },
  menuButton: { marginLeft: -12, marginRight: 20 },
};
class HtmlEditor extends Component {
  constructor() {
    super();
    this.webviewRef = React.createRef();
    // console.log(__dirname);
    this.state = {
      show_about: false,
      // filename_input: __dirname + '/../test/index.html',
      filename: "http://www.baidu.com",//__dirname + '/../test/index.html',
      canGoBack: false,
      canGoForward: false,
      failLoad: false,
      favicon: null,
      title: '',
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.url && nextProps.url!==this.props.url) {
      this.setState({filename:nextProps.url})
    }
  }
  componentWillUnmount() {}
  filename_input_change = e => {
    this.setState({ filename_input: e.target.value });
  };
  go_click = () => {
    this.setState({filename:this.state.filename_input});
  };
  updatenavigate = e => {
    this.setState({
      canGoForward: this.w.canGoForward(),
      canGoBack: this.w.canGoBack(),
    });
  };
  render() {
    let gobackbutton, goforwardbutton;
    if (this.state.canGoBack) {
      gobackbutton = (
        <button
          onClick={() => {
            this.w.goBack();
          }}
        >
          {' '}
          back
        </button>
      );
    } else {
      gobackbutton = (
        <button
          disabled={true}
          onClick={() => {
            this.w.goBack();
          }}
        >
          {' '}
          back
        </button>
      );
    }
    if (this.state.canGoForward) {
      goforwardbutton = (
        <button
          onClick={() => {
            this.w.goForward();
          }}
        >
          forward
        </button>
      );
    } else {
      goforwardbutton = (
        <button
          disabled={true}
          onClick={() => {
            this.w.goForward();
          }}
        >
          forward
        </button>
      );
    }
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        fullScreen
      >
      <DialogContent>
        <AppBar position="static">
          <ToolBar>
           <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <img alt=""
            src={this.state.favicon}
            style={{
              lineHeight: '16px',
              width: '16px',
              height: '16px',
              marginTop: '0px',
              paddingTop: '0px',
            }}
              />
            <Typography color="inherit" className={classes.grow}>
              {this.state.title}
            </Typography>
          </ToolBar>
        </AppBar>
        <input
          style={{ width: '330px' }}
          onChange={this.filename_input_change}
          value={this.state.filename_input}
        />
        <button onClick={this.go_click}>go</button>
        <span
          style={{
            backgroundColor: '#f00',
            display: this.state.failLoad ? 'inline' : 'none',
          }}
        >
          fail
        </span>
        <button
          onClick={() => {
            this.w.reload();
          }}
        >
          reload
        </button>
        {gobackbutton}
        {goforwardbutton}
        <button onClick={()=>{
          this.w.openDevTools();
        }}>dev</button>
        <iframe
          title="iframe1"
          ref={this.webviewRef}
          src={this.state.filename}
          style={{ width: '100vw', height: '100vh' }}
        >
          {' '}
        </iframe>
      </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(HtmlEditor);