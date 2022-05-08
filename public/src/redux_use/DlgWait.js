import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useSelector, useDispatch } from 'react-redux';
export default function DlgWait(props) {
  var allfile_err = useSelector((state) => state.parts.allfile_err);
    return (
      <Dialog open={props.showModal} onClose={props.handleClose}>
        <DialogTitle>请等待。。。</DialogTitle>
        <DialogContent>
          <div>{allfile_err}</div>
        </DialogContent>
      </Dialog>
    );
}

