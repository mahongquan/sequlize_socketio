import React from 'react';
import Autosuggest from 'react-autosuggest';
//import Browser from './Browser';
import io from 'socket.io-client';
import update from 'immutability-helper';
import { Bar } from 'react-chartjs-2';
import {
  Button,
  Table,
  Modal,
  Navbar,
  Nav,
  NavItem,
  DropdownButton,Dropdown
} from 'react-bootstrap';
const HOST = 'http://localhost:8000';
var socket = io.connect(HOST);
var ss = require('socket.io-stream');
var moment = require('moment');
require('moment/locale/zh-cn');
var DateTime = require('react-datetime');
// var host = '';
//Browser///////////////////////////////////////////////////////
// function buildUploadUrl(path, name) {
//   return '/fs/upload?path=' + path + '&name=' + name;
// }
/////////////
class DlgFolder2 extends React.Component {
  state = {
    initpath: '.',
    showModal: false,
    hiddenPacks: true,
    error: '',
  };
  close = () => {
    this.setState({ showModal: false, initpath: '.' });
  };

  open = () => {
    this.setState({ showModal: true });
  };
  render = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>文件浏览</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            //<Browser socket={socket} initpath={this.state.initpath} />
          }
        </Modal.Body>
      </Modal>
    );
  };
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////
class PackItemEditNew extends React.Component {
  state = {
    showModal: false,
    packitem: {},
    hiddenPacks: true,
    bg: {},
    date_open: false,
  };
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.items[nextProps.index];
  //   }
  //   this.setState({packitem:this.old});
  // }
  close = () => {
    this.setState({ showModal: false });
  };

  open2 = idx => {
    this.setState({ showModal: true });
    this.index = idx;
    if (this.index == null) {
      this.old = {};
    } else {
      this.parent = this.props.parent;
      this.old = this.parent.state.items[this.index];
    }
    this.setState({ packitem: this.old });
  };
  handleSave = data => {
    socket.emit('/put/PackItem', this.state.packitem, res => {
      //console.log("/put/PackItem");
      //console.log(res);
      this.setState({ contact: res.data });
      this.parent.handlePackItemChange(this.index, res.data);
      this.old = res.data;
      this.close();
    });
  };
  quehuoChange = e => {
    var quehuo = this.state.packitem.quehuo;
    quehuo = !quehuo;
    if (this.old.quehuo === quehuo) {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.packitem, { quehuo: { $set: quehuo } });
    //console.log(contact2);
    this.setState({ packitem: contact2 });
  };
  handleChange_item = e => {
    //console.log("change");
    //console.log(e);
    //console.log(e.target);
    //console.log(e.target.value);
    //console.log(e.target.name);
    if (this.old.Item[e.target.name] === e.target.value) {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.packitem, {
      Item: { [e.target.name]: { $set: e.target.value } },
    });
    //console.log(contact2);
    this.setState({ packitem: contact2 });
  };
  handleChange = e => {
    //console.log("change");
    //console.log(e);
    //console.log(e.target);
    //console.log(e.target.value);
    //console.log(e.target.name);
    if (this.old[e.target.name] === e.target.value) {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.packitem, {
      [e.target.name]: { $set: e.target.value },
    });
    //console.log(contact2);
    this.setState({ packitem: contact2 });
  };
  render = () => {
    let item = {};
    if (this.state.packitem.Item) {
      item = this.state.packitem.Item;
    }
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>编辑备件信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    readOnly={true}
                    disabled="disabled"
                    defaultValue={this.state.packitem.id}
                  />
                </td>
              </tr>
              <tr>
                <td>ItemID:</td>
                <td>
                  <input
                    type="text"
                    id="itemid"
                    name="item_id"
                    readOnly={true}
                    disabled="disabled"
                    defaultValue={item.id}
                  />
                </td>
              </tr>
              <tr>
                <td>名称:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.addr }}
                    type="text"
                    id="addr"
                    name="name"
                    value={item.name}
                    onChange={this.handleChange_item}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>规格:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.yiqixinghao }}
                    type="text"
                    name="guige"
                    value={item.guige}
                    onChange={this.handleChange_item}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.baoxiang }}
                    type="text"
                    id="baoxiang"
                    name="bh"
                    value={item.bh}
                    onChange={this.handleChange_item}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>单位:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.baoxiang }}
                    type="text"
                    id="danwei"
                    name="danwei"
                    value={item.danwei}
                    onChange={this.handleChange_item}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>数量:</label>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ backgroundColor: this.state.bg.ct }}
                    id="yujifahuo_date"
                    name="ct"
                    value={this.state.packitem.ct}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>缺货:</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="quehuo"
                    name="quehuo"
                    checked={this.state.packitem.quehuo}
                    onChange={this.quehuoChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              className="btn btn-primary"
              id="bt_save"
              onClick={this.handleSave}
            >
              保存
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
}
//////////////
class PackItems extends React.Component {
  state = {
    items: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,
  };
  componentDidMount = () => {
    //console.log(this.props.pack_id);
    socket.emit('/get/PackItem', { pack_id: this.props.pack_id }, items => {
      //console.log("PackItems componentDidMount");
      //console.log(items);
      this.setState({
        items: items.data, //.slice(0, MATCHING_ITEM_LIMIT),
      });
    });
  };
  auto_select = (event, data) => {
    //console.log("selected");
    //console.log(data)
    this.addrow(data.suggestion.id);
    //this.setState({auto_value:value, auto_items: [ item ] })
  };
  auto_change = data => {
    var value = data.value;
    //console.log("auto_change");
    if (value.length > 1) {
      socket.emit('/get/Item', { search: value, limit: 30 }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    }
  };
  new_packitem = id => {
    var data = {
      danwei: '',
      bh: '',
      guige: '',
      ct: 0,
      img: '',
      name: this.state.newPackName,
      pack_id: this.props.pack_id,
    };
    //console.log(data);
    socket.emit('/post/PackItemEx', data, res => {
      var p = res.data;
      const newFoods = this.state.items.concat(p);
      this.setState({ items: newFoods });
    });
  };
  new_packitem2 = () => {
    var data = {
      danwei: '',
      bh: '',
      guige: '',
      ct: 0,
      img: '',
      name: this.state.auto_value,
      pack_id: this.props.pack_id,
    };
    //console.log(data);
    socket.emit('/post/PackItemEx', data, res => {
      var p = res.data;
      const newFoods = this.state.items.concat(p);
      this.setState({ items: newFoods });
    });
  };
  handlePackItemChange = (idx, contact) => {
    //console.log(idx);
    const contacts2 = update(this.state.items, { [idx]: { $set: contact } });
    //console.log(contacts2);
    this.setState({ items: contacts2 });
  };
  addrow = item_id => {
    // var url = '/PackItem';
    var data = {
      pack_id: this.props.pack_id,
      item_id: item_id,
      ct: 1,
      quehuo: false,
    };
    socket.emit('/post/PackItem', data, res => {
      var p = res.data;
      const newFoods = this.state.items.concat(p);
      this.setState({ items: newFoods });
    });
  };
  newpackChange = e => {
    this.setState({ newPackName: e.target.value });
  };
  onEditClick = id => {};
  onDeleteClick = itemIndex => {
    // var url = '/PackItem';
    socket.emit(
      '/delete/PackItem',
      { id: this.state.items[itemIndex].id },
      res => {
        const filteredFoods = this.state.items.filter(
          (item, idx) => itemIndex !== idx
        );
        this.setState({ items: filteredFoods });
      }
    );
  };
  handleEdit = idx => {
    this.refs.dlg.open2(idx);
  };
  onChange = (event, { newValue }) => {
    //console.log(newValue);
    this.setState({ auto_value: newValue });
  };
  render() {
    //console.log("render");
    //console.log(this.state);
    const { items } = this.state;
    const itemRows = items.map((item, idx) => (
      <tr key={idx}>
        <td>{item.id}</td>
        <td>{item.Item.name}</td>
        <td>{item.Item.guige}</td>
        <td>{item.ct}</td>
        <td>{item.Item.bh}</td>
        <td hidden={this.state.release}>{item.pack}</td>
        <td>
          <input
            type="checkbox"
            disabled="disabled"
            name="quehuo"
            checked={item.quehuo}
          />
        </td>
        <td>
          <Button onClick={() => this.handleEdit(idx)}>编辑</Button>
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => this.onDeleteClick(idx)}
          >
            删除
          </Button>
        </td>
      </tr>
    ));
    let button1;
    if (this.state.auto_value.length > 1) {
      button1 = <Button onClick={this.new_packitem2}>新备件</Button>;
    } else {
      button1 = (
        <Button disabled onClick={this.new_packitem2}>
          新备件
        </Button>
      );
    }
    return (
      <div>
        <Table responsive bordered condensed>
          <thead>
            <tr>
              <td>id</td>
              <td>名称</td>
              <td>规格</td>
              <td>数量</td>
              <td>编号</td>
              <td hidden={this.state.release}>pack</td>
              <td>缺货</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>{itemRows}</tbody>
        </Table>
        <table>
          <tbody>
            <tr>
              <td>输入备件</td>
              <td>
                <Autosuggest
                  focusInputOnSuggestionClick={false}
                  inputProps={{
                    id: 'states-autocomplete',
                    value: this.state.auto_value,
                    onChange: this.onChange,
                  }}
                  onSuggestionSelected={this.auto_select}
                  onSuggestionsFetchRequested={this.auto_change}
                  onSuggestionsClearRequested={() => {}}
                  getSuggestionValue={item => item.name}
                  ref="autocomplete"
                  suggestions={this.state.auto_items}
                  renderSuggestion={item => (
                    <span>
                      {item.bh}
                      <b>
                        <i>{item.name}</i>
                      </b>
                      {item.guige}
                    </span>
                  )}
                />
              </td>
              <td>{button1}</td>
            </tr>
          </tbody>
        </table>
        <PackItemEditNew ref="dlg" parent={this} />
      </div>
    );
  }
} /////////////////
class UsePackEditNew extends React.Component {
  state = {
    showModal: false,
    usepack: {},
    bg: {},
  };

  close = () => {
    this.setState({ showModal: false });
  };
  handleChange = () => {};
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.usepacks[nextProps.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  close = () => {
    this.setState({ showModal: false });
  };
  open2 = idx => {
    this.index = idx;
    this.setState({ showModal: true });
    if (this.index == null) {
      this.old = {};
    } else {
      this.parent = this.props.parent;
      this.old = this.parent.state.usepacks[this.index];
    }
    this.setState({ usepack: this.old });
    //console.log(this.old);
  };
  // open=()=>{
  //   this.setState({ showModal: true });
  //   if (this.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=this.props.parent;
  //     this.old=this.parent.state.usepacks[this.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  render = () => {
    let name;
    let id;
    if (this.state.usepack.Pack) {
      name = this.state.usepack.Pack.name;
      id = this.state.usepack.Pack.id;
    }
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>编辑包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    readOnly={true}
                    disabled="disabled"
                    defaultValue={id}
                  />
                </td>
                <td>
                  <label>名称:</label>
                </td>
                <td>
                  <label>{name}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="id_useusepacks">
            <PackItems pack_id={id} />
          </div>
        </Modal.Body>
      </Modal>
    );
  };
}
/////
class DlgFolder extends React.Component {
  state = {
    showModal: false,
    hiddenPacks: true,
    error: '',
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    var self = this;
    this.setState({ showModal: true });
    socket.emit('/folder', { id: this.props.contact_id }, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        self.close();
      }
    });
  };
  render = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>请等待。。。</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
///////
class DlgCheck extends React.Component {
  state = {
    showModal: false,
    error: '',
    packs: [],
    hideTable: true,
  };

  close = () => {
    this.setState({ showModal: false });
  };
  upload = () => {
    const file = this.fileUpload.files[0];
    //console.log(file);
    var data1 = new FormData();
    data1.append('file', file);
    data1.append('id', this.props.contact_id);
    ////console.log(data1)
    var self = this;
    socket.emit('/check', data1, function(data) {
      var showdata = [];
      var left = data.result[0];
      var notequal = data.result[1];
      var right = data.result[2];
      //console.log(notequal);
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
      //console.log(showdata);
      self.setState({ packs: showdata });
      self.setState({ hideTable: false });
    });
  };
  open = () => {
    this.setState({ showModal: true });
    this.setState({ hideTable: true });
  };
  render = () => {
    const contactRows = this.state.packs.map((pack, idx) => (
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
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            仪器编号{this.props.yiqibh}
            备料计划核对，请上传备料计划导出的Excel文件
          </p>
          <form ref="form1" encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.ms-excel"
              type="file"
              name="file"
              ref={ref => (this.fileUpload = ref)}
            />
            <button
              style={{ margin: '10px 10px 10px 10px' }}
              className="btn btn-primary"
              onClick={this.upload}
              type="button"
            >
              上传
            </button>
          </form>
          <div hidden={this.state.hideTable} style={{ minHeight: '200px' }}>
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
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
///////
class DlgWait extends React.Component {
  state = {
    showModal: false,
    hiddenPacks: true,
    error: '',
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    var self = this;
    this.setState({ showModal: true });
    socket.emit('/allfile', { id: this.props.contact_id }, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        self.close();
      }
    });
  };
  render = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>请等待。。。</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
/////////////
class DlgUrl extends React.Component {
  state = {
    showModal: false,
    error: '',
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    var self = this;
    this.setState({ showModal: true });
    socket.emit(this.props.url, this.props.data, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        self.props.parent.handleContactChange(self.props.index, result.data);
        self.close();
      }
    });
  };
  render = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>请等待。。。</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
//////////////
class UsePacks2 extends React.Component {
  state = {
    usepacks: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items: [],
    release: true,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.contact_id) {
      this.load_data(nextProps.contact_id);
    }
  }
  load_data = contact_id => {
    socket.emit('/get/UsePack', { contact_id: contact_id }, usepacks => {
      //console.log(usepacks)
      this.setState({
        usepacks: usepacks.data, //.slice(0, MATCHING_ITEM_LIMIT),
      });
    });
  };
  componentDidMount = () => {
    if (this.props.contact_id) {
      this.load_data(this.props.contact_id);
    }
  };
  auto_change = data => {
    var value = data.value;
    if (value.length > 1) {
      socket.emit('/get/Pack', { search: value }, items => {
        this.setState({ auto_items: items.data });
      });
    }
  };
  auto_select = (event, data) => {
    //console.log("selected");
    //console.log(data)
    this.addrow(data.suggestion.id);
    //this.setState({auto_value:value, auto_items: [ item ] })
  };
  bibei = id => {
    //this.setState({auto_value:"必备"});
    this.onChange(null, { newValue: '必备' });
    //console.log(this.refs.autocomplete);
  };
  new_pack = id => {
    // var url = '/UsePackEx';
    var data = {
      name: this.state.auto_value,
      contact_id: this.props.contact_id,
    };
    socket.emit('/post/UsePackEx', data, res => {
      var p = res.data;
      const newFoods = this.state.usepacks.concat(p);
      this.setState({ usepacks: newFoods });
    });
  };
  addrow = pack_id => {
    // var url = '/UsePack';
    var data = { contact_id: this.props.contact_id, pack_id: pack_id };
    socket.emit('/post/UsePack', data, res => {
      var p = res.data;
      const newFoods = this.state.usepacks.concat(p);
      this.setState({ usepacks: newFoods });
    });
  };
  newpackChange = e => {
    this.setState({ newPackName: e.target.value });
  };
  onEditClick = id => {};
  onDeleteClick = itemIndex => {
    // var url = '/UsePack';
    socket.emit(
      '/delete/UsePack',
      { id: this.state.usepacks[itemIndex].id },
      res => {
        const filteredFoods = this.state.usepacks.filter(
          (item, idx) => itemIndex !== idx
        );
        this.setState({ usepacks: filteredFoods });
      }
    );
  };
  handleEdit = idx => {
    //this.setState({currentIndex:idx,showModal:true});
    this.refs.edit1.open2(idx);
  };
  getUsers = input => {
    //console.log("getUsers");
    //console.log(input)
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch('/Pack?limit=10&search=' + input, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        var r = { options: json.data };
        //console.log(r);
        return r;
      });
  };
  onChange = (event, { newValue }) => {
    //console.log("onChange======================");
    //console.log(newValue)
    this.setState({
      auto_value: newValue,
    });
  };
  onValueClick = value => {
    //console.log(value);
  };
  render() {
    const { usepacks } = this.state;
    const usepackRows = usepacks.map((usepack, idx) => (
      <tr key={idx}>
        <td>{usepack.id}</td>
        <td>{usepack.Pack.name}</td>
        <td hidden={this.state.release}>{usepack.contact}</td>
        <td hidden={this.state.release}>{usepack.pack}</td>
        <td hidden={this.state.release}>{usepack.hetongbh}</td>
        <td>
          <Button onClick={() => this.handleEdit(idx)}>编辑</Button>
          <Button
            onClick={() => this.onDeleteClick(idx)}
            style={{ marginLeft: '10px' }}
          >
            删除
          </Button>
        </td>
      </tr>
    ));
    ////console.log("UsePacks2 render===================");
    ////console.log(this.state);
    let button1;
    if (this.state.auto_value.length > 1) {
      button1 = <Button onClick={this.new_pack}>新包</Button>;
    } else {
      button1 = (
        <Button disabled onClick={this.new_pack}>
          新包
        </Button>
      );
    }
    return (
      <div>
        <UsePackEditNew
          ref="edit1"
          parent={this}
          index={this.state.currentIndex}
          title="编辑"
        />
        <Table responsive bordered condensed>
          <thead>
            <tr>
              <td>id</td>
              <td>名称</td>
              <td hidden={this.state.release}>contact</td>
              <td hidden={this.state.release}>pack</td>
              <td hidden={this.state.release}>hetongbh</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>{usepackRows}</tbody>
        </Table>
        <table>
          <tbody>
            <tr>
              <td>输入包</td>
              <td>
                <Autosuggest
                  focusInputOnSuggestionClick={false}
                  inputProps={{
                    id: 'states-autocomplete',
                    value: this.state.auto_value,
                    onChange: this.onChange,
                  }}
                  onSuggestionSelected={this.auto_select}
                  onSuggestionsFetchRequested={this.auto_change}
                  onSuggestionsClearRequested={() => {}}
                  getSuggestionValue={item => item.name}
                  ref="autocomplete"
                  suggestions={this.state.auto_items}
                  renderSuggestion={item => <span>{item.name}</span>}
                />
              </td>
              <td>
                <button className="btn" onClick={this.bibei}>
                  必备
                </button>
              </td>
              <td>{button1}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
/////////////
class DlgImport extends React.Component {
  state = {
    showModal: false,
    error: '',
    packs: [],
  };

  close = () => {
    this.setState({ showModal: false });
  };
  upload = () => {
    const file = this.fileUpload.files[0];
    var stream = ss.createStream();
    // upload a file to the server.
    var app = this;
    ss(socket).emit(
      'file',
      stream,
      { name: file.name, size: file.size },
      res => {
        //console.log(app.state.packs)
        //console.log(res);
        const newFoods = update(app.state.packs, { $push: res.result });
        app.setState({ packs: newFoods });
      }
    );
    ss.createBlobReadStream(file).pipe(stream);
    // //console.log(file);
    // var data1=new FormData();
    // data1.append("file",file);
    // ////console.log(data1)
    // var self=this;
    // Client.post("/standard",data1,function(res){
    //     const newFoods = update(self.state.packs, {$push: res.result});
    //     self.setState({packs: newFoods });
    // });
  };
  open = () => {
    var self = this;
    this.setState({ showModal: true });
    var data = { limit: 10, search: 'xls' };
    socket.emit('/get/Pack', data, function(result) {
      console.info(result);
      // if (!result.success){
      //    self.setState({error:result.message});
      // }
      // else
      self.setState({ packs: result.data });
      //console.log(result.data);
    });
  };
  render = () => {
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td>{pack.id}</td>
        <td>{pack.name}</td>
      </tr>
    ));
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>导入标样</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref="form1" encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.ms-excel"
              type="file"
              name="file"
              ref={ref => (this.fileUpload = ref)}
            />
            <button
              style={{ margin: '10px 10px 10px 10px' }}
              className="btn btn-primary"
              onClick={this.upload}
              type="button"
            >
              上传
            </button>
          </form>
          <div style={{ minHeight: '200px' }}>
            <table className="table-bordered">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>名称</td>
                </tr>
              </thead>
              <tbody>{contactRows}</tbody>
            </table>
          </div>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
///////////////////////
class DlgStat extends React.Component {
  state = {
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    baoxiang: '%',
  };
  componentDidMount = () => {
    //console.log(this.myChart);
    return;
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({ showModal: true });
    this.loaddata('%');
  };
  loaddata = baoxiang => {
    var self = this;
    var data = { baoxiang: baoxiang };
    socket.emit('/get/month12', data, function(result) {
      //console.log("month12============================");
      //console.log(result);
      //console.log("===================");
      self.setState({ lbls: result.lbls, values: result.values });
    });
  };
  onSelectBaoxiang = baoxiang => {
    this.setState({ baoxiang: baoxiang });
    this.loaddata(baoxiang);
  };
  logChange = val => {
    //console.log("Selected: " + JSON.stringify(val));
    if (val != null) {
      this.setState({ baoxiang: val.value });
      this.loaddata(val.value);
    } else {
      this.setState({ baoxiang: '%' });
      this.loaddata('%');
    }
  };
  render = () => {
    var bg = []; //values.length);
    for (var i = 0; i < this.state.values.length; i++) {
      bg.push('rgba(95, 192, 99, 1)');
    }
    var data = {
      labels: this.state.lbls,
      datasets: [
        {
          label: '调试台数',
          data: this.state.values,
          backgroundColor: bg,
          borderWidth: 2,
        },
      ],
    };
    //console.log(data);
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
      <Modal
        ref="modal"
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header ref="header" closeButton>
          <Modal.Title>统计</Modal.Title>
        </Modal.Header>
        <Modal.Body ref="body">
          <DropdownButton
            ref="drop"
            title={this.state.baoxiang}
            id="id_dropdown2"
          >
            <Dropdown.Item onSelect={() => this.onSelectBaoxiang('马红权')}>
              马红权
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onSelectBaoxiang('陈旺')}>
              陈旺
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onSelectBaoxiang('吴振宁')}>
              吴振宁
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onSelectBaoxiang('%')}>*</Dropdown.Item>
          </DropdownButton>
          {
            //<canvas ref={(input) => { this.myChart = input; }} id="myChart" width="400" height="400"></canvas>
          }
          <Bar data={data} options={options} width={600} height={300} />
        </Modal.Body>
      </Modal>
    );
  };
}
/////////////////////////////
class DlgCopyPack extends React.Component {
  state = {
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
  };
  newnameChange = event => {
    this.setState({ newname: event.target.value });
  };
  copy_pack = () => {
    //console.log(this.src_id+" "+this.state.newname);
    var self = this;
    var data1 = {};
    data1.oldid = this.src_id;
    data1.newname = this.state.newname;
    socket.emit('/copypack/', data1, result => {
      self.setState({ error: result.message });
    });
  };
  auto_change = data => {
    var value = data.value;
    //console.log("auto_change");
    if (value.length > 1) {
      socket.emit('/get/Pack', { search: value }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    }
  };
  auto_select = (event, data) => {
    //console.log("selected");
    //console.log(data)
    this.src_id = data.suggestion.id;
    //this.setState({ auto_items: [ item ] })
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({ showModal: true });
    this.src_id = null;
  };
  onChange = (event, { newValue }) => {
    //console.log(newValue);
    this.setState({ auto_value: newValue });
  };
  render = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>复制包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>包名称:</label>
                </td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'states-autocomplete',
                      value: this.state.auto_value,
                      onChange: this.onChange,
                    }}
                    onSuggestionSelected={this.auto_select}
                    onSuggestionsFetchRequested={this.auto_change}
                    onSuggestionsClearRequested={() => {}}
                    getSuggestionValue={item => item.name}
                    ref="autocomplete"
                    suggestions={this.state.auto_items}
                    renderSuggestion={(item, isHighlighted) => (
                      <div key={item.id} id={item.id}>
                        {item.name}
                      </div>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>新包名称:</label>
                </td>
                <td>
                  <input
                    id="nameto"
                    type="text"
                    onChange={this.newnameChange}
                    size="15"
                    value={this.state.newname}
                    maxLength="30"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.copy_pack}>复制</button>
          <p>{this.state.error}</p>
        </Modal.Body>
      </Modal>
    );
  };
}
//DlgParts///////////////////////////
class DlgPacks extends React.Component {
  mystate = {
    start: 0,
    limit: 5,
    baoxiang: '',
    logined: false,
    search: '',
  };
  state = {
    contacts: [],
    user: 'AnonymousUser',
    start: 0,
    total: 0,
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
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({ showModal: true });
    this.loaddata();
  };
  loaddata = () => {
    socket.emit(
      '/get/Pack',
      {
        start: this.mystate.start,
        limit: this.mystate.limit,
        search: this.mystate.search,
        baoxiang: this.mystate.baoxiang,
      },
      contacts2 => {
        var user = contacts2.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts2.total,
          start: this.mystate.start,
        });
        this.mystate.total = contacts2.total;
      }
    );
  };
  handlePrev = e => {
    this.mystate.start = this.mystate.start - this.mystate.limit;
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = e => {
    this.mystate.start = this.mystate.start + this.mystate.limit;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  jump = () => {
    this.mystate.start = parseInt(this.state.start_input, 10) - 1;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };
  mapfunc = (contact, idx) => {
    ////console.log(contact);
    if (contact.img == null || contact.image === '')
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.name}</td>
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.name}</td>
        </tr>
      );
  };
  render = () => {
    const contactRows = this.state.contacts.map(this.mapfunc);
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>备件</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive bordered condensed>
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows}</tbody>
          </Table>
          <Button onClick={this.handlePrev}>前一页</Button>
          <label id="page">
            {this.state.start + 1}../{this.state.total}
          </label>
          <Button onClick={this.handleNext}>后一页</Button>
          <input
            maxLength="6"
            size="6"
            onChange={this.handlePageChange}
            value={this.state.start_input}
          />
          <button id="page_go" className="btn btn-info" onClick={this.jump}>
            跳转
          </button>
        </Modal.Body>
      </Modal>
    );
  };
}

//DlgItems///////////////////////////
class DlgItems extends React.Component {
  mystate = {
    start: 0,
    limit: 5,
    baoxiang: '',
    logined: false,
    search: '',
  };
  state = {
    contacts: [],
    user: 'AnonymousUser',
    start: 0,
    total: 0,
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
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({ showModal: true });
    this.loaddata();
  };
  loaddata = () => {
    socket.emit(
      '/get/Item',
      {
        start: this.mystate.start,
        limit: this.mystate.limit,
        search: this.mystate.search,
        baoxiang: this.mystate.baoxiang,
      },
      contacts2 => {
        var user = contacts2.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts2.total,
          start: this.mystate.start,
        });
        this.mystate.total = contacts2.total;
      }
    );
  };
  handlePrev = e => {
    this.mystate.start = this.mystate.start - this.mystate.limit;
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = e => {
    this.mystate.start = this.mystate.start + this.mystate.limit;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  jump = () => {
    this.mystate.start = parseInt(this.state.start_input, 10) - 1;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };
  mapfunc = (contact, idx) => {
    ////console.log(contact);
    if (contact.img == null || contact.image === '')
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td>{contact.name}</td>
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
          <td>{contact.name}</td>
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
  render = () => {
    const contactRows = this.state.contacts.map(this.mapfunc);
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>备件</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive bordered condensed>
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
          <Button onClick={this.handlePrev}>前一页</Button>
          <label id="page">
            {this.state.start + 1}../{this.state.total}
          </label>
          <Button onClick={this.handleNext}>后一页</Button>
          <input
            maxLength="6"
            size="6"
            onChange={this.handlePageChange}
            value={this.state.start_input}
          />
          <button id="page_go" className="btn btn-info" onClick={this.jump}>
            跳转
          </button>
        </Modal.Body>
      </Modal>
    );
  };
}
//ContactEdit//////////////////////
class ContactEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log(React);
  }
  state = {
    showModal: false,
    contact: {
      yujifahuo_date: moment(),
      tiaoshi_date: moment(),
    },
    hiddenPacks: true,
    bg: {},
    date_open: false,
  };

  close = () => {
    this.setState({ showModal: false });
  };
  open2 = idx => {
    this.setState({ showModal: true });
    this.setState({ bg: {} });
    this.parent = this.props.parent;
    this.index = idx;
    if (this.index == null) {
      this.old = {
        yujifahuo_date: moment().format('YYYY-MM-DD'),
        tiaoshi_date: moment().format('YYYY-MM-DD'),
        addr: '',
        channels: '',
        baoxiang: '',
        hetongbh: '',
        shenhe: '',
        yonghu: '',
        yiqibh: '',
        yiqixinghao: '',
      };
      this.setState({ hiddenPacks: true });
    } else {
      this.old = this.parent.state.contacts[this.index];
      if (this.old.channels === undefined) {
        this.old.channels = '';
      }
      if (this.old.yiqixinghao === undefined) {
        this.old.yiqixinghao = '';
      }
      this.setState({ hiddenPacks: false });
    }
    this.setState({ contact: this.old });
  };

  handleCopy = data => {
    console.log('copy');
    this.index = null;
    var contact2 = update(this.state.contact, { id: { $set: '' } });
    console.log(contact2);
    this.setState({ contact: contact2 });
    this.setState({ hiddenPacks: true });
  };
  handleSave = data => {
    let url; //="/Contact";
    if (this.state.contact.id) {
      url = '/put/Contact';
    } else {
      url = '/post/Contact';
    }
    socket.emit(url, this.state.contact, res => {
      console.log(res);
      if (res.success) {
        this.setState({ contact: res.data });
        this.parent.handleContactChange(this.index, res.data);
        if (this.index) {
          //console.log("true");
        } else {
          //console.log("false");
          this.index = 0;
        }
        this.old = res.data;
        this.setState({ bg: {} });
        this.setState({ hiddenPacks: false });
      } else {
        alert(res.message);
      }
    });
  };
  tiaoshi_date_change = value => {
    //this.state.yujifahuo_date=value;
    var e_target_name = 'tiaoshi_date';
    //console.log(this.old[e_target_name]);
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM-DD');
    }
    //console.log(t);
    if (this.old[e_target_name] === t) {
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      ////console.log("not equal")
      //this.state.bg[e_target_name]="#8888ff";
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.contact, {
      [e_target_name]: { $set: t },
    });
    //console.log(contact2);
    this.setState({ contact: contact2 });
  };

  yujifahuo_date_change = value => {
    //this.state.yujifahuo_date=value;
    var e_target_name = 'yujifahuo_date';
    //console.log(this.old[e_target_name]);
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM-DD');
    }
    //console.log(t);
    if (this.old[e_target_name] === t) {
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.contact, {
      [e_target_name]: { $set: t },
    });
    //console.log(contact2);
    this.setState({ contact: contact2 });
  };
  channels_change = (event, { newValue }) => {
    this.change1(newValue);
  };
  channels_change_fetch = () => {};
  channels_select = (event, data) => {
    this.change1(data.suggestion);
  };
  change1 = item => {
    //console.log("selected");
    //console.log(item);
    if (this.old.channels === item) {
      const bg2 = update(this.state.bg, { channels: { $set: '#ffffff' } });
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, { channels: { $set: '#8888ff' } });
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.contact, { channels: { $set: item } });
    //console.log(contact2);
    this.setState({ contact: contact2 });
  };
  yiqixinghao_change = (event, { newValue }) => {
    this.change2(newValue);
  };
  yiqixinghao_select = (event, data) => {
    this.change2(data.suggestion);
  };
  change2 = item => {
    //console.log("selected");
    //console.log(item);
    if (this.old.yiqixinghao === item) {
      const bg2 = update(this.state.bg, { yiqixinghao: { $set: '#ffffff' } });
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, { yiqixinghao: { $set: '#8888ff' } });
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.contact, {
      yiqixinghao: { $set: item },
    });
    //console.log(contact2);
    this.setState({ contact: contact2 });
  };
  handleChange = e => {
    //console.log("change");
    //console.log(e);
    //console.log(e.target.value);
    //console.log(e.target.name);
    if (this.old[e.target.name] === e.target.value) {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      ////console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.contact, {
      [e.target.name]: { $set: e.target.value },
    });
    //console.log(contact2);
    this.setState({ contact: contact2 });
  };
  matchStateToTerm = (state, value) => {
    return state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  };
  render = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>编辑仪器信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    disabled="disabled"
                    value={this.state.contact.id}
                  />
                </td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.yonghu }}
                    type="text"
                    id="yonghu"
                    name="yonghu"
                    value={this.state.contact.yonghu}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.addr }}
                    type="text"
                    id="addr"
                    name="addr"
                    value={this.state.contact.addr}
                    onChange={this.handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'channels-autocomplete',
                      style: { backgroundColor: this.state.bg.channels },
                      value: this.state.contact.channels,
                      onChange: this.channels_change,
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
                    onSuggestionSelected={this.channels_select}
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
                  {
                    <Autosuggest
                      inputProps={{
                        id: 'yiqixinghao-autocomplete',
                        style: { backgroundColor: this.state.bg.yiqixinghao },
                        value: this.state.contact.yiqixinghao,
                        onChange: this.yiqixinghao_change,
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
                      ]}
                      getSuggestionValue={item => item}
                      onSuggestionsFetchRequested={() => {}}
                      onSuggestionsClearRequested={() => {}}
                      onSuggestionSelected={this.yiqixinghao_select}
                      renderSuggestion={item => <span>{item}</span>}
                    />
                  }
                </td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.yiqibh }}
                    type="text"
                    id="yiqibh"
                    name="yiqibh"
                    value={this.state.contact.yiqibh}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.baoxiang }}
                    type="text"
                    id="baoxiang"
                    name="baoxiang"
                    value={this.state.contact.baoxiang}
                    onChange={this.handleChange}
                  />
                </td>
                <td>审核:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.shenhe }}
                    type="text"
                    id="shenhe"
                    name="shenhe"
                    value={this.state.contact.shenhe}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>
                  <DateTime
                    ref="datetime1"
                    timeFormat={false}
                    inputProps={{
                      style: { backgroundColor: this.state.bg.yujifahuo_date },
                    }}
                    id="yujifahuo_date"
                    name="yujifahuo_date"
                    value={this.state.contact.yujifahuo_date}
                    onChange={this.yujifahuo_date_change}
                  />
                </td>
                <td>调试时间:</td>
                <td>
                  <DateTime
                    ref="datetime2"
                    timeFormat={false}
                    inputProps={{
                      style: { backgroundColor: this.state.bg.tiaoshi_date },
                    }}
                    name="tiaoshi_date"
                    value={this.state.contact.tiaoshi_date}
                    onChange={this.tiaoshi_date_change}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.hetongbh }}
                    type="text"
                    id="hetongbh"
                    name="hetongbh"
                    value={this.state.contact.hetongbh}
                    onChange={this.handleChange}
                  />
                </td>
                <td>方法:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.method }}
                    type="text"
                    id="method"
                    name="method"
                    disabled={true}
                    defaultValue={this.state.contact.method}
                  />
                  {
                    //<button className="btn" id="bt_file"><Glyphicon glyph="pencil" />
                    //</button>
                    //<button className="btn" id="bt_removefile"><Glyphicon glyph="remove" /></button>
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              className="btn btn-primary"
              id="bt_save"
              onClick={this.handleSave}
            >
              保存
            </button>
            <button
              className="btn"
              style={{ margin: '20px 20px 20px 20px' }}
              id="bt_clearid"
              onClick={this.handleCopy}
            >
              复制
            </button>
          </div>
          <div id="id_usepacks" hidden={this.state.hiddenPacks}>
            <UsePacks2 contact_id={this.state.contact.id} />
          </div>
        </Modal.Body>
      </Modal>
    );
  };
}
///////////////////////////////////App/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
export default class App extends React.Component {
  constructor() {
    super();
    this.contactedit = React.createRef();
  }
  mystate = {
    start: 0,
    limit: 10,
    total: 0,
    baoxiang: '',
    logined: false,
    search: '',
  };
  state = {
    displayFilterDanwei: 'none',
    filter_danwei: '',
    displayFilterHtbh: 'none',
    filter_htbh: '',
    contacts: [],
    user: 'AnonymousUser',
    start: 0,
    total: 0,
    search: '',
    baoxiang: '',
    start_input: 1,
    currentIndex: null,
    connect_error: false,
  };
  componentDidMount = () => {
    socket.on('connect_error', () => {
      this.setState({ connect_error: true });
    });
    socket.on('connect', () => {
      this.setState({ connect_error: false });
    });
    this.load_data();
  };
  load_data = () => {
    console.log('loaddata');
    socket.emit(
      '/get/Contact',
      {
        start: this.mystate.start,
        limit: this.mystate.limit,
        search: this.state.filter_htbh,
        filter_danwei: this.state.filter_danwei,
        baoxiang: this.mystate.baoxiang,
      },
      contacts => {
        var user = contacts.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.mystate.total = contacts.total; //because async ,mystate set must before state;
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts.total,
          start: this.mystate.start,
        });
      }
    );
  };
  handleContactChange = (idx, contact) => {
    console.log(idx);
    let contacts2;
    if (idx != null) {
      contacts2 = update(this.state.contacts, { [idx]: { $set: contact } });
      console.log(contacts2);
    } else {
      contacts2 = update(this.state.contacts, { $unshift: [contact] });
    }
    this.setState({ contacts: contacts2 });
  };
  handleUserChange = user => {
    if (user === 'AnonymousUser') {
      this.setState({
        logined: false,
      });
    } else {
      this.setState({
        logined: true,
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.load_data();
  };
  handleLogout = () => {
    //console.log("logout");
    // Client.logout((data) => {
    //   //console.log("logout" + data);
    //   this.setState({
    //     logined: false,
    //     user: "AnonymousUser",
    //     total:0,
    //     start:0,
    //   });
    //   this.handleUserChange(this.state.user);
    // });
  };

  handleSearchChange = e => {
    this.mystate.search = e.target.value;
    this.setState({ search: this.mystate.search });
  };
  handlePrev = e => {
    this.mystate.start = this.mystate.start - this.mystate.limit;
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.load_data();
  };
  search = e => {
    this.mystate.start = 0;
    this.load_data();
  };
  jump = () => {
    this.mystate.start = parseInt(this.state.start_input, 10) - 1;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.load_data();
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };

  onDetailClick = contactid => {
    //console.log(contactid);
    socket.emit('/parts/showcontact', { id: contactid }, data => {
      //console.log(data);
    });
  };
  handleNext = e => {
    this.mystate.start = this.mystate.start + this.mystate.limit;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.load_data();
  };
  onSelectBaoxiang = e => {
    this.mystate.baoxiang = e;
    this.mystate.start = 0;
    this.setState({ baoxiang: e });
    this.load_data();
  };
  auto_change = (event, value) => {
    //console.log("auto_change");
    if (value.length > 1) {
      this.setState({ auto_value: value, auto_loading: true });
      socket.emit('/get/Pack', { search: value }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    } else {
      this.setState({ auto_value: value, auto_loading: false });
    }
  };
  onLoginSubmit = data => {
    //console.log(data);
    // Client.login(data.username, data.password, (res) => {
    //   if (res.success) {
    //     this.setState({
    //       logined: true,
    //     });
    //     this.setState({
    //       user: data.username
    //     });
    //     this.handleUserChange(this.state.user);
    //   }
    // });
  };
  handleEdit = idx => {
    //this.setState({currentIndex:idx});
    this.contactedit.current.open2(idx);
  };
  opendlgfolder = contactid => {
    this.refs.dlgfolder.open(contactid);
  };
  opendlgfolder2 = contactid => {
    this.refs.dlgfolder2.open(contactid);
  };
  opendlgcheck = (contactid, yiqibh) => {
    this.refs.dlgcheck.open(contactid, yiqibh);
  };
  openDlgPacks = () => {
    this.refs.dlgpacks.open();
  };
  openDlgCopyPack = () => {
    this.refs.dlgcopypack.open();
  };
  opendlgurl = () => {
    this.refs.dlgurl.open();
  };
  opendlgwait = () => {
    this.refs.dlgwait.open();
  };
  openDlgStat = () => {
    this.refs.dlgstat.open();
  };
  openDlgImport = () => {
    this.refs.dlgimport.open();
  };
  show_displayFilterHtbh = () => {
    this.setState({ displayFilterHtbh: 'inline' });
  };
  handle_filterhtbh_Change = e => {
    console.log(e.target.value);
    this.setState({ filter_htbh: e.target.value });
  };
  handle_filterhtbh_input = () => {
    console.log(this.state.filter_htbh);
    if (this.state.filter_htbh === '') {
      this.setState({ displayFilterHtbh: 'none' });
    }
    this.mystate.start = 0;
    this.load_data();
  };
  show_displayFilterDanwei = () => {
    this.setState({ displayFilterDanwei: 'inline' });
  };
  handle_filterdanwei_Change = e => {
    console.log(e.target.value);
    this.setState({ filter_danwei: e.target.value });
  };
  handle_filterdanwei_input = () => {
    console.log(this.state.filter_danwei);
    if (this.state.filter_danwei === '') {
      this.setState({ displayFilterDanwei: 'none' });
    }
    this.mystate.start = 0;
    this.load_data();
  };
  render() {
    //console.log("render=========================");
    const contactRows = this.state.contacts.map((contact, idx) => (
      <tr key={idx}>
        <td>{contact.id}</td>
        <td>
          <b>{contact.hetongbh}</b>
        </td>
        <td>{contact.yonghu}</td>
        <td>{contact.addr}</td>
        <td>{contact.channels}</td>
        <td>{contact.yiqixinghao}</td>
        <td>
          <Button onClick={() => this.handleEdit(idx)}>{contact.yiqibh}</Button>
          <DropdownButton title="" id="id_dropdown3">
            <Dropdown.Item onSelect={() => this.onDetailClick(contact.id)}>
              详细
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() =>
                this.opendlgurl('/rest/updateMethod', this, idx, {
                  id: contact.id,
                })
              }
            >
              更新方法
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.opendlgwait(contact.id)}>
              全部文件
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => this.opendlgcheck(contact.id, contact.yiqibh)}
            >
              核对备料计划
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.opendlgfolder(contact.id)}>
              资料文件夹
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.opendlgfolder2(contact.id)}>
              资料文件夹2
            </Dropdown.Item>
          </DropdownButton>
        </td>
        <td>{contact.baoxiang}</td>
        <td>{contact.yujifahuo_date}</td>

        <td>{contact.method}</td>
      </tr>
    ));
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    //console.log(this.mystate);
    //console.log(this.state);
    if (this.state.start === 0) {
      hasprev = false;
    }
    if (this.state.start + this.state.limit >= this.state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = <Button onClick={this.handlePrev}>前一页</Button>;
    } else {
      prev = null;
    }
    if (hasnext) {
      next = <Button onClick={this.handleNext}>后一页</Button>;
    } else {
      next = null;
    }
    return (
      <div id="todoapp" className="table-responsive">
        <div
          style={{
            display: this.state.connect_error ? '' : 'none',
            textAlign: 'center',
            color: 'red',
          }}
        >
          !!!!!!!!!!连接错误!!!!!!!
        </div>
        <DlgItems ref="dlgitems" />
        <DlgPacks ref="dlgpacks" />
        <DlgCopyPack ref="dlgcopypack" />
        <DlgStat ref="dlgstat" />
        <DlgImport ref="dlgimport" />
        <DlgCheck ref="dlgcheck" />
        <DlgFolder2 ref="dlgfolder2" />
        <DlgFolder ref="dlgfolder" />
        <DlgWait ref="dlgwait" />
        <DlgUrl ref="dlgurl" />
        <ContactEdit
          ref={this.contactedit}
          parent={this}
          index={this.state.currentIndex}
          title="编辑"
        />
        <Navbar className="navbar-inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <span>装箱单</span>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              合同
            </NavItem>
            <DlgPacks />
            <DlgItems />
            <DlgCopyPack />
            <DlgStat />
          </Nav>
        </Navbar>
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleEdit(null)}
                >
                  新仪器
                </button>
              </td>
              <td>
                <DlgImport />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>
                <div>
                  合同编号
                  <span
                    onClick={this.show_displayFilterHtbh}
                    className="caret"
                    aria-hidden="true"
                  />
                </div>
                <div style={{ display: this.state.displayFilterHtbh }}>
                  <input
                    value={this.state.filter_htbh}
                    onChange={this.handle_filterhtbh_Change}
                  />
                  <button onClick={this.handle_filterhtbh_input}>filter</button>
                </div>
              </th>
              <th>
                <div>
                  用户单位
                  <span
                    onClick={this.show_displayFilterDanwei}
                    className="caret"
                    aria-hidden="true"
                  />
                </div>
                <div style={{ display: this.state.displayFilterDanwei }}>
                  <input
                    value={this.state.filter_danwei}
                    onChange={this.handle_filterdanwei_Change}
                  />
                  <button onClick={this.handle_filterdanwei_input}>
                    filter
                  </button>
                </div>
              </th>
              <th>客户地址</th>
              <th>通道配置</th>
              <th>仪器型号</th>
              <th>仪器编号</th>
              <th>
                包箱
                <DropdownButton title={this.state.baoxiang} id="id_dropdown2">
                  <Dropdown.Item onSelect={() => this.onSelectBaoxiang('马红权')}>
                    马红权
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => this.onSelectBaoxiang('陈旺')}>
                    陈旺
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => this.onSelectBaoxiang('吴振宁')}>
                    吴振宁
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => this.onSelectBaoxiang('')}>
                    *
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              <th>入库时间</th>
              <th>方法</th>
            </tr>
          </thead>
          <tbody id="contact-list">{contactRows}</tbody>
        </table>
        {prev}
        <label id="page">
          {this.state.start + 1}../{this.state.total}
        </label>
        {next}
        <input
          maxLength="6"
          size="6"
          onChange={this.handlePageChange}
          value={this.state.start_input}
        />
        <button id="page_go" className="btn btn-info" onClick={this.jump}>
          跳转
        </button>
        <div style={{ minHeight: '200px' }} />
      </div>
    );
  }
}
