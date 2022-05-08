import React, { Component } from 'react';
import UsePacks2 from './UsePacks2';
import { Button, Modal } from 'react-bootstrap';
import update from 'immutability-helper';
import Client from '../Client';
import Autosuggest from 'react-autosuggest';
// import RichTextEditor from 'react-rte';
import DlgOkCancel from './DlgOkCancel';
import Datetime from 'react-datetime';
// import UserSelect from './UserSelect';
import UserDropDown from "./UserDropDown"; 
import moment from 'moment';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
// eslint-disable-next-line
import "moment/locale/zh-cn";

const init_state = {
    show_ok:false,
    openCollapse: false,
    showModal: false,
    contact: {
      yujifahuo_date: moment().format("YYYY-MM-DD"),
      tiaoshi_date: moment().format("YYYY-MM-DD"),
        addr: '',
        baoxiang: '',channels:"",        dianqi:"",
        hetongbh: '',hongwai:"",redao:"",
        id:"",
        jixie:"",
        shenhe: '',
        yiqibh: '',
        yiqixinghao: '',
        yonghu: '',
    },
    hiddenPacks: true,
    bg: {},
    date_open: false,
    editRich: false,
    rich: "",
  };

export default function ContactEdit2New(props){
  console.log("--------------------------")
  console.log(props);
  const [state,setState]=React.useState(init_state);

  const close = () => {
    props.onClose()
  };

  const close_ok = sure => {
    setState({...state,show_ok: false });
  };  
  React.useEffect(()=>{
    setState((prev)=>{return{...prev,bg:{}};});
    if (props.index == null) {
      setState((prev)=>{return {...prev,hiddenPacks:true};});//{ hiddenPacks: true });
    } else {
      // props.contact = parent.state.contacts[index];
      setState((prev)=>{return {...prev,hiddenPacks:false};});//{ hiddenPacks: true });
    }
    const val1 = props.contact.detail;
    setState((prev)=>{return{...prev,rich:val1};});//{ rich: val1 });
    if(props.contact){
      setState((prev)=>{return{...prev,contact:props.contact};});//{ rich: val1 });
    }
    else{
      setState((prev)=>{return{...prev,contact:{}};});//{ rich: val1 });
    }
  },[props.index])
  
  const handleCopy = data => {
    props.newCurrent();
    // console.log('copy');
    // props.index = null;
    // var contact2 = update(state.contact, { id: { $set: '' } });
    // console.log(contact2);
    // setState({...state, contact: contact2,hiddenPacks: true });
  };
  const handleSave = data => {
    if(state.contact.yiqibh===""){
      setState({...state,show_ok:true});
      return;
    }
    var url = '/rest/Contact/';
    var dataSave = state.contact;
    // dataSave.detail = state.rich.toString('html');
    Client.postOrPut(url, dataSave, res => {
      if (res.success) {
        setState((state)=>({...state,contact: res.data,bg:{},hiddenPacks:false }));
        props.handleContactChange(props.index, res.data);
        // props.contact=res.data;
        // if (props.index!==null) {
        // } else {
        //   props.index = 0;
        // }
      } else {
        alert(res.message);
      }
    },(error)=>{
      alert(error);
    });
  };
  const tiaoshi_date_change = value => {
    //state.yujifahuo_date=value;
    var e_target_name = 'tiaoshi_date';
    console.log(props.contact[e_target_name]);
    let t = value.format('YYYY-MM-DD');//moment to str
    let bg2;
    if (props.contact[e_target_name] === t) {
      bg2 = update(state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
    } else {
      bg2 = update(state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
    }
    const contact2 = update(state.contact, {
      [e_target_name]: { $set: t },
    });
    setState({...state,bg:bg2, contact: contact2 });
  };

  const yujifahuo_date_change = value => {
    var e_target_name = 'yujifahuo_date';
    let t = value.format('YYYY-MM-DD');
    let bg2;
    if (props.contact[e_target_name] === t) {
      bg2 = update(state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
    } else {
      bg2 = update(state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
    }
    const contact2 = update(state.contact, {
      [e_target_name]: { $set: t },
    });
    setState({...state,bg:bg2,contact: contact2 });
  };
  const channels_change = (event, { newValue }) => {
    change1(newValue);
  };
  const channels_change_fetch = () => {};
  const channels_select = (event, data) => {
    change1(data.suggestion);
  };
  const change1 = item => {
    console.log('selected');
    console.log(item);
    let bg2;
    if (props.contact.channels === item) {
      bg2 = update(state.bg, { channels: { $set: '#ffffff' } });
    } else {
      bg2 = update(state.bg, { channels: { $set: '#8888ff' } });
    }
    const contact2 = update(state.contact, { channels: { $set: item } });
    console.log(contact2);
    setState({...state,bg:bg2, contact: contact2 });
  };
  const yiqixinghao_change = (event, { newValue }) => {
    change2(newValue);
  };
  const yiqixinghao_select = (event, data) => {
    change2(data.suggestion);
  };
  const change2 = item => {
    console.log('selected');
    console.log(item);
    let bg2;
    if (props.contact.yiqixinghao === item) {
      bg2 = update(state.bg, { yiqixinghao: { $set: '#ffffff' } });
    } else {
      bg2 = update(state.bg, { yiqixinghao: { $set: '#8888ff' } });
    }
    const contact2 = update(state.contact, {
      yiqixinghao: { $set: item },
    });
    setState({...state,bg:bg2, contact: contact2 });
  };
  const handleChange = e => {
    console.log('change');
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    let bg2;
    if (props.contact[e.target.name] === e.target.value) {
      bg2 = update(state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
    } else {
      bg2 = update(state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
    }
    const contact2 = update(state.contact, {
      [e.target.name]: { $set: e.target.value },
    });
    console.log(contact2);
    setState({...state,bg:bg2, contact: contact2 });
  };
  const matchStateToTerm = (state, value) => {
    return state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  };
  const detailchange = value => {
    console.log(value);
    setState({ ...state,rich: value });
  };
  console.log("ContactEdit2New=========")
  console.log(props);
  console.log(state);
    return (
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        dialogClassName="modal-700px"
      >
        <Modal.Header closeButton>
          <Modal.Title>编辑仪器信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td align="right">ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    disabled="disabled"
                    value={state.contact.id|| ""}
                  />
                </td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.yonghu }}
                    type="text"
                    id="yonghu"
                    name="yonghu"
                    value={state.contact.yonghu|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.addr }}
                    type="text"
                    id="addr"
                    name="addr"
                    value={state.contact.addr|| ""}
                    onChange={handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'channels-autocomplete',
                      style: { backgroundColor: state.bg.channels },
                      value: state.contact.channels|| "",
                      onChange: channels_change,
                    }}
                    suggestions={[
                      '1O(低氧)',
                      '1O(高氧)',
                      '1O(低氧)+2N',
                      '1C(低碳)+2S',
                      '1C(高碳)+2S',
                      '2C+1S(低硫)',
                      '2C+1S(高硫)',
                      '2C+2S',
                      '2O+2N',
                      '2O',
                    ]}
                    getSuggestionValue={item => item}
                    onSuggestionSelected={channels_select}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    renderSuggestion={item => <span>{item}</span>}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>仪器型号:</label>
                </td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'yiqixinghao-autocomplete',
                      style: { backgroundColor: state.bg.yiqixinghao },
                      value: state.contact.yiqixinghao|| "",
                      onChange: yiqixinghao_change,
                    }}
                    suggestions={[
                      'CS-1011C',
                      'CS-2800',
                      'CS-3000',
                      'CS-3000G',
                      'HD-5',
                      'N-3000',
                      'O-3000',
                      'OH-3000',
                      'ON-3000',
                      'ON-4000',
                      'ONH-3000',
                      'ONH-5500',
                    ]}
                    getSuggestionValue={item => item}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    onSuggestionSelected={yiqixinghao_select}
                    renderSuggestion={item => <span>{item}</span>}
                  />
                </td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.yiqibh }}
                    type="text"
                    id="yiqibh"
                    name="yiqibh"
                    value={state.contact.yiqibh|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td align="right">
                  <label>包箱:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.baoxiang }}
                    type="text"
                    id="baoxiang"
                    name="baoxiang"
                    value={state.contact.baoxiang|| ""}
                    onChange={handleChange}
                  />
                  <UserDropDown users={props.users} onClick={(value)=>{
                    handleChange({target:{name:'baoxiang',value:value}})
                  }}></UserDropDown>
                </td>
                <td align="right">审核:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.shenhe }}
                    type="text"
                    id="shenhe"
                    name="shenhe"
                    value={state.contact.shenhe|| ""}
                    onChange={handleChange}
                  />
                  <UserDropDown users={props.users} onClick={(value)=>{
                    handleChange({target:{name:'shenhe',value:value}})
                  }}></UserDropDown>
                </td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>
                  <Datetime
                    timeFormat={false}
                    inputProps={{
                      style: { backgroundColor: state.bg.yujifahuo_date },
                    }}
                    id="yujifahuo_date"
                    name="yujifahuo_date"
                    value={moment(state.contact.yujifahuo_date,"YYYY-MM-DD")}
                    onChange={yujifahuo_date_change}
                  />
                </td>
                <td>调试时间:</td>
                <td>
                  <Datetime
                    timeFormat={false}
                    inputProps={{
                      style: { backgroundColor: state.bg.tiaoshi_date },
                    }}
                    name="tiaoshi_date"
                    value={moment(state.contact.tiaoshi_date,"YYYY-MM-DD")}
                    onChange={tiaoshi_date_change}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.hetongbh }}
                    type="text"
                    id="hetongbh"
                    name="hetongbh"
                    value={state.contact.hetongbh|| ""}
                    onChange={handleChange}
                  />
                </td>
                <td align="right">方法:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.method }}
                    type="text"
                    id="method"
                    name="method"
                    disabled={true}
                    value={state.contact.method|| ""}
                  />
                </td>
              </tr>

              <tr style={{display:"none"}}>
                <td align="right">电气:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.dianqi }}
                    type="text"
                    name="dianqi"
                    value={state.contact.dianqi|| ""}
                    onChange={handleChange}
                  />
                </td>
                <td align="right">机械:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.jixie }}
                    type="text"
                    name="jixie"
                    value={state.contact.jixie|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr style={{display:"none"}}>
                <td align="right">红外:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.hongwai }}
                    type="text"
                    name="hongwai"
                    value={state.contact.hongwai|| ""}
                    onChange={handleChange}
                  />
                </td>
                <td align="right">热导:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.redao }}
                    type="text"
                    name="redao"
                    value={state.contact.redao|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr style={{display:"none"}}>
                <td align="right">
                  <Button
                    variant="light"
                    onClick={() => {
                      setState({ ...state,editRich: !state.editRich });
                    }}
                  >
                    备注:
                  </Button>
                </td>
                <td colSpan="3">
                  <SimpleMDE
                    disabled={!state.editRich}
                    value={
                      state.rich // state.contact.detail
                    }
                    onChange={detailchange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button variant="primary" id="bt_save" onClick={handleSave}>
              保存
            </Button>
            <Button
              className="btn btn-raised"
              variant="light"
              style={{ margin: '20px 20px 20px 20px' }}
              id="bt_clearid"
              onClick={handleCopy}
            >
              复制
            </Button>
          </div>
          <div id="id_usepacks" hidden={state.hiddenPacks}>
            <UsePacks2
              contact_hetongbh={state.contact.hetongbh}
              contact_id={state.contact.id}
            />
          </div>

          <div style={{ minHeight: '200px' }} />
          <DlgOkCancel
            description="仪器编号不能为空"
            showModal={state.show_ok}
            closeModal={close_ok}
          />
        </Modal.Body>
      </Modal>
    );
  };
