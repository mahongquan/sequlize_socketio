import React from 'react';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
export default class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = value => {
    this.setState({ anchorEl: null });
    // this.props.click_menu(value);
  };

  render() {
    const { anchorEl } = this.state;
    // console.log(this.props.children);
    let cs;
    if (_.isArray(this.props.children)) {
      cs = this.props.children.map((c, idx) => {
        // console.log(c);
        return (
          <MenuItem
            key={idx}
            onClick={() => {
              c.props.onClick();
              this.setState({ anchorEl: null });
            }}
          >
            {c.props.children}
          </MenuItem>
        );
      });
    } else {
      cs = (
        <MenuItem
          onClick={() => {
            this.props.children.props.onClick();
            this.setState({ anchorEl: null });
          }}
        >
          {this.props.children.props.children}
        </MenuItem>
      );
    }
    return (
      <div>
        <Button variant="contained"
          color="inherit"
          onClick={this.handleClick}
        >
          <Typography color="inherit">{this.props.title}</Typography>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {cs}
        </Menu>
      </div>
    );
  }
}
