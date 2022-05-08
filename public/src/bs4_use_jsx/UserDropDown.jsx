import React from 'react';
// import Client from '../Client';
import {
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
export default function UsrDrop(props){
  let state,setState;
  [state,setState]=React.useState({
    selected:""
  });
  // React.useEffect(() => {
  //   // console.log("one time")
  //   componentDidMount();
  // }, []);
  // const componentDidMount = () => {
  //   Client.cache_users((res)=>{
  //         // console.log(res);
  //         setState({users:res,selected:state.selected});
  //       });
  // };
  const onClick=(user_name)=>{
    setState({selected:user_name}); 
    props.onClick(user_name);
  }
    const userMenu = props.users.map((user, idx) => (
      <Dropdown.Item  key={idx}
        onClick={()=>{onClick(user.username);}}
      >
        {user.username}
      </Dropdown.Item>
    ));
    return (
      <DropdownButton
        variant="light"
        title={props.title?props.title+":"+state.selected:""}
      >
        <Dropdown.Item onClick={()=>{onClick("");}}>
          *
        </Dropdown.Item>
        {
          userMenu
        }
      </DropdownButton>
    );
};

