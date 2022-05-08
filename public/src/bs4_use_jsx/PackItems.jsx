import React from 'react';
import TableEdit from './TableEditor'
import Client from '../Client';
export default function PackItems(props){
  console.log(props);
  const [state,setState]=React.useState({
    items: [],
  })

  React.useEffect(() => {
    if(!props.pack_id) return;
    Client.PackItems(props.pack_id, items => {
      setState({...state,items:items.data});
    },(error)=>{
      console.log(error);
    });
  }, [props.pack_id]);

  const onSave=(data)=>{
    Client.multi(data, items => {
      setState({...state,items:items.data});
    },(error)=>{
      alert(error);
    });
  }
    return (
     <TableEdit pack_id={props.pack_id} data={state.items} onSave={onSave} />
    );
  }
