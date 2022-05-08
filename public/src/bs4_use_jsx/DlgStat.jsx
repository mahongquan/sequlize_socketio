import React, { Component } from 'react';
import { Modal ,Dropdown,DropdownButton} from 'react-bootstrap';
import Client from '../Client';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import UserDropDown from "./UserDropDown";
export default  function DlgStat(props){
  const [state,setState]=React.useState({
    year:true,
    error: '',
    baoxiang: '%',
    data : []
  });
  React.useEffect(()=>{
    loaddata("%",state.year)
  },[]);

  const loaddata = (baoxiang,year) => {
    var data = { baoxiang: baoxiang };
    if(year){
      Client.get('/rest/year12/', data, (result)=> {
        console.log(result);
        let data1=[]
        for(var i=0;i<result.lbls.length;i++){
          data1.push({month:result.lbls[i],count:result.values[i]});
        }
        setState((state)=>({...state,data:data1 }));
      });
    }else{
      Client.get('/rest/month12/', data, (result)=>{
        console.log(result);
        let data1=[]
        for(var i=0;i<result.lbls.length;i++){
          data1.push({month:result.lbls[i],count:result.values[i]});
        }
        setState((state)=>({...state, data:data1 }));
      });
    }
  };
  const onSelectYear=(year)=>{
    setState((state)=>({...state,year:year }));
    console.log(state.baoxiang)
    loaddata(state.baoxiang,year)
  }
  const onClickBaoxiang = baoxiang => {
    setState((state)=>({...state,baoxiang: baoxiang }));
    loaddata(baoxiang,state.year);
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
        <Modal.Header>统计</Modal.Header>
        <Modal.Body>
      <div style={{display:"flex"}}>
      <DropdownButton
        variant="light"
        title={state.year?"年":"月"}
      >
        <Dropdown.Item onClick={()=>{onSelectYear(true);}}>
            年
        </Dropdown.Item>
        <Dropdown.Item onClick={()=>{onSelectYear(false);}}>
          月
        </Dropdown.Item>
      </DropdownButton>
      <UserDropDown users={props.users} title="包箱" onClick={onClickBaoxiang} />
      </div>
          <ComposedChart
            width={600}
            height={400}
            minWidth={300}
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
        </Modal.Body>
      </Modal>
    );
  };
