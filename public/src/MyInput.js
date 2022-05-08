import  React from 'react';
class MyInput extends React.Component {
  constructor(props){
    super();
    this.state={
      value:props.initValue,
      bg:'#ffffff',//'#8888ff'
    }
  }
  onChange=(e)=>{
    if(e.target.value===this.props.initValue){
      this.setState({bg:"#ffffff"})
    }
    else{
      this.setState({bg:"#8888ff"}) 
    }
    this.setState({value:e.target.value})
    this.props.onChange(e.target.value);
  }
  render(){
    return (<input style={{...this.props.style,backgroundColor:this.state.bg}} value={this.state.value} 
      onChange={this.onChange}></input>);
  }
}
export default class MyInputDemo extends React.Component {
  constructor(){
    super();
    this.state={value:"1234"}
  }
  onChange=(v)=>{
    console.log(v);
  }
  render(){
    return (<div><MyInput style={{ width:"300px"}} 
      initValue={this.state.value}
      onChange={this.onChange}></MyInput></div>);
  }
}