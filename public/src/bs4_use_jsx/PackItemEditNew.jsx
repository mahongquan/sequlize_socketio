import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import update from 'immutability-helper';
import Client from '../Client';
// import myglobal from '../myglobal';
export default function PackItemEditNew(props){
  const [state,setState]=React.useState({
    packitem: {},
    bg: {},
  });
   
  const close = () => {
    props.onClose();
  };

  React.useEffect(() => {
    if(props.index!=null)//props to state   
      setState({ packitem: props.item,bg:state.bg});
    else{
      setState({ packitem: {},bg:state.bg});
    }
  }, [props.index]);

  const handleSave = data => {
    var url = '/rest/BothPackItem';
    console.log(state.packitem);
    Client.postOrPut(url, state.packitem, res => {

      // let new_state= update(state, {packitem:{$set:res.data}});
      // setState(new_state);

      props.handlePackItemChange(props.index, res.data);
      // props.item = res.data;
      props.onClose();
    },(error)=>{
      console.log(error);
      // myglobal.app.show_webview(error);
    });
  };
  const updateState=(dic)=>{
    let new_dic;
    for(var one in dic){
      new_dic[one]={$set:dic[one]}
    }
    let new_state= update(state, new_dic);
    setState(new_state);
  }
  const quehuoChange = e => {
    var quehuo = state.packitem.quehuo;
    quehuo = !quehuo;
    let bg2;
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
  const  handleChange = e => {
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
                    value={state.packitem.id|| ""}
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
                    value={state.packitem.guige || ""}
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
                    value={state.packitem.bh || ""}
                    onChange={handleChange}
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
                    style={{ backgroundColor: state.bg.ct }}
                    id="ct"
                    name="ct"
                    value={state.packitem.ct || ""}
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
                    value={state.packitem.danwei || ""}
                    onChange={handleChange}
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
                    checked={state.packitem.quehuo || false}
                    onChange={quehuoChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button variant="primary" id="bt_save" onClick={handleSave}>
              保存
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
