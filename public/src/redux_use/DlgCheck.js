import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Client from './Client';
import { useSelector, useDispatch } from 'react-redux';
import * as slice from './reducers/partsSlice';
export default function DlgCheck(props) {
  const ref = React.useRef();
  const dispatch = useDispatch();
  const contact=useSelector((state) => state.parts.contact)
  const [state, setState] = React.useState({
    error: '',
    packs: [],
    hideTable: true,
  });
  const upload = () => {
    console.log(ref);
    const file = ref.current.files[0];
    console.log(file);
    var data1 = new FormData();
    data1.append('file', file);
    data1.append('id', contact.id);
    Client.postForm('/rest/check', data1, (data) =>{
      var showdata = [];
      var left = data.result[0];
      var notequal = data.result[1];
      var right = data.result[2];
      console.log(notequal);
      var n = left.length;
      if (n < right.length) {
        n = right.length;
      }
      for (var i = 0; i < n; i++) {
        var tr = {};
        if (i < left.length) {
          for (var one in left[i]) {
            tr['left' + one] = left[i][one];
          }
        } else {
          tr['left0'] = '';
          tr['left1'] = '';
          tr['left2'] = '';
        }
        if (i < right.length) {
          for (one in right[i]) {
            tr['right' + one] = right[i][one];
          }
        } else {
          tr['right0'] = '';
          tr['right1'] = '';
          tr['right2'] = '';
        }
        showdata.push(tr);
      }
      n = notequal.length;
      for (i = 0; i < n / 2; i++) {
        tr = {};
        var l = 2 * i + 0;
        for (one in notequal[l]) {
          tr['left' + one] = notequal[l][one];
        }
        var r = 2 * i + 1;
        for (one in notequal[r]) {
          tr['right' + one] = notequal[r][one];
        }
        showdata.push(tr);
      }
      console.log(showdata);
      setState({ packs: showdata,hideTable:false ,error:""});
    },(err)=>{
      // console.log(err);
      setState({packs:state.packs,hideTable:state.hideTable, error:""+err});
    });
  };
    const contactRows = state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td style={{ color: 'blue' }}>{pack.left0}</td>
        <td style={{ color: 'blue' }}>{pack.left1}</td>
        <td style={{ color: 'blue' }}>{pack.left2}</td>
        <td style={{ color: 'green' }}>{pack.right0}</td>
        <td style={{ color: 'green' }}>{pack.right1}</td>
        <td style={{ color: 'green' }}>{pack.right2}</td>
      </tr>
    ));
    return (
      <Dialog open={useSelector((state) => state.parts.showDlgCheck)} onClose={()=>{
        setState({packs:[],hideTable:true,error:""});//reset
        dispatch(slice.actions.SHOW_DLG_CHECK({visible:false}));
      }}>
        <DialogTitle>核对备料计划</DialogTitle>
        <DialogContent>
          <p>
            仪器编号{contact.yiqibh}
            备料计划核对，请上传备料计划导出的Excel文件
          </p>
          <form  encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.ms-excel"
              type="file"
              name="file"
              ref={ref}
            />
            <Button
              style={{ margin: '10px 10px 10px 10px' }}
              variant="outlined"
              color="primary"
              onClick={upload}
              type="button"
            >
              上传
            </Button>
          </form>
          <div hidden={state.hideTable} style={{ minHeight: '200px' }}>
            <table className="table-bordered">
              <tbody>
                <tr>
                  <td style={{ color: 'blue' }} colSpan="3">
                    装箱单
                  </td>
                  <td style={{ color: 'green' }} colSpan="3">
                    备料计划
                  </td>
                </tr>
                {contactRows}
              </tbody>
            </table>
          </div>
          <div>{state.error}</div>
        </DialogContent>
      </Dialog>
    );
}
