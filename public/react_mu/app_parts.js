var update=newContext();
//var DateTime=Datetime;
var host="";
var socket=io();
//import './App.css';

var {Dialog,MuiThemeProvider}=ReactMu;// from 'material-ui/styles/MuiThemeProvider';
var {Divider, Button,TextField, Popover,Menu,MenuItem,Toolbar}=ReactMu;
//import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
//import { Table, TableBody, TableHeader, TableCell, TableRow, TableCell } from 'material-ui/Table';
var {List,ListItem,ListItemIcon,ListItemText, Radio, Grid, RadioGroup,FormControl, FormLabel, FormControlLabel,withStyles,Typography, Table, TableBody, TableHead, TableCell, TableRow }=ReactMu;
//import Client from './Client';
//import DialogExampleSimple from "./DialogExampleSimple"
//import DialogImportStandard from "./DialogImportStandard"
//import ContactEdit from "./ContactEdit"
injectTapEventPlugin();
//var user = "";
const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 4,
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
});
///////////////////////////////////////////////////////////////////////////////////////////
class ContactEdit extends React.Component {
  state = {
    open: false,
    shenhe:null,
    yiqixinghao:null,
    hetongbh:null,
    id:null,
    baoxiang:null,
    yonghu:null,
    tiaoshi_date:null,
    channels:null,
    yiqibh:null,
    addr:null,
    yujifahuo_date:null,

    yiqixinghao_items:["CS-2800","ON-3000"],
    channels_items:["2C+1S","2O"],
    bg:{},
  };
  yiqixinghao_change=(value)=>{
  };
  yiqixinghao_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({yiqixinghao:data});
  }
  channels_change=(value)=>{
  };
  channels_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({channels:data});
  }
  setdata=(contact)=>{
    console.log(contact);
    var arr2 = contact.yujifahuo_date.split("-");
    var date2 = new Date(arr2[0],parseInt(arr2[1],10)-1,arr2[2]); 
    arr2 = contact.tiaoshi_date.split("-");
    var date1 = new Date(arr2[0],parseInt(arr2[1],10)-1,arr2[2]); 
    this.old=contact;
    this.setState({
        open:true,
        yujifahuo_date:date2,
        yonghu:contact.yonghu,
        yiqixinghao:contact.yiqixinghao,
        addr:contact.addr,
        hetongbh:contact.hetongbh,
        shenhe:contact.shenhe,
        tiaoshi_date:date1,
        id:contact.id,
        yiqibh:contact.yiqibh,
        baoxiang:contact.baoxiang,
        channels:contact.channels,
    })
  }
  handleOpen = () => {
    console.log("open");
    this.contact_idx=this.props.contact;
    this.parent=this.props.parent;
    var contact=this.parent.state.contacts[this.contact_idx];
    if (contact==null){
        contact={}
    }
    this.setdata(contact);
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleChange = (e) => {
    console.log("change");
    // e.target.inputStyle={
    //   width: '50%',
    //   margin: '0 auto',
    //   border: '2px solid #FF9800',
    //   backgroundColor: '#ffd699',
    // };
    console.log(e.target.value);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    switch(e.target.name)
    {
        case "baoxiang":
            this.setState({baoxiang:e.target.value});
            break;
        case "yonghu":
            this.setState({yonghu:e.target.value});
            break;
        case "addr":
            this.setState({addr:e.target.value});
            break;
        case "channels":
            this.setState({channels:e.target.value});
            break;
        case "yiqixinghao":
            this.setState({yiqixinghao:e.target.value});
            break;
        case "yiqibh":
            this.setState({yiqibh:e.target.value});
            break;
        case "shenhe":
            this.setState({shenhe:e.target.value});
            break;
        case "yujifahuo_date":
            this.setState({yujifahuo_date:e.target.value});
            break;
        case "tiaoshi_date":
            this.setState({tiaoshi_date:e.target.value});
            break;
        case "hetongbh":
            this.setState({hetongbh:e.target.value});
            break;
        default:
            break;
    }
  };
  handleSave= (data) => {
    var url="/rest/Contact";
    let newdate;
    let newdate2
    newdate=toDateStr(this.state.yujifahuo_date);
    newdate2=toDateStr(this.state.tiaoshi_date);
    var data1=update(this.state,{tiaoshi_date:{$set:newdate2},yujifahuo_date:{$set:newdate}});

    Client.postOrPut(url,data1,(res) => {
        this.setdata(res.data);
        this.setState({bg:{}});
        this.parent.handleContactChange(this.contact_idx,res.data);
    });
  };
  handleClear= () => {
    console.log("clear");
    this.setState({
        yujifahuo_date:"",
        yonghu:"",
        yiqixinghao:"",
        addr:"",
        hetongbh:"",
        shenhe:"",
        tiaoshi_date:"",
        id:"",
        yiqibh:"",
        baoxiang:"",
        channels:"",
    })
  };
  handleCopy= () => {
    console.log("clear");
    this.setState({
        id:"",
    })
  };
  tiaoshi_date_change=(e,d)=>{
    this.setState({tiaoshi_date:d});
  }
  yujifahuo_date_change=(e,d)=>{
    this.setState({yujifahuo_date:d});
  }

  render() {
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    //var m1 = new Date(this.state.yujifahuo_date.replace(/-/,"/"));
    //var m2 = new Date(this.state.tiaoshi_date.replace(/-/,"/"));
    return (
      <div>
        <Button raised onClick={this.handleOpen}>{this.props.title}</Button>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
            <table>
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <TextField type="text" id="id" name="id"  disabled={true}    value={this.state.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <TextField type="text" id="yonghu" name="yonghu" value={this.state.yonghu}  
                    onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <TextField type="text" id="addr" name="addr" value={this.state.addr}  onChange={this.handleChange} /> 
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                {
                    // <AutoComplete name="channels"
                    //   openOnFocus={true}
                    //   searchText={this.state.channels}
                    //   onUpdateInput={this.channels_change}
                    //   dataSource={this.state.channels_items}
                    //   onNewRequest={this.channels_select}
                    // />
                }
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                {
                    // <AutoComplete name="yiqixinghao"
                    //   openOnFocus={true}
                    //   searchText={this.state.yiqixinghao}
                    //   onUpdateInput={this.yiqixinghao_change}
                    //   dataSource={this.state.yiqixinghao_items}
                    //   onNewRequest={this.yiqixinghao_select}
                    // />
                }
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <TextField type="text" 
                    id="yiqibh" name="yiqibh" 
                    value={this.state.yiqibh} onChange={this.handleChange} 
                    inputStyle={{
                      backgroundColor: this.state.bg.yiqibh,
                    }}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <TextField type="text" id="baoxiang" name="baoxiang" value={this.state.baoxiang}  
                    onChange={this.handleChange} 
                    inputStyle={{
                      backgroundColor: this.state.bg.baoxiang,
                    }}
                    />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <TextField  id="shenhe" 
                    name="shenhe" value={this.state.shenhe} onChange={this.handleChange}  
                    inputStyle={{
                      backgroundColor: this.state.bg.shenhe,
                    }}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                {
                    // <DatePicker  DateTimeFormat={DateTimeFormat} 
                    // locale="zh-Hans" hintText="yujifahuo_date" 
                    // onChange={this.yujifahuo_date_change} value={this.state.yujifahuo_date}
                    // />
                }
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                {
                    // <DatePicker   
                    // DateTimeFormat={DateTimeFormat} locale="zh-Hans" hintText="tiaoshi_date" 
                    // onChange={this.tiaoshi_date_change} 
                    // value={this.state.tiaoshi_date}
                    // />
                }
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <TextField type="text" id="hetongbh" name="hetongbh" value={this.state.hetongbh} onChange={this.handleChange}  />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <TextField type="text" id="method" name="method"   disabled={true} value={this.state.method} />
                </td>
            </tr>        
            </tbody>
            </table>
           <div> 
           <Button raised  onClick={this.handleSave} >保存</Button> 
           <Button raised  onClick={this.handleClear} >清除</Button> 
           <Button raised onClick={this.handleCopy} >复制</Button>
           {
            //<UsePacks contact_id={this.state.id}/>
            }
           </div>
        </Dialog>
        </div>
    );
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class App extends React.Component {
  mystate = {
    start:0,
    limit:10,
    total:0,
    baoxiang:"",
    logined: false,
    search:""
  }
  state = {
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    open:false,
    contacts: [],
    user: "AnonymousUser",
    start:0,
    total:0,
    search:"",
    baoxiang:"",
    start_input:1,
    currentIndex:null,
    connect_error:false,
    anchorEl: null
  }

  componentDidMount=() => {
    socket.on("connect_error",()=>{
      this.setState({connect_error:true});
    })
    socket.on("connect",()=>{
      this.setState({connect_error:false});
    })
    this.load_data();
  }
  load_data=()=>{
    socket.emit("/get/Contact",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts) => {
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.mystate.total=contacts.total;//because async ,mystate set must before state;
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts.total,
          start:this.mystate.start
        });
    });
  };
  // removeFoodItem = (itemIndex) => {
  //   const filteredFoods = this.state.selectedFoods.filter(
  //     (item, idx) => itemIndex !== idx,
  //   );
  //   this.setState({ selectedFoods: filteredFoods });
  // }

  // addFood = (food) => {
  //   const newFoods = this.state.selectedFoods.concat(food);
  //   this.setState({ selectedFoods: newFoods });
  // }
  handleTest = () => {
    //const contact2=update(this.state.contacts[this.state.selected],{baoxiang: {$set: "test"}});
    // console.log("handleTest");
    //console.log(contact2);
    //var one=this.state.contacts[this.state.selected];
    var idx=this.state.selected;
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {baoxiang:{$set:"test111"}}});
    console.log(contacts2);
    //this.state.contacts[this.state.selected].baoxiang="test";
    this.setState({contacts:contacts2});
    //this.forceUpdate();
  };
  handleContactChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({contacts:contacts2});
  };
  oncontactClick=(key) => {
    console.log("click row");
    console.log(key);
    this.setState({selected:key});
  };
  handleImportStandard=() => {
    console.log("import row");
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.componentDidMount();
  };
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };
  showlogin = () => {
    console.log("showlogin");
    var data = {
      username: "mahongquan",
      password: "333333"
    };
    this.onLoginSubmit(data);
  };
  handleLogin = () => {
    console.log("login");
    Client.login_index((data) => {
      //console.log(data.csrf_token);
      // const cookies = new Cookies();

      // cookies.set('csrftoken', this.state.csrf_token, { path: '/' });
      this.showlogin();
    });

  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.setState({
        logined: false,
        user: "AnonymousUser",
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        contacts: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.contacts(value, (contacts) => {
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  inputChange=(e)=>{
    console.log(this.refs.input);
    console.log(this.refs.style);
    var style=getComputedStyle(this.refs.input, null)
    console.log(style);
    this.setState({test_input:e.target.value});
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  };
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    this.load_data();
  };
  search = (e) => {
    this.mystate.start=0;
    this.load_data();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.load_data();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };

  onDetailClick=(contactid)=>{
    console.log(contactid);
    socket.emit("/parts/showcontact",{id:contactid},(data)=>{
        console.log(data);
    });
  }
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.load_data();
  };
  handleEdit=(id)=>{
    console.log(id);
    this.setState({selected:id});
  }
  handleClickButton = () => {
    console.log("=============click");
    var b=ReactDOM.findDOMNode(this.button)
    console.log(b);
    this.setState({
      open: true,
      anchorEl: b,
    });
  };
  openBaoxiang=()=>{
    this.setState({open:true});
  }
  render() {
    var hasprev=true;
    var hasnext=true;
    let prev;
    let next;
    console.log(this.mystate);
    console.log(this.state);
    if(this.state.start===0){
      hasprev=false;
    }
    if(this.state.start+this.state.limit>=this.state.total){
      hasnext=false;
    }
    if (hasprev){
      prev=(<Button  raised onClick={this.handlePrev}>前一页</Button>);
    }
    else{
      prev=null;
    }
    if(hasnext){
      next=(<Button  raised  onClick={this.handleNext}>后一页</Button>);
    }
    else{
      next=null;
    }
    const contactRows = this.state.contacts.map((contact, idx) => (
      <TableRow      key={idx} >
        <TableCell>{contact.id}</TableCell>
        <TableCell>{contact.hetongbh}</TableCell>
        <TableCell>{contact.yonghu}</TableCell>
        <TableCell>{contact.baoxiang}</TableCell>
        <TableCell>{contact.yiqixinghao}</TableCell>
        <TableCell><Button onClick={()=>this.handleEdit(idx)}>编辑</Button></TableCell>
      </TableRow>
    ));
    return (
      <div className="App">
        <Toolbar>
        <ContactEdit  title="编辑仪器信息" contact={this.state.selected} parent={this}/>
          <input type="text" value={this.state.search}  placeholder="合同 or 仪器编号" onChange={this.handleSearchChange} />
          <Button  raised id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</Button>
         <Button  raised className="btn btn-primary" onClick={()=>this.handleEdit(null)}>新仪器</Button>
           <Button  raised>导入标样</Button>
         <div>过滤:</div>
        </Toolbar>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>合同编号</TableCell>
                <TableCell>用户单位</TableCell>
                <TableCell>包箱</TableCell>
                <TableCell>仪器型号</TableCell>
                <TableCell>actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {contactRows}
            </TableBody>
        </Table>
        {prev}
        <label id="page">{this.state.start+1}../{this.state.total}</label>{next}
        <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
        <Button  raised id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</Button>
      </div>
    );
  }
}
ReactDOM.render(<App  />, document.getElementById('app'));
