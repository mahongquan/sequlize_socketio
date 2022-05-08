import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from '../Client';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import UserDropDown from "./UserDropDown";
export default  function DlgStat(props){
  const [state,setState]=React.useState({
    error: '',
    baoxiang: '',
    data : []
  });
  React.useEffect(()=>{
    loaddata("%")
  },[]);

  const loaddata = baoxiang => {
    var data = { baoxiang: baoxiang };
    Client.get('/rest/year12/', data, (result)=> {
      console.log(result);
      let data1=[]
      for(var i=0;i<result.lbls.length;i++){
        data1.push({month:result.lbls[i],count:result.values[i]});
      }
      setState((state)=>({...state,data:data1 }));
    });
  };
  const onClickBaoxiang = baoxiang => {
    setState((state)=>({...state,baoxiang: baoxiang }));
    loaddata(baoxiang);
  };
  const logChange = val => {
    console.log('Selected: ' + JSON.stringify(val));
    if (val != null) {
      setState((state)=>({...state,baoxiang: val.value }));
      loaddata(val.value);
    } else {
      setState((state)=>({...state,baoxiang: '%' }));
      loaddata('%');
    }
  };
    return (
      <Modal show={props.showModal} onHide={props.handleClose}
       dialogClassName="modal-700px">
        <Modal.Header>年统计</Modal.Header>
        <Modal.Body>
          <UserDropDown title="包箱" onClick={onClickBaoxiang} />
      <div style={{ width: '660px', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={state.data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" barSize={90} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
        </Modal.Body>
      </Modal>
    );
  };
