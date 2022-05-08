import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import Client from '../Client';
export default function DlgDetail(props){
  const [state,setState]=React.useState({
    error: '',
    packs: [],
    info: '',
    contact: {},
    items: [],
    items2: [],
    totalct: 0,
    totalid: 0,
  });

  React.useEffect(()=>{
    if (!props.contact) return ;
    if(!props.contact.id) return;
    var data1 = { id: props.contact.id };
    console.log(data1);
    Client.get('/rest/showcontact/', data1, res => {
      console.log(res);
      if (!res.items2) res.items2 = [];
      setState({
        ...state,
        contact: res.contact,
        items: res.items,
        items2: res.items2,
        totalid: res.totalid,
        totalct: res.totalct,
      });
    });
  },[props.contact])

  const handleDismiss = () => {
    setState({...state, showalert: false });
  };
  const inputChange = () => {
    setState({...state, showalert: false });
  };
  const mapfunc = (contact, idx) => {
    if (contact.leijia) {
      return (
        <tr key={idx}>
          <td>
            <u>{contact.bh}</u>
          </td>
          <td>
            <u>{contact.name}</u>
          </td>
          <td>
            <u>{contact.guige}</u>
          </td>
          <td>
            <u>{contact.ct}{contact.danwei}</u>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={idx}>
          <td>{contact.bh}</td>
          <td>{contact.name}</td>
          <td>{contact.guige}</td>
          <td>{contact.ct}{contact.danwei}</td>
        </tr>
      );
    }
  };

    const contactRows = state.items.map(mapfunc);
    let contactRows2, quehuo;
    if (state.items2.length > 0) {
      contactRows2 = state.items2.map(mapfunc);

      quehuo = (
        <div>
          <h2>缺货清单</h2>
          <Table responsive bordered condensed="true"  size="sm" >
            <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
                <th>规格</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows2}</tbody>
          </Table>
        </div>
      );
    }
    return (
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>详细</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table size="sm">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{state.contact.id}</td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>{state.contact.yonghu}</td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>{state.contact.addr}</td>
                <td>通道配置:</td>
                <td>{state.contact.channels} </td>
              </tr>
              <tr>
                <td>
                  <label>仪器型号:</label>
                </td>
                <td>{state.contact.yiqixinghao}</td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>{state.contact.yiqibh}</td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>{state.contact.baoxiang}</td>
                <td>审核:</td>
                <td>{state.contact.shenhe}</td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>{state.contact.yujifahuo_date}</td>
                <td>调试时间:</td>
                <td>{state.contact.tiaoshi_date}</td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>{state.contact.hetongbh}</td>
                <td>方法:</td>
                <td>{state.contact.method}</td>
              </tr>
            </tbody>
          </Table>
          <h2>备件清单</h2>
          <Table size="sm" responsive bordered condensed="true">
            <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
                <th>规格</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows}</tbody>
          </Table>
          <p>
            共{state.totalid}项{state.totalct}个。
          </p>
          {quehuo}
        </Modal.Body>
      </Modal>
    );
  };

