import React, { Component } from 'react';
import PackItems from "./PackItems";
import {Modal} from "react-bootstrap";
class UsePackEditNew extends Component{
  state={ 
      showModal: false,
      usepack:{},
      bg:{},
  }

  close=()=>{
    this.setState({ showModal: false });
  }
  handleChange=()=>{
    
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.usepacks[nextProps.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  close=()=>{
    this.setState({ showModal: false });
  }
  open2=(idx)=>{
    this.index=idx;
    this.setState({ showModal: true });
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.usepacks[this.index];
    }
    this.setState({usepack:this.old});
    console.log(this.old);
  }
  // open=()=>{
  //   this.setState({ showModal: true });
  //   if (this.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=this.props.parent;
  //     this.old=this.parent.state.usepacks[this.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  render=()=>{
    let name;
    let id;
    if (this.state.usepack.Pack){
      name=this.state.usepack.Pack.name
      id=this.state.usepack.Pack.id
    }
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>编辑包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={id} />
                </td>
                <td>
                    <label>名称:</label>
                </td>
                <td>
                    <label>{name}</label>
                </td>
            </tr></tbody>
            </table>
        <div id="id_useusepacks">
        <PackItems  pack_id={id}/>
        </div>
                </Modal.Body>
        </Modal>
    );
  }
}
export default UsePackEditNew;