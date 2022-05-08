import React from 'react';
import Client from '../Client';
import Form from 'react-bootstrap/Form';

export default function UsrDrop(props){
  let state,setState;
  [state,setState]=React.useState({
    users: [],
    selected:""
  });
  React.useEffect(() => {
    // console.log("one time")
    Client.cache_users((res)=>{
          setState({users:res,selected:state.selected});
        });
  }, []);
    const userMenu = state.users.map((user, idx) => (
      <option
      >
        {user.name}
      </option>
    ));
    return (
      <Form.Control {...props}
        as="select" value={props.value} onChange={props.onChange}>
        {userMenu}
      </Form.Control>
    );
};

