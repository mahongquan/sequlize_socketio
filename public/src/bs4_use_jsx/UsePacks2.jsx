import React from 'react';
import Client from '../Client';
import {DropdownButton,Dropdown, Table, Button } from 'react-bootstrap';
import UsePackEditNew from './UsePackEditNew';
import Autosuggest from 'react-autosuggest';
import myglobal from '../myglobal';
const initState = {
    usepacks: [],
    show_edit:false,
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,
};
export default function UsePacks(props){
  const [state,setState]=React.useState(initState);
  const auto1=React.useRef(null);
  React.useEffect(() => {
    setState((prev)=>{
      return {...prev,newPackName:props.contact_hetongbh}
    });
  }, [props.contact_hetongbh]);

  React.useEffect(() => {
    if(props.contact_id!=null){
      load_data(props.contact_id);
    }
  }, [props.contact_id]);

  const load_data = contact_id => {
    if(!contact_id) return;
    Client.UsePacks(contact_id, usepacks => {
        setState((prev)=>{
          return {...prev,usepacks:usepacks.data}
        });
    },(error)=>{
      alert(error);
    });
  };
  const auto_change = data => {
    var value = data.value;
    if (value.length > 1) {
      Client.get('/rest/Pack/', { search: value }, items => {
        setState((state)=>({...state, auto_items: items.data }));
      });
    }
  };
  const auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    addrow(data.suggestion.id);
    //setState({auto_value:value, auto_items: [ item ] })
  };
  const onSuggestionsClearRequested = () => {};
  const bibei = id => {
    setState((state)=>({...state, auto_value: '必备' }));
    console.log(auto1);
    auto1.current.input.click();
    //auto_change(null,"必备");
  };
  const new_pack = id => {
    var url = '/rest/UsePackEx/';
    var data = { name: state.newPackName, contact: props.contact_id };
    Client.postOrPut(url, data, res => {
      var p = res.data;
      const newFoods = state.usepacks.concat(p);
      setState((state)=>({ ...state,usepacks: newFoods }));
    });
  };
  const addrow = pack_id => {
    var url = '/rest/UsePack/';
    var data = { contact: props.contact_id, pack: pack_id };
    Client.postOrPut(url, data, res => {
      var p = res.data;
      const newFoods = state.usepacks.concat(p);
      setState((state)=>({...state, usepacks: newFoods }));
    });
  };
  const newpackChange = e => {
    setState((state)=>({...state, newPackName: e.target.value }));
  };
  // const onEditClick = id => {};
  const onDeleteClick = itemIndex => {
    var url = '/rest/UsePack/';
    Client.delete1(url, { id: state.usepacks[itemIndex].id }, res => {
      const filteredFoods = state.usepacks.filter(
        (item, idx) => itemIndex !== idx
      );
      setState((state)=>({...state, usepacks: filteredFoods }));
    });
  };
  const handleEdit = idx => {
    setState((state)=>({...state,usepack:state.usepacks[idx]
      ,show_edit:true}));
    // refs.edit1.open2(idx);
    // set
  };
  const getUsers = input => {
    console.log('getUsers');
    console.log(input);
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch('/rest/Pack/?limit=10&search=' + input, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => {
        var r = { options: json.data };
        console.log(r);
        return r;
      });
  };
  const onChange = (event, { newValue }) => {
    console.log('onChange======================');
    console.log(newValue);
    setState((state)=>({...state,
      auto_value: newValue,
    }));
  };
  const onValueClick = value => {
    console.log(value);
  };
    const usepackRows = state.usepacks.map((usepack, idx) => (
      <tr key={idx}>
        <td>{usepack.id}</td>
        <td style={{display:"flex"}}>
        <Button variant="link" onClick={() => handleEdit(idx)}>
            {usepack.name}
        </Button>
          <DropdownButton
            variant="light"
            title=""
            onClick={
              (e)=>{e.stopPropagation();}
            }
          >
            <Dropdown.Item onClick={() => onDeleteClick(idx)}>
              删除
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    ));

    return (
      <div>
        <UsePackEditNew open={state.show_edit}
          onClose={()=>{
            setState((state)=>({...state,show_edit:false}));
          }}
          usepack={state.usepack}
          title="编辑"
        />
        <Table responsive bordered condensed="true">
          <thead>
            <tr>
              <td>id</td>
              <td>名称</td>
                </tr>
          </thead>
          <tbody>{usepackRows}</tbody>
        </Table>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>输 入 包 ：</label>
          <Autosuggest
            ref={auto1}
            inputProps={{
              value: state.auto_value,
              onChange: onChange,
            }}
            onSuggestionSelected={auto_select}
            onSuggestionsFetchRequested={auto_change}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={item => item.name}
            suggestions={state.auto_items}
            renderSuggestion={item => <span>{item.name}</span>}
          />
          <Button
            style={{ margin: '10px 10px 10px 10px' }}
            variant="info"
            onClick={bibei}
          >
            必备
          </Button>
        </div>

        <div
          style={{
            margin: '10px 10px 10px 0px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <label>新包名称：</label>
          <input
            placeholder="新包"
            value={state.newPackName}
            onChange={newpackChange}
          />
          <Button variant="secondary" id="id_new_usepack" onClick={new_pack}>
            新包
          </Button>
        </div>
      </div>
    );
  }
