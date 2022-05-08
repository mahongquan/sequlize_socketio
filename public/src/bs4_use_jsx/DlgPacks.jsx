import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from '../Client';
import { Button, Table } from 'react-bootstrap';
import PackEdit from './PackEdit';
import myglobal from '../myglobal';
export default function DlgPacks(props){
  const [state,setState]=React.useState({
    contacts: [],
    show_edit:false,
    start: 0,
    limit:10,
    total: 0,
    search: '',
    start_input: 1,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
  });
  // const close = () => {
  //   setState({ showModal: false });
  // };
  // const open = () => {
  //   setState({ showModal: true });
  //   loaddata();
  // };
  React.useEffect(()=>{
    loaddata();
  },[]);
  const loaddata = () => {
    Client.get(
      '/rest/Pack/',
      {
        start: state.start,
        limit: state.limit,
        search: state.search,
      },
      (contacts2)=>{
        setState((state)=>({...state,
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          total: contacts2.total,
          start: state.start,
        }));
      },
      (error)=>{
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
    //setState({start:start});
    loaddata();
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
    setState((state)=>({...state,start_input: e.target.value }));
  };
  const handleSearchChange = e => {
    setState((state)=>({...state, search: e.target.value }));
  };
  const search = e => {
    // eslint-disable-next-line
    state.start = 0;
    loaddata();
  };
  const handleEdit = pack_id => {
    //setState({currentIndex:idx,showModal:true});
    // refs.edit1.open(pack_id);
    setState((state)=>({...state,show_edit:true,pack_id:pack_id}))
  };
  const mapfunc = (contact, idx) => {
    if (contact.name)
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>
            <Button
              variant="light"
              onClick={() => handleEdit(contact.id)}
            >
              {contact.name}
            </Button>
          </td>
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>
            <Button
              variant="light"
              onClick={() => handleEdit(contact.id)}
            >
              [NONAME]
            </Button>
          </td>
        </tr>
      );
  };
    const contactRows = state.contacts.map(mapfunc);
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    //console.log(state);
    //console.log(state);
    if (state.start === 0) {
      hasprev = false;
    }
    //console.log(state.start+state.limit>=state.total);
    if (state.start + state.limit >= state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = <Button variant="light" onClick={handlePrev}>前一页</Button>;
    } else {
      prev = null;
    }
    if (hasnext) {
      next = <Button variant="light" onClick={handleNext}>后一页</Button>;
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
          <Modal.Title>包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PackEdit open={state.show_edit} onClose={
            ()=>{
              setState((state)=>({...state,show_edit:false}))
            }
          } pack_id={state.pack_id} title="编辑" />
          <input
            type="text"
            value={state.search}
            placeholder=""
            onChange={handleSearchChange}
          />
          <Button
            className="btn-primary"
            onClick={search}
          >
            搜索
          </Button>
          <Table size="sm" responsive bordered condensed="true">
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
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
