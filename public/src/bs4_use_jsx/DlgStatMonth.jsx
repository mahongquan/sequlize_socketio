import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from '../Client';
import {
Legend, BarChart,  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import UserDropDown from "./UserDropDown";
export default function DlgStat(props){
  const [state,setState] =React.useState({
    error: '',
    baoxiang: '',
    data : []
  });
  React.useEffect(()=>{
    loaddata('%');
  },[])
  
  const loaddata = baoxiang => {
    var data = { baoxiang: baoxiang };
    Client.get('/rest/month12/', data, function(result) {
      // console.log(result);
      let data1=[]
      for(var i=0;i<result.lbls.length;i++){
        data1.push({month:result.lbls[i],count:result.values[i]});
      }
      setState((state)=>({...state, data:data1 }));
    });
  };
  const onClickBaoxiang = baoxiang => {
    setState((state)=>({...state,baoxiang: baoxiang }));
    loaddata(baoxiang);
  };
  const logChange = val => {
    console.log('Selected: ' + JSON.stringify(val));
    if (val != null) {
      setState((state)=>({...state, baoxiang: val.value }));
      loaddata(val.value);
    } else {
      setState((state)=>({...state, baoxiang: '%' }));
      loaddata('%');
    }
  };
    return (
      <Modal show={props.showModal} onHide={props.handleClose} 
      dialogClassName="modal-700px">
        <Modal.Header>月统计</Modal.Header>
        <Modal.Body>
          <UserDropDown users={props.users} title="包箱" onClick={onClickBaoxiang} />
      <div className="line-chart-wrapper" style={{ width: '100%', height: '400px', backgroundColor: '#f5f5f5' }}>
          <ResponsiveContainer>
            <BarChart width={400} height={400} data={state.data}>
              <XAxis dataKey="month" />
              <YAxis/>
              <Tooltip />
              <Bar dataKey="count" fill="#413ea0" >
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        </Modal.Body>
      </Modal>
    );
}
