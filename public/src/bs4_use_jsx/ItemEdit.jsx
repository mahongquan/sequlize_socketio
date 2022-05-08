import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import update from 'immutability-helper';
import Client from '../Client';
export default function ItemEdit(props){
  let state,setState;
  [state,setState]=React.useState({
    packitem: {},
    bg: {},
  });

  React.useEffect(() => {
    if(props.index!=null)//props to state   
      setState({ packitem: props.item,bg:state.bg});
    else{
      setState({ packitem: {},bg:state.bg});
    }
  }, [props.index]);

  const handleSave = data => {
    var url = '/rest/Item/';
    console.log(state.packitem);
    Client.postOrPut(url, state.packitem, res => {
      console.log(res);
      props.handlePackItemChange(props.index, res.data);
      // let new_state= update(state, {
      //   ["bg"]: { $set:{}},
      // });
      // setState(new_state);
      props.onClose();
    });
  };
const quehuoChange = e => {
    var quehuo = state.packitem.quehuo;
    quehuo = !quehuo;
    if (props.item.quehuo === quehuo) {
      bg2 = update(state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
    } else {
      bg2 = update(state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
    }
    const contact2 = update(state.packitem, {
      quehuo: { $set: quehuo },
    });
    let new_state= update(state, {
        ["bg"]: { $set:bg2 },
        ["packitem"]:{ $set:contact2 },
     });
    setState(new_state);
  };
  const handleChange = e => {
    console.log('change');
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    let bg2
    if (props.item[e.target.name] === e.target.value) {
      bg2 = update(state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
    } else {
      bg2 = update(state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
    }
    const contact2 = update(state.packitem, {
      [e.target.name]: { $set: e.target.value },
    });
    let new_state= update(state, {
        ["bg"]: { $set:bg2 },
        ["packitem"]:{ $set:contact2 },
     });
    console.log(new_state);
    setState(new_state);
  };
    return (
      <Modal show={props.open} onHide={props.onClose}>
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
                    value={state.packitem.id || ""}
                  />
                </td>
              </tr>
              <tr>
                <td>名称:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.name }}
                    type="text"
                    id="name"
                    name="name"
                    value={state.packitem.name || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>规格:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.guige }}
                    type="text"
                    name="guige"
                    value={state.packitem.guige|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.bh }}
                    type="text"
                    id="bh"
                    name="bh"
                    value={state.packitem.bh|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>单位:</label>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ backgroundColor: state.bg.danwei }}
                    id="danwei"
                    name="danwei"
                    value={state.packitem.danwei|| ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button
              className="btn btn-primary"
              id="bt_save"
              onClick={handleSave}
            >
              保存
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
