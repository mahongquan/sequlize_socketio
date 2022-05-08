import React from 'react';
import { Modal, Button,Table } from 'react-bootstrap';
import Client from '../Client';
export default function DlgCheck(props){
  const [state,setState]=React.useState({
    error: '',
    packs: [],
    packs_pg:[],
    hideTable_pg:true,
    hideTable: true,
    value_pg:"",
    value:"",
  });
  const close = () => {
    props.onClose();
  };
  const upload_pg = (text) => {
    let data={id:props.contact.id,text:text}
    Client.post('/rest/pg_clip/',data, (data) =>{
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
      setState((state)=>({...state, packs_pg: showdata,hideTable_pg:false }));
    },(err)=>{
      console.log(err);
    });
  };
  const upload = (text) => {
    let data={id:props.contact.id,text:text}
    Client.post('/rest/clip/',data, (data) =>{
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
  const onPaste_pg=()=>{
    console.log("onPaste");
    navigator.clipboard.readText().then(
        (clipText) =>{ 
            setState((state)=>({...state,value_pg:clipText}))
            upload_pg(clipText);
        }
    );
  }
  const onPaste=()=>{
    console.log("onPaste");
    navigator.clipboard.readText().then(
        (clipText) =>{ 
            setState((state)=>({...state,value:clipText}))
            upload(clipText);
        }
    );
  }
  // open = (contact_id, yiqibh) => {
  //   contact_id = contact_id;
  //   setState({ yiqibh: yiqibh });
  //   setState({ showModal: true });
  //   setState({ hideTable: true });
  // };
    const contactRows = state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td style={{minWidth:"50px", color: 'blue' }}>{pack.left0}</td>
        <td style={{minWidth:"50px", color: 'blue' }}>{pack.left1}</td>
        <td style={{minWidth:"50px", color: 'blue' }}>{pack.left2}</td>
        <td style={{minWidth:"50px", color: 'green' }}>{pack.right0}</td>
        <td style={{minWidth:"50px", color: 'green' }}>{pack.right1}</td>
        <td style={{minWidth:"50px", color: 'green' }}>{pack.right2}</td>
      </tr>
    ));
    const contactRows_pg = state.packs_pg.map((pack, idx) => (
      <tr key={idx}>
        <td style={{minWidth:"50px", color: 'blue' }}>{pack.left0}</td>
        <td style={{minWidth:"50px", color: 'blue' }}>{pack.left1}</td>
        <td style={{minWidth:"50px", color: 'blue' }}>{pack.left2}</td>
        <td style={{minWidth:"50px", color: 'green' }}>{pack.right0}</td>
        <td style={{minWidth:"50px", color: 'green' }}>{pack.right1}</td>
        <td style={{minWidth:"50px", color: 'green' }}>{pack.right2}</td>
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
            仪器编号:{props.contact.yiqibh},请粘贴备料计划/派工单数据
          </p>
         <div style={{display:"flex",flexDirection:"column"}}>
          <Button  onClick={onPaste}>粘贴备料计划数据</Button>
          <textarea style={{width:"100%",height:"100px"}} value={state.value} onChange={(e)=>{
              console.log(e);
              console.log(e.target.value);
              setState((state)=>({...state,value:e.target.value}))
          }}/>
          <hr />
          <div hidden={state.hideTable} style={{ minHeight: '200px' }}>
            <Table bordered style={{width:"100%"}}>
              <tbody>
                <tr>
                  <td align="center" style={{ color: 'blue' }} colSpan="3">
                    <b>装箱单</b>
                  </td>
                  <td align="center"  style={{ color: 'green' }} colSpan="3">
                    <b>备料计划</b>
                  </td>
                </tr>
                {contactRows}
              </tbody>
            </Table>
          </div>
          <div>{state.error}</div>
          <Button  onClick={onPaste_pg}>粘贴派工单数据</Button>
          <textarea style={{width:"100%",height:"100px"}} value={state.value_pg} onChange={(e)=>{
              console.log(e);
              console.log(e.target.value);
              setState((state)=>({...state,value_pg:e.target.value}))
          }}/>
          <hr />
          <div hidden={state.hideTable_pg} style={{ minHeight: '200px' }}>
            <table className="table-sm table-striped table-bordered" style={{width:"100%"}}>
              <tbody>
                <tr>
                  <td align="center" style={{ color: 'blue' }} colSpan="3">
                    <b>装箱单</b>
                  </td>
                  <td align="center"  style={{ color: 'green' }} colSpan="3">
                    <b>派工单</b>
                  </td>
                </tr>
                {contactRows_pg}
              </tbody>
            </table>
          </div>
        </div>
        </Modal.Body>
      </Modal>
    );
};
