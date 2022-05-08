import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from '../Client';
import { Table, Button } from 'react-bootstrap';
import ItemEdit from './ItemEdit';
import update from 'immutability-helper';
export default function DlgItems(props){
  const [state,setState] =React.useState({
    item:null,
    index:null,
    items: [],
    start: 0,
    total: 0,
    limit:10,
    search: '',
    start_input: 1,
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    show_edit:false,
  });
  React.useEffect(()=>{
    loaddata();
  },[])

  const loaddata = () => {
    Client.get(
      '/rest/Item/',
      {
        start: state.start,
        limit: state.limit,
        query: state.search,
      },
      contacts2 => {
        setState((state)=>({
          ...state,
          items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          total: contacts2.total,
          start: state.start,
        }));
      },(error)=>{
        console.log(error);
      });
  };
  const handlePrev = e => {
    // eslint-disable-next-line
    state.start = state.start - state.limit;
    if (state.start < 0) {
      // eslint-disable-next-line
      state.start = 0;
    }
    loaddata();
  };
  const handlePackItemChange = (idx, contact) => {
    console.log(idx);
    const contacts2 = update(state.items, { [idx]: { $set: contact } });
    console.log(contacts2);
    setState((state)=>({...state, items: contacts2 }));
  };
  const handleNext = e => {
    // eslint-disable-next-line
    state.start = state.start + state.limit;
    if (state.start > state.total - state.limit)
      // eslint-disable-next-line
      state.start = state.total - state.limit; //total >limit
    if (state.start < 0) {
      // eslint-disable-next-line
      state.start = 0;
    }
    loaddata();
  };
  const jump = () => {
    // eslint-disable-next-line
    state.start = parseInt(state.start_input, 10) - 1;
    if (state.start > state.total - state.limit)
      // eslint-disable-next-line
      state.start = state.total - state.limit; //total >limit
    if (state.start < 0) {
      // eslint-disable-next-line
      state.start = 0;
    }
    loaddata();
  };
  const handlePageChange = e => {
    setState((state)=>({...state, start_input: e.target.value }));
  };
  const handleSearchChange = e => {
    setState((state)=>({...state, search: e.target.value }));
  };
  const search = e => {
    // eslint-disable-next-line
    state.start = 0;
    loaddata();
  };
  const handleEdit = idx => {
    setState((state)=>({...state,item:state.items[idx],show_edit:true,index:idx}));
  };
  const mapfunc = (contact, idx) => {
    if (!contact.image || contact.image === '')
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td>
            <Button variant="light" onClick={() => handleEdit(idx)}>
              {contact.name}
            </Button>
          </td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td />
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td>
            <Button variant="light" onClick={() => handleEdit(idx)}>
              {contact.name}
            </Button>
          </td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td>
            <img
              alt="no"
              src={'/media/' + contact.image}
              width="100"
              height="100"
            />
          </td>
        </tr>
      );
  };
    const contactRows = state.items.map(mapfunc);
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    if (state.start === 0) {
      hasprev = false;
    }
    if (state.start + state.limit >= state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = <Button variant="light" onClick={handlePrev}>前一页</Button>;
    } else {
      prev = null;
    }
    if (hasnext) {
      next = <Button  variant="light" onClick={handleNext}>后一页</Button>;
    } else {
      next = null;
    }
    return (
      <Modal
        show={props.open}
        onHide={props.onClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>备件</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { state.show_edit?(<ItemEdit 
            item={state.item}
            handlePackItemChange={handlePackItemChange}
            index={state.index}
            open={state.show_edit} onClose={()=>{
            setState((state)=>({...state,show_edit:false}));
          }}/>):null
        }
          <input
            type="text"
            value={state.search}
            placeholder="name"
            onChange={handleSearchChange}
          />
          <Button
            variant="primary"
            onClick={search}
          >
            搜索
          </Button>
          <Table size="sm" responsive bordered condensed="true">
            <thead>
              <tr>
                <th>ID</th>
                <th>编号</th>
                <th>名称</th>
                <th>规格</th>
                <th>单位</th>
                <th>图片</th>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows}</tbody>
          </Table>
          {prev}
          <label id="page">
            {state.start + 1}../{state.total}
          </label>
          {next}
          <input
            maxLength="6"
            size="6"
            onChange={handlePageChange}
            value={state.start_input}
          />
          <Button id="page_go" className="btn btn-info" onClick={jump}>
            跳转
          </Button>
        </Modal.Body>
      </Modal>
    );
  };
