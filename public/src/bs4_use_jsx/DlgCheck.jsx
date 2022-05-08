import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Client from '../Client';
export default function DlgCheck(props){
  const [state,setState]=React.useState({
    error: '',
    packs: [],
    hideTable: true,
  });
  const fileUpload=React.useRef(null);
  const close = () => {
    props.onClose();
  };
  const upload = () => {
    const file = fileUpload.current.files[0];
    console.log(file);
    var data1 = new FormData();
    data1.append('file', file);
    data1.append('id', props.contact.id);
    //console.log(data1)
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
      setState((state)=>({...state, packs: showdata,hideTable:false }));
    },(err)=>{
      console.log(err);
    });
  };
  // open = (contact_id, yiqibh) => {
  //   contact_id = contact_id;
  //   setState({ yiqibh: yiqibh });
  //   setState({ showModal: true });
  //   setState({ hideTable: true });
  // };
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
      <Modal
        show={props.open}
        onHide={props.onClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>核对备料计划</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            仪器编号:{props.contact.yiqibh},请上传备料计划导出的Excel文件
          </p>
          <form  encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              type="file"
              name="file"
              ref={fileUpload}
            />
            <Button
              style={{ margin: '10px 10px 10px 10px' }}
              className="btn btn-primary"
              onClick={upload}
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
        </Modal.Body>
      </Modal>
    );
};
