import React, { Component } from 'react';
import {
  Badge,InputGroup,FormControl,
  Navbar,
  Nav,
  DropdownButton,
  Dropdown,
  Button,
  Tooltip,
  Overlay,
} from 'react-bootstrap';
// import Demo from './Demo'
import moment from 'moment';
import update from 'immutability-helper';
import Client from '../Client';
import UserDropDown from "./UserDropDown";
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import DlgFolder from './DlgFolder';
// import DlgFolder2 from './DlgFolder2';
// import DlgStatMonth from './DlgMonthStat';
// import DlgStatYear from './DlgYearStat';
import DlgStat from './DlgStat';
import DlgImport from './DlgImport';
// import DlgImportHT from './DlgImportHT';
import DlgCheck from './DlgCheckClip';
import DlgUrl from './DlgUrl';
import DlgCopyPack from './DlgCopyPack';
import DlgItems from './DlgItems';
import DlgPacks from './DlgPacks';
import DlgDetail from './DlgDetail';
import DlgWorkMonth from './DlgWorkMonth'
import myglobal from '../myglobal';
import {useNavigate} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.css';
// import '../react-datetime.css';
// import './index.css';
// import '../autosuggest.css';
export default function App(props){
  let navigate=useNavigate();
  const [state,setState]=React.useState({
      contact:{},
      dark:false,
      showDlgCheck:false,
      showdlgitems:false,
      showdlgPacks:false,
      showdlgwait:false,
      logined:false,
      connect_error: false,
      contacts: [],
      limit: 15,
      user: 'AnonymousUser',
      users:[],
      start: 0,
      total: 0,
      search: '',
      start_input: 1,
      currentIndex: null,
      baoxiang: '',
      showDlgImport: false,
      showDlgEdit: false,
      showDlgDetail: false,
      showDlgTodos: false,
      showDlgStat:false,
      showDlgWork:false,
      showDlgLogin:false,
      showDlgUrl:false,
      showdlgcopy:false,
    });
  React.useEffect(()=>{
    load_data();
  },[]);
  const load_data = () => {
    Client.contacts(
      {
        start: state.start,
        limit: state.limit,
        search: state.search,
        baoxiang: state.baoxiang,
      },
      contacts => {
        if(state.users.length===0){ 
          Client.cache_users((res)=>{
            setState((state)=>({...state,users:res}));
          });
        }
        var user = contacts.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        setState((state)=>({...state,
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts.total,
          connect_error: false,
        }));
      },
      error => {
        // console.log(typeof(error));
        console.log(error);
        if (error instanceof SyntaxError) {
          openDlgLogin();
        } else {
          setState((state)=>({...state, connect_error: true }));
        }
      }
    );
  };
  const darkmode=()=>{
    if(state.dark){
      document.querySelector('html').style.filter = ''
    }
    else{
      document.querySelector('html').style.filter = 'invert(1) contrast(0.95) saturate(0.5) hue-rotate(180deg)'
    }
    setState((state)=>({...state,dark:!state.dark}));
  }
  const handleContactChange = (idx, contact) => {
    console.log(idx);
    let index;
    let contacts2;
    if (idx != null) {
      index=idx;
      contacts2 = update(state.contacts, { [idx]: { $set: contact } });
      console.log(contacts2);
    } else {
      index=0;
      contacts2 = update(state.contacts, { $unshift: [contact] });
    }
    setState((state)=>({...state,currentIndex:index,contact:contact
      ,contacts: contacts2 }));
  };
  const newCurrent=()=>{
      let idx=null;
      setState((state)=>({...state, contact:{
        yujifahuo_date: moment().format("YYYY-MM-DD")
        ,baoxiang:state.contact.baoxiang
        ,shenhe:state.contact.shenhe
        ,yiqixinghao:state.contact.yiqixinghao
        ,channels:state.contact.channels
        ,tiaoshi_date: moment().format("YYYY-MM-DD")
      }
      , currentIndex: idx }));
  }

  const handleUserChange = user => {
    if (user === 'AnonymousUser') {
      setState((state)=>({...state,
        user:user,
        logined: false,
        contacts:[],
      }));
    } else {
      setState((state)=>({...state,
        user:user,
        logined: true,
      }));
      load_data();
    }
  };
  const handleLogout = () => {
    Client.logout(data => {
      setState((state)=>({...state,
        logined: false,
        user: 'AnonymousUser',
        total: 0,
        start: 0,
      }));
      handleUserChange('AnonymousUser');
    });
  };
  const keypress = e => {
    if (e.which !== 13) return;
    // console.log('你按了回车键...');

    search();
  };
  const handleSearchChange = e => {
    setState((state)=>({...state, search: e.target.value }));
  };

  const handlePrev = e => {
    // eslint-disable-next-line
    state.start = state.start - state.limit;
    if (state.start < 0) {
      // eslint-disable-next-line
      state.start = 0;
    }
    load_data();
  };
  const search = e => {
    // eslint-disable-next-line
    state.start = 0;
    load_data();
  };
  const jump = () => {
    // eslint-disable-next-line
    state.start = parseInt(state.start_input, 10) - 1;
    if (state.start > state.total - state.limit)
      // eslint-disable-next-line
      state.start = state.total - state.limit; //total >limit
    if (state.start < 0) {
      // eslint-disable-next-line
      state.start = 0;
    }
    load_data();
  };
  const handlePageChange = e => {
    setState((state)=>({...state, start_input: e.target.value }));
  };

  const onDetailClick = contact => {
    // console.log(contactid);
    // window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    setState((state)=>({ ...state,showDlgDetail: true, contact: contact }));
  };
  const handleNext = e => {
    // eslint-disable-next-line
    state.start = state.start + state.limit;
    if (state.start > state.total - state.limit)
      // eslint-disable-next-line
      state.start = state.total - state.limit; //total >limit
    if (state.start < 0) {
      // eslint-disable-next-line
      state.start = 0;
    }
    load_data();
  };
  const onSelectBaoxiang = e => {
    // eslint-disable-next-line
    state.start = 0;
    // eslint-disable-next-line
    state.baoxiang = e;
    load_data();
  };

  const onLoginSubmit = data => {
    // console.log(data);
    Client.login(data.username, data.password, res => {
      if (res.success) {
       
        setState((state)=>({
          ...state,user:data.username
        }));
        handleUserChange(data.username);
      }
    });
  };
  const handleEdit = idx => {
    if(idx!==null){
      setState((state)=>({...state, contact:state.contacts[idx]
        ,showDlgEdit: true
        , currentIndex: idx }));
    }
    else{
      setState((state)=>({...state, contact:{yujifahuo_date: moment().format("YYYY-MM-DD"),
      tiaoshi_date: moment().format("YYYY-MM-DD")}
        ,showDlgEdit: true
        , currentIndex: idx }));
    }
  };
  const opendlgwait = contact => {
    setState((state)=>({...state,showdlgwait:true,contact:contact}))
  };
  const handleContactChange2 = contact => {
    let contacts2 = update(state.contacts, { [state.currentIndex]: { $set: contact } });
    setState((state)=>({...state, contacts: contacts2 }));
  };
  const opendlgurl = (url, parent, idx, data) => {
    setState((state)=>({...state,showDlgUrl:true,currentIndex:idx,url:url,data:data}));
  };
  const openDlgItems = () => {
    setState((state)=>({...state,showdlgitems:true}));
  };
  const opendlgfolder = contact => {
    setState((state)=>({...state,contact:contact,showDlgFolder:true}));
  };
  const opendlgfolder2 = contactid => {
    setState((state)=>({...state, showDlgFolder2: true }));
  };
  const opendlgcheck = (contact) => {
    setState((state)=>({...state,contact:contact,showDlgCheck:true}))
  };
  const openDlgPacks = () => {
    setState((state)=>({...state,showdlgPacks:true}))
  };
  const openDlgCopyPack = () => {
    setState((state)=>({...state,showdlgcopy:true}));
  };
  const openDlgStat = () => {
    setState((state)=>({...state,showDlgStat:true}));
  };
  const openDlgLogin = () => {
    setState((state)=>({...state,showDlgLogin:true}));
  };
  const openDlgImport = () => {
    setState((state)=>({...state, showDlgImport: true }));
  };
  const gohome=()=>{
    navigate('/index');
  }
    // console.log("render=========================");
    // console.log(state);
    const contactRows = state.contacts.map((contact, idx) => (
      <tr key={idx}>
        <td>{contact.id}</td>
        <td>{contact.yonghu}</td>
        <td>{contact.addr}</td>
        <td>{contact.hetongbh}</td>
        <td>
         <div style={{display:"flex"}}>
          <Button
            variant="link"
            onClick={() => handleEdit(idx)}
          >
            {contact.yiqibh}
          </Button>
          <DropdownButton
            variant="light"
            title="" >
            <Dropdown.Item onClick={() => onDetailClick(contact)}>
              详细
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                opendlgurl('/rest/updateMethod/', this, idx, {
                  id: contact.id,
                })
              }
            >
              更新方法
            </Dropdown.Item>
            <Dropdown.Item onClick={() => opendlgwait(contact)}>
              全部文件
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => opendlgcheck(contact)}
            >
              核对备料计划
            </Dropdown.Item>
            <Dropdown.Item onClick={() => opendlgfolder(contact)}>
              资料文件夹
            </Dropdown.Item>
            <Dropdown.Item style={{display:"none"}} onClick={
              () => opendlgfolder2(contact)}>
              资料文件夹2
            </Dropdown.Item>
          </DropdownButton>
          </div>
        </td>
        <td>{contact.yiqixinghao}</td>
        <td>{contact.channels}</td>
        <td>{contact.baoxiang}</td>
        <td>{contact.yujifahuo_date}</td>
        <td>{contact.method}</td>
      </tr>
    ));
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    if (state.start === 0) {
      hasprev = false;
    }
    if (state.start + state.limit >= state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = (
        <div><Button variant="light" onClick={handlePrev}>
          前一页
        </Button></div>
      );
    } else {
      prev = null;
    }
    if (hasnext) {
      next = (
      <div><Button variant="light" onClick={handleNext}>
          后一页
        </Button></div>
      );
    } else {
      next = null;
    }
    return (
      <div id="todoapp">
        <div
          align="center"
          style={{
            display: state.connect_error ? '' : 'none',
            textAlign: 'center',
            color: 'red',
          }}
        >
          !!!!!!!!!!连接错误,服务器未运行!!!!!!!
        </div>
    {state.showdlgitems?(<DlgItems 
          open={state.showdlgitems}
          onClose={()=>{setState((state)=>({...state,showdlgitems:false}));}}
         />):null}

        {state.showdlgPacks?(<DlgPacks 
          open={state.showdlgPacks}
          onClose={()=>{setState((state)=>({...state,showdlgPacks:false}));}}
         />):null}

        {state.showdlgcopy?(<DlgCopyPack open={state.showdlgcopy}
          onClose={()=>{setState((state)=>({...state,showdlgcopy:false}));}}
         />):null}
        
        {state.showDlgImport?(<DlgImport
          showModal={state.showDlgImport}
          handleClose={() => {
            setState((state)=>({...state,showDlgImport: false }));
          }}/>):null}
        {state.showDlgCheck?(<DlgCheck open={state.showDlgCheck} 
        contact={state.contact}
        onClose={()=>{setState((state)=>({...state,showDlgCheck:false}));}} />):null
        }

        {state.showDlgFolder?(<DlgFolder contact={state.contact} open={state.showDlgFolder}
         onClose={()=>{setState((state)=>({...state,showDlgFolder:false}));}} />):null}

        {state.showdlgwait?(<DlgWait contact={state.contact} 
            open={state.showdlgwait}
         onClose={()=>{setState((state)=>({...state,showdlgwait:false}));}} />):null}

        {state.showDlgUrl?(<DlgUrl callback={handleContactChange2} 
        open={state.showDlgUrl} 
        url={state.url} 
        data={state.data}
        onClose={()=>{setState((state)=>({...state,showDlgUrl:false}));}} />):null}

        {state.showDlgLogin?(<DlgLogin 
          onLoginSubmit={onLoginSubmit}
          open={state.showDlgLogin} 
          onClose={()=>{
            console.log('onClose');
            setState((state)=>{
              console.log(state);
              return{...state,showDlgLogin:false}
            });
          }} />):null}
        {(state.showDlgDetail)?(<DlgDetail
          contact={state.contact}
          showModal={state.showDlgDetail}
          handleClose={() => {
            setState((state)=>({...state, showDlgDetail: false }));
          }}
        />):null}
        {state.showDlgStat?(<DlgStat 
          users={state.users}
          showModal={state.showDlgStat}
          handleClose={() => {
            setState((state)=>({...state, showDlgStat: false }));
          }} />):null
        }
        {state.showDlgWork?(<DlgWorkMonth
          users={state.users}
          baoxiang={state.baoxiang}
          showModal={state.showDlgWork}
          handleClose={() => {
            setState((state)=>({...state, showDlgWork: false }));
          }}
        />):null}
        {state.showDlgEdit?(<ContactEdit2New
          users={state.users}
          showModal={state.showDlgEdit}
          handleClose={() => {
            setState((state)=>({...state, showDlgEdit: false }));
          }}
          handleContactChange={handleContactChange}
          newCurrent={newCurrent}
          contact={state.contact}
          index={state.currentIndex}
          title="编辑"
        />):null}
        <Navbar collapseOnSelect expand="lg" className="navbar-dark bg-dark">
          <Navbar.Brand>
            <span>装箱单</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" onClick={openDlgPacks}>
                包
              </Nav.Link>
              <Nav.Link href="#" onClick={openDlgItems}>
                备件
              </Nav.Link>
              <Nav.Link href="#" onClick={openDlgCopyPack}>
                复制包
              </Nav.Link>
              <Nav.Link href="#" onClick={openDlgStat}>
                统计
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => {
                  setState((state)=>({...state, showDlgWork: true }));
                }}
              >
                工作量
              </Nav.Link>
              <Nav.Link href="#" onClick={darkmode}>
                dark
              </Nav.Link>
              <Nav.Link href="#" onClick={gohome}>
                home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DropdownButton
            variant="light"
            title={state.user}
            onClick={
              (e)=>{e.stopPropagation();}
            }
          >
            <Dropdown.Item
              style={{
                display: state.user !== 'AnonymousUser' ? 'none' : 'block',
              }}
              onClick={openDlgLogin}
            >
              登录
            </Dropdown.Item>
            <Dropdown.Item
              style={{
                display: state.user === 'AnonymousUser' ? 'none' : 'block',
              }}
              onClick={handleLogout}
            >
              注销
            </Dropdown.Item>
          </DropdownButton>
          <div style={{marginLeft:"10px",width:"300px"}}>
          <InputGroup>
            <FormControl
              onKeyPress={keypress}
              type="text"
              value={state.search}
              placeholder="合同 or 仪器编号 or 客户"
              onChange={handleSearchChange}
            />
            <div>
              <Button variant="info" onClick={search}>
                搜索
                <span
                  className="glyphicon glyphicon-search"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </InputGroup>
          </div>
          <Button
            variant="primary"
            style={{ margin: '0px 10px 0px 10px' }}
            onClick={() => handleEdit(null)}
          >
            新仪器
          </Button>
          <Button variant="success" onClick={openDlgImport}>
            导入标样
          </Button>
    {/*      <Button
            style={{ margin: '0px 10px 0px 10px', display: 'none' }}
            className="btn btn-primary"
            onClick={openDlgImportHT}
          >
            导入合同
          </Button>*/}
        </div>
        <table className="table-sm table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>
                <span>客户单位</span>
              </th>
              <th>客户地址</th>
              <th>合同编号</th>
              <th>
                <span>仪器编号</span>
              </th>
              <th>仪器型号</th>
              <th>通道配置</th>
              <th>
                <UserDropDown users={state.users} title="包箱" onClick={onSelectBaoxiang} />
              </th>
              <th>入库时间</th>
              <th>方法</th>
            </tr>
          </thead>
          <tbody id="contact-list">{contactRows}</tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        {prev}
        <Badge  bg="secondary">
          {state.start + 1}../{state.total}
        </Badge>
        {next}
        <div style={{marginLeft:"10px",width:"200px"}}>
          <InputGroup>
            <FormControl
               maxLength="16"
          size="16"
          onChange={handlePageChange}
          value={state.start_input}
            />
              <Button id="page_go" className="btn btn-info" onClick={jump}>
          跳转
        </Button>
          </InputGroup>
          </div>
      
        </div>
        <div style={{ minHeight: '200px' }} />
      </div>
    );
  }
