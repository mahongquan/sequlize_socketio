import React, { Component } from 'react';
import Bs from './bs4_use_jsx/App';
import Todos from './todos/index';
import Datetime from 'react-datetime';
import Mui from './mui/App'
import Mui_redux from './mui_redux/index'
import Redux_use from './redux_use'
import D1 from './MPicker.jsx'
import A1 from './A1'
import A2 from './A2'
import Select1 from './Select1'
import Chat from "./chat/App"
import Demo_sio from "./chat/Demo"
// import Datetime from 'react-datetime';
// import DateTimePicker from 'react-datetime-picker';
import {useMatch,  BrowserRouter,Routes, Route,Link} from 'react-router-dom'
// import moment from 'moment';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
function tiaoshi_date_change(){

}
function Demo(){
  return(<div><Datetime /></div>);
}
// function ErrQ(){
//   return(<ErrorBoundary><QTodos/></ErrorBoundary>);
// }
function Index(){
    return(<div style={{display:"flex",width:"600px"
          ,justifyContent:"space-between"
          ,alignItems:"center"}}>
                <Link to="/bs" >bs App</Link>
                <Link to="/Redux_use" >Redux_use</Link>
                <Link to="/Todos" >Todos</Link>
                <Link to="/Mui" >Mui</Link>
                <Link to="/Mui_redux" >Mui_redux</Link>
                <Link to="/Chat" >Chat</Link>
                <Link to="/Demo_sio" >Demo_sio</Link>
                <Link to="/D1" >D1</Link>
                <Link to="/A1" >A1</Link>
                <Link to="/A2" >A2</Link>
                <Link to="/Select1" >Select1</Link>
              </div>);
}
export default function Root(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/bs" element={<Bs />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Demo_sio" element={<Demo_sio />} />
            <Route path="/Redux_use" element={<Redux_use />} />
            <Route path="/Todos" element={<Todos />} />
            <Route path="/index" element={<Index />} />
            <Route path="/Mui_redux" element={<Mui_redux />} />
            <Route path="/Mui" element={<Mui />} />
            <Route path="/D1" element={<D1 />} />
            <Route path="/A1" element={<A1 />} />
            <Route path="/A2" element={<A2 />} />
            <Route path="/Select1" element={<Select1 />} />
            <Route path="*"  element={<Index />} />
          </Routes>
        </BrowserRouter>
    );
}


