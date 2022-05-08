import React from 'react';
import {Dropdown,DropdownButton, Form,Button} from 'react-bootstrap'
// const data=[{id:"101",name:"zs",quehuo:true},{id:"102",name:"ls",quehuo:false},{id:"103",name:"ww",quehuo:true}]
import update from 'immutability-helper';
import Autosuggest from 'react-autosuggest';
import Client from '../Client';
import DlgOk from './DlgOk';
import lodash from "lodash";
export default function TableEdit(props){
  const[state,setState]=React.useState({
    data:[]
    ,is_saving:false
    ,status:[]
    ,newPackName: ''
    ,auto_value: ''
    ,auto_items: []
  });
  React.useEffect(()=>{
    let status=[];
    for(var i=0;i<props.data.length;i++){
      status.push({bg:{}})
    }
    setState((state)=>({...state,is_saving:false,data:lodash.cloneDeep(props.data),status:status}))
  },[props.data])

  const close_ok = sure => {
    setState({...state,show_ok:false});
  };  
  const auto_select = (event, data) => {
    // console.log('selected');
    // console.log(data);
    addrow(data.suggestion);
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
    const filteredFoods = state.data;
    filteredFoods.push({name:state.newPackName
      ,guige:"",bh:"",danwei:"个"
      ,id:null,itemid:null,ct:1,quehuo:false,pack:props.pack_id})
    let new_status=state.status;
    new_status.push({bg:{name:"#aaf"},new:true})
    setState((state)=>({...state,data:filteredFoods,status:new_status}));
  };
  const handlePackItemChange = (idx,item) => {
    console.log(idx);
    
    const new_items = update(state.items, { [idx]: { $set: item } });
    setState((prev)=>{return{...prev,items:new_items};});
  };
  const addrow = item=> {
    // var url = '/rest/PackItem';
    // var data = { pack: props.pack_id, itemid: item_id };
    // Client.post(url, data, res => {
    //   var p = res.data;
    //   const newFoods = state.items.concat(p);
    //   setState((state)=>({...state,items:newFoods}));
    // });
    console.log(item);
    const filteredFoods = state.data;
    filteredFoods.push({...item,id:null,itemid:item.id,ct:1,quehuo:false,pack:props.pack_id})
    let new_status=state.status;
    new_status.push({bg:{name:"#aaf"},new:true})
    setState((state)=>({...state,data:filteredFoods,status:new_status}));
  };
  const newpackChange = e => {
    // setState({ newPackName: e.target.value });
    setState((state)=>({...state,newPackName:e.target.value}));
  };
  const onEditClick = id => {};
  const onDeleteClick = itemIndex => {
    var url = '/rest/PackItem';
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
    const item=lodash.clone(state.items[idx]);
    setState((state)=>({...state,item:item,show_edit:true,index:idx}));
  };
  const onSuggestionsClearRequested = () => {};
  //console.log(state);
  const data_view=state.data.map((item,idx)=>{
      return(<tr key={idx} style={{border:state.status[idx].delete?"solid 1px red":"solid 1px black"}}>
        <td >{state.data[idx].id}</td>
        <td><input  
        style={{borderWidth:"0px"
            ,backgroundColor:state.status[idx].bg["name"]
          }} value={item.name||""} onChange={(e)=>{
          if(state.status[idx].new){
                state.status[idx].bg["name"]="#aaf"
          }
          else{
            if(props.data[idx]["name"]===e.target.value){
              state.status[idx].bg["name"]="#fff"
            }
            else{
              state.status[idx].bg["name"]="#aaf"
            }
          }
          setState((state)=>{
            item.name=e.target.value;
            let data=lodash.clone(state.data)
            data[idx]=item;
            return {...state,data:data}
          });
        }}></input>
        <DropdownButton
            variant="light"
            title=""
          >
            <Dropdown.Item onClick={() => {
              if(idx<props.data.length){
                let new_status=state.status;
                new_status[idx].delete=true;
                setState((state)=>({...state,status:new_status}));
              }else{
                const filteredFoods = state.data.filter(
                      (item, itemIndex) => itemIndex !== idx
                );
                const new_status = state.status.filter(
                      (item, itemIndex) => itemIndex !== idx
                );
                setState((state)=>({...state,data:filteredFoods,status:new_status}));
              }
            }}>
              删除
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              let new_status=state.status;
              new_status[idx].delete=false;
              setState((state)=>({...state,status:new_status}));
            }}>
              恢复
            </Dropdown.Item>
    {/*        <Dropdown.Item onClick={() => {
              const filteredFoods = state.data;
              filteredFoods.push({name:"new",ct:1,quehuo:true})
              let new_status=state.status;
              new_status.push({bg:{id:"#aaf",name:"#aaf",quehuo:"#aaf"},new:true})
              setState((state)=>({...state,data:filteredFoods,status:new_status}));
            }}>
              insert
            </Dropdown.Item>*/}
          </DropdownButton>
        </td>
        <td><input  
        style={{borderWidth:"0px",maxWidth:"1500px"
            ,backgroundColor:state.status[idx].bg["guige"]
          }} value={item.guige||""} onChange={(e)=>{
          if(state.status[idx].new){
                state.status[idx].bg["guige"]="#aaf"
          }
          else{
            if(props.data[idx]["guige"]===e.target.value){
              state.status[idx].bg["guige"]="#fff"
            }
            else{
              state.status[idx].bg["guige"]="#aaf"
            }
          }
          setState((state)=>{
            item.guige=e.target.value;
            let data=lodash.clone(state.data)
            data[idx]=item;
            return {...state,data:data}
          });
        }}></input></td>
        <td><input  size={(""+item.ct).length}
        style={{borderWidth:"0px"
            ,backgroundColor:state.status[idx].bg["ct"]
          }} value={item.ct||""} onChange={(e)=>{
          if(state.status[idx].new){
                state.status[idx].bg["ct"]="#aaf"
          }
          else{
            if(props.data[idx]["ct"]===e.target.value){
              state.status[idx].bg["ct"]="#fff"
            }
            else{
              state.status[idx].bg["ct"]="#aaf"
            }
          }
          setState((state)=>{
            let start=parseInt(e.target.value);
            if(lodash.isNaN(start)) {
                start=0;
            }
            item.ct=start;
            let data=lodash.clone(state.data)
            data[idx]=item;
            return {...state,data:data}
          });
        }}></input></td>
        <td><input 
        style={{borderWidth:"0px",maxWidth:"50px"
            ,backgroundColor:state.status[idx].bg["danwei"]
          }} value={item.danwei||""} onChange={(e)=>{
          if(state.status[idx].new){
                state.status[idx].bg["danwei"]="#aaf"
          }
          else{
            if(props.data[idx]["danwei"]===e.target.value){
              state.status[idx].bg["danwei"]="#fff"
            }
            else{
              state.status[idx].bg["danwei"]="#aaf"
            }
          }
          setState((state)=>{
            item.danwei=e.target.value;
            let data=lodash.clone(state.data)
            data[idx]=item;
            return {...state,data:data}
          });
        }}></input></td>
        <td><input  
        style={{borderWidth:"0px",maxWidth:"150px"
            ,backgroundColor:state.status[idx].bg["bh"]
          }} value={item.bh||""} onChange={(e)=>{
          if(state.status[idx].new){
                state.status[idx].bg["bh"]="#aaf"
          }
          else{
            if(props.data[idx]["bh"]===e.target.value){
              state.status[idx].bg["bh"]="#fff"
            }
            else{
              state.status[idx].bg["bh"]="#aaf"
            }
          }
          setState((state)=>{
            item.bh=e.target.value;
            let data=lodash.clone(state.data)
            data[idx]=item;
            return {...state,data:data}
          });
        }}></input></td>
        <td>
          <Form.Check
            type="checkbox"
            checked={item.quehuo}
            style={{backgroundColor:state.status[idx].bg["quehuo"]}}
            onChange={(e)=>{
              let new_value=!item.quehuo
              if(state.status[idx].new){
                state.status[idx].bg["quehuo"]="#aaf"
              }
              else{
                if(props.data[idx]["quehuo"]===new_value){
                  state.status[idx].bg["quehuo"]="#fff"
                }
                else{
                  state.status[idx].bg["quehuo"]="#aaf"
                }
              }
              setState((state)=>{
                item.quehuo=new_value;
                let data=lodash.clone(state.data)
                data[idx]=item;
                return{...state,data:data}
              });
            }}/>
        </td>
        </tr>)
  })
  console.log(state);
	return (
<div><div><table style={{width:"100%"}} border="1">
<thead><tr >
  <td><b>id</b></td><td><b>名称</b></td>
  <td><b>规格</b></td><td><b>数量</b></td><td><b>单位</b></td>
  <td><b>编号</b></td>
  <td><b>缺货</b></td>
</tr></thead>
<tbody>
{
  data_view
}
</tbody>
</table>
</div>
<br />
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
            placeholder="新备件"
            value={state.newPackName}
            onChange={newpackChange}
          />
          <Button
            className="btn btn-info"
            onClick={new_packitem}
          >
            新备件
          </Button>
        </div>
<Button onClick={()=>{
    if(state.is_saving) {
      console.log("is_saving");
      return;
    }
    state.is_saving=true;
    // setTimeout(()=>{
    //   state.is_saving=false;
    // },2000);
    let deletes=[],updates=[],inserts=[];
    for(var i=0;i<state.data.length;i++)
    {
      if(i<props.data.length){
        if(state.status[i].delete){
          deletes.push(state.data[i]);
        }
        else{
          if(JSON.stringify(state.data[i])===JSON.stringify(props.data[i])){
          }
          else{
            updates.push(state.data[i]);
          }
        }
      }
      else{
        inserts.push(state.data[i]);
      }
    }
    let data={id:props.pack_id,d:deletes,u:updates,i:inserts};
    props.onSave(data)
}}>保存</Button>
<div style={{ minHeight: '200px' }} />
<DlgOk
            description="备件名称不能为空"
            showModal={state.show_ok}
            closeModal={close_ok}
          />
</div>);
}
// export default function App(props){
//   const onSave=(deletes,updates,inserts)=>{
//     console.log(deletes);
//     console.log(updates)
//     console.log(inserts)
//   }
//   return(<TableEdit data={data} onSave={onSave} />)
// }