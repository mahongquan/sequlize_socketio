import React from 'react';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import FormGroup from '@mui/material/FormGroup';
// import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';

// const useStyles = makeStyles(theme => ({
//   link: {
//     margin: theme.spacing(1),
//   },
// }));
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
    // const classes = useStyles();
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
        <div>
        <Link onClick={this.props.click_title}  >
          {this.props.title}
        </Link>
        <ArrowDropDownIcon   onClick={this.handleClick} />
        </div>
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
