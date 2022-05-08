import React from 'react';
import Client from '../Client';
import {DropdownButton,Dropdown,  Table, Button } from 'react-bootstrap';
import PackItemEditNew from './PackItemEditNew';
import update from 'immutability-helper';
import Autosuggest from 'react-autosuggest';
import myglobal from '../myglobal';
import DlgOk from './DlgOk';
export default function PackItems(props){
  const [state,setState]=React.useState({
    items: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,
    show_edit:false,
    item:null,
    index:null,
  })
  // React.useEffect(() => {
  //   console.log("PackItems render=====================================");
  //   console.log(state);
  // });
  React.useEffect(() => {
    if(!props.pack_id) return;
    Client.PackItems(props.pack_id, items => {
      setState({...state,items:items.data});
    },(error)=>{
      console.log(error);
    });
  }, [props.pack_id]);

  const close_ok = sure => {
    setState({...state,show_ok:false});
  };  
  const auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    addrow(data.suggestion.id);
    //setState({auto_value:value, auto_items: [ item ] })
  };
  const auto_change = data => {
    var value = data.value;
    // console.log("auto_change");
    if (value.length > 1) {
      Client.get('/rest/Item/', { query: value, limit: 15 }, items => {
        setState((state)=>{return{...state,auto_items:items.data,auto_loading:false}});
      });
    }
  };
  const new_packitem = id => {
    if(state.newPackName===""){
      setState({...state,show_ok:true});
      return;
    }
    var url = '/rest/BothPackItem/';
    var data = { name: state.newPackName, pack: props.pack_id };
    console.log(data);
    Client.postOrPut(url, data, res => {
      var p = res.data;
      const newFoods = state.items.concat(p);
      setState(state=>({...state,items:newFoods}));
    });
  };
  const handlePackItemChange = (idx,item) => {
    console.log(idx);
    
    const new_items = update(state.items, { [idx]: { $set: item } });
    setState((prev)=>{return{...prev,items:new_items};});
  };
  const addrow = item_id => {
    var url = '/rest/PackItem/';
    var data = { pack: props.pack_id, itemid: item_id };
    Client.post(url, data, res => {
      var p = res.data;
      const newFoods = state.items.concat(p);
      setState((state)=>({...state,items:newFoods}));
    });
  };
  const newpackChange = e => {
    // setState({ newPackName: e.target.value });
    setState((state)=>({...state,newPackName:e.target.value}));
  };
  const onEditClick = id => {};
  const onDeleteClick = itemIndex => {
    var url = '/rest/PackItem/';
    Client.delete1(url, { id: state.items[itemIndex].id }, res => {
      const filteredFoods = state.items.filter(
        (item, idx) => itemIndex !== idx
      );
      // setState({ items: filteredFoods });
      setState((state)=>({...state,items:filteredFoods}));
    });
  };
  const onChange = (event, { newValue }) => {
    // console.log(newValue);
    // setState({ auto_value: newValue });
    setState((state)=>({...state,auto_value:newValue}));
  };
  const handleEdit = idx => {
    // setState({item:state.items[idx],show_edit:true,index:idx});
    setState((state)=>({...state,item:state.items[idx],show_edit:true,index:idx}));
  };
  const onSuggestionsClearRequested = () => {};
    let itemRows = state.items.map((item, idx) => (
      <tr key={idx}>
        <td style={{display:"flex",justifyContent:"space-between"}}>
        <Button size="sm" variant="link" onClick={() => handleEdit(idx)}>
          {item.name}
        </Button>
        <DropdownButton variant="light"
            title=""
        >
          <Dropdown.Item
            variant="warning" size="sm"
            onClick={() => onDeleteClick(idx)}
          >
            删除
          </Dropdown.Item>
        </DropdownButton>
        </td>
        <td>{item.guige}</td>
        <td>{item.ct}{item.danwei}</td>
        <td>{item.bh}</td>
        <td hidden={state.release}>{item.pack}</td>
        <td>
          <input
            type="checkbox"
            disabled="disabled"
            name="quehuo"
            checked={item.quehuo}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <Table responsive bordered condensed="true">
          <thead>
            <tr>
              <td>备件名称</td>
              <td>规格</td>
              <td>数量</td>
              <td>编号</td>
              <td hidden={state.release}>pack</td>
              <td>缺货</td>
            </tr>
          </thead>
          <tbody>{itemRows}</tbody>
        </Table>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>输入已有备件</label>
          <Autosuggest
            inputProps={{
              value: state.auto_value,
              onChange: onChange,
              }}
            onSuggestionSelected={auto_select}
            onSuggestionsFetchRequested={auto_change}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={item => item.name}
            suggestions={state.auto_items}
            renderSuggestion={item => (
              <span>
                {item.id + ': ' + item.bh + ' '}
                <b>{item.name}</b>
                {' ' + item.guige}
              </span>
            )}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>新备件名称：</label>
          <input
            id="new_pack1"
            placeholder="新备件"
            value={state.newPackName}
            onChange={newpackChange}
          />
          <Button
            className="btn btn-info"
            id="id_new_item"
            onClick={new_packitem}
          >
            新备件
          </Button>
        </div>

        <div style={{ minHeight: '200px' }} />
        {
          state.show_edit?(<PackItemEditNew open={state.show_edit}
          handlePackItemChange={handlePackItemChange}
          item={state.item}
          index={state.index}
          onClose={()=>{
            setState((prev)=>{return{...prev,show_edit:false};});
           }}/>):null
        }
        <DlgOk
            description="备件名称编号不能为空"
            showModal={state.show_ok}
            closeModal={close_ok}
          />
      </div>
    );
  }
