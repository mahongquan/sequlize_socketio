import React from 'react';
import { Modal, Button,Spinner } from 'react-bootstrap';
import Client from '../Client';
import Autosuggest from 'react-autosuggest';
export default function DlgCopyPack(props){
  const [state,setState]=React.useState({
    src_id:null,
    showModal: false,
    error: '',
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    stopped: true,
  });
  const newnameChange = event => {
    setState((state)=>({...state, newname: event.target.value }));
  };
  const copy_pack = () => {
    console.log(state);
    var data1 = new FormData();
    setState((state)=>({...state,stopped: false }));
    data1.append('oldid', state.src_id);
    data1.append('newname', state.newname);
    Client.postForm('/rest/copypack/', data1, result => {
      setState((state)=>({...state,stopped:true, error: result.message }));
    });
  };
  const onSuggestionsClearRequested = () => {};
  const auto_change = data => {
    var value = data.value;
    console.log('auto_change');
    if (value.length > 1) {
      Client.get('/rest/Pack/', { search: value }, items => {
        setState((state)=>({...state, auto_items: items.data}));
      });
    }
  };
  const auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    setState((state)=>({...state,src_id:data.suggestion.id}));
  };
  const close = () => {
    props.onClose();
  };
  
  const onChange = (event, { newValue }) => {
    console.log(newValue);
    setState((state)=>({...state, auto_value: newValue }));
  };
    let showbutton,spin;
    if (state.stopped) {
      showbutton = 'block';
      spin=null;
    } else {
      spin=<Spinner animation="border" variant="primary"/>;
      showbutton = 'none';
    }
    return (
      <Modal
        show={props.open}
        onHide={props.onClose}
        dialogClassName="custom-modal"
      >
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
                      value: state.auto_value,
                      onChange: onChange,
                    }}
                    onSuggestionSelected={auto_select}
                    onSuggestionsFetchRequested={auto_change}
                    onSuggestionsClearRequested={
                      onSuggestionsClearRequested
                    }
                    getSuggestionValue={item => item.name}
                    suggestions={state.auto_items}
                    renderSuggestion={item => <span>{item.name}</span>}
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
                    onChange={newnameChange}
                    size="15"
                    value={state.newname}
                    maxLength="30"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Button
                      variant="secondary"
                      style={{ display: showbutton }}
                      onClick={copy_pack}
                    >
                      复制
                    </Button>
                    {spin}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p>{state.error}</p>
        </Modal.Body>
      </Modal>
    );
  };
