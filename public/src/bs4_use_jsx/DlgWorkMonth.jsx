import React, { Component } from 'react';
import { Table,Modal, DropdownButton, Dropdown,Button } from 'react-bootstrap';
import Client from '../Client';
import Datetime from 'react-datetime';
import UserDropDown from "./UserDropDown";
import moment from 'moment';
function lastDay(m){
  var m=moment([m.year(),m.month(),1]);
  m.add(1,"months");
  console.log(m.format('YYYY-MM-DD'))
  m.subtract(1,"days");
  console.log(m.format('YYYY-MM-DD'))
  return m;
}
export default function DlgWorlMonth(props){
  
  const [state,setState]=React.useState({
      month:moment(),
      items: [],
      items2: [],
      start: 0,
      total: 0,
      limit: 10,
      search: '',
      start_input: 1,
      baoxiang: '',
  });

  const prev=()=>{
    //m.subtract(2, 'months')
    var m=state.month.clone();
    m.subtract(1, 'months');
    state.month=m;
    loaddata();
  }
  const next=()=>{
    var m=state.month.clone();
    m.add(1, 'months');
    state.month=m;
    loaddata();
  }
  const yujifahuo_date_change = value => {
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM');
    }
    state.month=moment(t);
    loaddata();
  };

  React.useEffect(()=>{
    loaddata();
  },[]);

  const loaddata = () => {
    var baoxiang = state.baoxiang;
    let end_date = lastDay(state.month);
    var start_date = end_date.clone();
    start_date.subtract(2, 'months');
    let cmd =
      "select * from parts_contact  where work_month IS NULL and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date.format('YYYY-MM-DD') +
      "' and '" +
       end_date.format('YYYY-MM-DD') +
      "'";
    Client.sql(cmd, contacts2 => {
      // console.log(contacts2);
      setState((state)=>({...state,
        items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
        total: contacts2.total,
      }));
    });

    // let current_str = end_date.format('YYYY-MM');
    // current_str = current_str;
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "select * from parts_contact  where strftime('%Y-%m',work_month)='" +
      end_date.format('YYYY-MM') +
      "' and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date.format('YYYY-MM-DD') +
      "' and '" +
      end_date.format('YYYY-MM-DD')  +
      "'";
    Client.sql(cmd2, contacts2 => {
      // console.log(contacts2);
      setState((state)=>({...state,
        items2: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
      }));
    });
  };
  const jump = () => {
    state.items.forEach((one, idx) => {
      console.log(idx);
      handleEdit(idx);
    });
  };
  const handleEdit = idx => {
    let contact = state.items[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "update parts_contact set work_month='" +
      state.month.format("YYYY-MM-DD") +
      "' where id=" +
      contact.id;
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      loaddata();
    });
  };
  const handleEdit2 = idx => {
    let contact = state.items2[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 = 'update parts_contact set work_month=NULL where id=' + contact.id;
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      loaddata();
    });
  };
  const mapfunc = (contact, idx) => {
    return (
      <tr key={idx}>
        <td>{contact.tiaoshi_date}</td>
        <td>
          <Button variant="primary" onClick={() => handleEdit(idx)}>
            {contact.yiqibh}
          </Button>
        </td>
        <td>{contact.yonghu}</td>
      </tr>
    );
  };
  const mapfunc2 = (contact, idx) => {
    return (
      <tr key={idx}>
        <td>{contact.hetongbh}</td>
        <td>
          <Button 
              variant="info" onClick={() => handleEdit2(idx)}>
            {contact.yiqibh}
          </Button>
        </td>
        <td>{contact.yonghu}</td>
        <td>{contact.yiqixinghao}</td>
        <td>{contact.channels}</td>
      </tr>
    );
  };
  const onSelectBaoxiang = e => {
    state.baoxiang=e;
    loaddata();
  };
    const contactRows = state.items.map(mapfunc);
    const contactRows2 = state.items2.map(mapfunc2);
    let right = (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>合同号</td>
              <td>仪器号</td>
              <td>用户</td>
              <td>仪器型号</td>
              <td>通道</td>
            </tr>
          </thead>
          <tbody id="contact-list">{contactRows2}</tbody>
        </Table>
      </div>
    );
    return (
      <Modal show={props.showModal} onHide={props.handleClose} 
      dialogClassName="modal-1000px">
          <Modal.Header>
              工作量
          </Modal.Header>
          <Modal.Body>
          <div>
            
        <div style={{ display: 'flex', alignItems: 'center'}}>
 <UserDropDown users={props.users} title="包箱" onClick={onSelectBaoxiang} />
        <Datetime
                    inputProps={{
                      style: { width:"120px" },
                    }}
                    dateFormat="YYYY-MM"
                    viewMode="months"
                    timeFormat={false}
                    value={state.month}
                    onChange={yujifahuo_date_change}
                  />
        </div>
        </div>
        <br />
          <div style={{ display: 'flex',width:"100%" }}>
            <div style={{ border: 'solid 1px'}}>
              未报工作量仪器
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>日期</td>
                    <td>仪器号</td>
                    <td>用户</td>
                  </tr>
                </thead>
                <tbody id="contact-list">{contactRows}</tbody>
              </Table>
              <Button
                variant="secondary"
                onClick={jump}
              >
                全部
              </Button>
            </div>
            <div style={{ border: 'solid 1px',flexGrow:1}}>
              {right}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

