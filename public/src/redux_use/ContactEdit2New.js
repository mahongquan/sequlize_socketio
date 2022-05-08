import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
import React from 'react';
import UsePacks2 from './UsePacks2';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import update from 'immutability-helper';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import RichTextEditor from 'react-rte';
import { withStyles } from '@mui/styles';

import SelectYQXH from './SelectYQXH';
import SelectChannels from './SelectChannels';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import TextField from '@mui/material/TextField';
import "moment/locale/zh-cn";
import moment from "moment";

var _ = require('lodash');
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};
function ContactEdit2New(props) {
  const dispatch = useDispatch();
  var hiddenPacks = useSelector((state) => state.parts.hiddenPacks);
  var contact = useSelector((state) => state.parts.contact);
  var currentIndex = useSelector((state) => state.parts.currentIndex);
  var bg = useSelector((state) => state.parts.bg);
  const [state, setState] = React.useState({
    editRich: false,
    rich: RichTextEditor.createEmptyValue(),
  });
  const handleCopy = (data) => {
    console.log('copy');
    var contact2 = update(state.contact, { id: { $set: '' } });
    console.log(contact2);
    setState({ contact: contact2 });
    // props.store.dispatch({ type: types.hiddenPacks });
    // setState({ hiddenPacks: true });
  };
  const handleSave = () => {
    let dataSave = contact;
    dataSave.detail = state.rich.toString('html');
    dispatch(store.saveContact(dataSave,currentIndex))
  };
  const channels_change = (newValue) => {
    change1(newValue);
  };
  const change1 = (item) => {
    dispatch(
      store.actions.CONTACT_EDIT_CHANGE({
        name: "channels",
        value: item,
      })
    );
  };
  const yiqixinghao_change = (newValue) => {
    change2(newValue);
  };
  const change2 = (item) => {
    dispatch(
      store.actions.CONTACT_EDIT_CHANGE({
        name: "yiqixinghao",
        value: item,
      })
    );
  };
  const handleChange = (e) => {
    console.log(e);
    dispatch(
      store.actions.CONTACT_EDIT_CHANGE({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };
  const detailchange = (value) => {
    console.log(value);
    setState((prev)=>{
      var new_state=_.clone(prev);
      new_state.rich=value;
      return new_state;
    });
  };
  return (
    <Dialog open={props.showModal} onClose={props.handleClose} fullScreen>
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton onClick={props.handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={props.classes.flex}>
            编辑仪器信息
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <LocalizationProvider dateAdapter={DateAdapter }>
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
                    value={contact.id||""}
                  />
                </td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.yonghu }}
                    type="text"
                    id="yonghu"
                    name="yonghu"
                    value={contact.yonghu||""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.addr }}
                    type="text"
                    id="addr"
                    name="addr"
                    value={contact.addr||""}
                    onChange={handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <SelectChannels
                      style={{ backgroundColor: bg.channels }}
                      value={contact.channels||""}
                      onChange={channels_change}
                    />
                </td>
              </tr>
              <tr>
                <td>
                  <label>仪器型号:</label>
                </td>
                <td>
                    <SelectYQXH
                      value={contact.yiqixinghao||""}
                      onChange={yiqixinghao_change}
                      style={{ backgroundColor: bg.yiqixinghao }}
                    />
                </td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.yiqibh }}
                    type="text"
                    id="yiqibh"
                    name="yiqibh"
                    value={contact.yiqibh||""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.baoxiang }}
                    type="text"
                    id="baoxiang"
                    name="baoxiang"
                    value={contact.baoxiang||""}
                    onChange={handleChange}
                  />
                </td>
                <td>审核:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.shenhe }}
                    type="text"
                    id="shenhe"
                    name="shenhe"
                    value={contact.shenhe||""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>
                <DesktopDatePicker
                  inputFormat="YYYY-MM-DD"
                  style={{ backgroundColor: bg.tiaoshi_date }}
                  value={moment(contact.yujifahuo_date)}
                  onChange={(v)=>{
                      dispatch(
                        store.actions.CONTACT_EDIT_CHANGE({
                          name: "yujifahuo_date",
                          value: v.format('YYYY-MM-DD'),
                        })
                      );
                    }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </td>
                <td>调试时间:</td>
                <td>
                <DesktopDatePicker
                  inputFormat="YYYY-MM-DD"
                  style={{ backgroundColor: bg.tiaoshi_date }}
                  value={moment(contact.tiaoshi_date)}
                  onChange={(v)=>{
                      dispatch(
                        store.actions.CONTACT_EDIT_CHANGE({
                          name: "tiaoshi_date",
                          value: v.format('YYYY-MM-DD'),
                        })
                      );
                    }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.hetongbh }}
                    type="text"
                    id="hetongbh"
                    name="hetongbh"
                    value={contact.hetongbh||""}
                    onChange={handleChange}
                  />
                </td>
                <td>方法:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.method }}
                    type="text"
                    id="method"
                    name="method"
                    disabled={true}
                    value={contact.method||""}
                  />
                </td>
              </tr>

              <tr>
                <td>电气:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.dianqi }}
                    type="text"
                    name="dianqi"
                    value={contact.dianqi||""}
                    onChange={handleChange}
                  />
                </td>
                <td>机械:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.jixie }}
                    type="text"
                    name="jixie"
                    onChange={handleChange}
                    value={contact.jixie||""}
                  />
                </td>
              </tr>
              <tr>
                <td>红外:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.hongwai }}
                    type="text"
                    name="hongwai"
                    value={contact.hongwai||""}
                    onChange={handleChange}
                  />
                </td>
                <td>热导:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.redao }}
                    type="text"
                    name="redao"
                    onChange={handleChange}
                    value={contact.redao||""}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setState((prev)=>{
                        var new_state=_.clone(prev);
                        new_state.editRich=!prev.editRich;
                        return new_state;
                      });
                    }}
                  >
                    备注:
                  </Button>
                </td>
                <td colSpan="3">
                  <RichTextEditor
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
            <Button
              variant="outlined"
              color="primary"
              id="bt_save"
              onClick={handleSave}
            >
              保存
            </Button>
            <Button variant="outlined" onClick={handleCopy}>
              复制
            </Button>
          </div>
          <div hidden={hiddenPacks}>
            <UsePacks2 />
          </div>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
}
export default withStyles(styles)(ContactEdit2New);
