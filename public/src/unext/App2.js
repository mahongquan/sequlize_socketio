import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from './DropdownButton';
import update from 'immutability-helper';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import { withStyles } from '@mui/styles';
import DlgStatMonth from './DlgStatMonth';
import DlgStatYear from './DlgStatYear';
import DlgImport from './DlgImport';
import DlgCheck from './DlgCheck';
import DlgCopyPack from './DlgCopyPack';
import DlgItems from './DlgItems';
import DlgPacks from './DlgPacks';
import DlgDetail from './DlgDetail';
import DlgWorkMonth from './DlgWorkMonth';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import * as ACTION_TYPE from "./reducers/actions"
// import * as slice from './reducers/partsSlice';
// import {useMount} from 'react-use';
const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#333333',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 1020,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  inputRoot: {
    color: 'inherit',
    width: '132px',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: 0,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 132,
      '&:focus': {
        width: 132,
      },
    },
  },
});
function App(props) {

  // const dispatch = props.store.useContainer();
  var  store=props.store.useContainer();
  // const dispatch=store.dispatch;
  // var contacts = store.state.contacts;
  // var start = store.state.start;
  // var limit = store.state.limit;
  // var search = store.state.search;
  // var baoxiang = store.state.baoxiang;
  // var store.state.total = store.state.total;
  // var connect_error = store.state.connect_error;
  // var start_input = store.state.start_input;
  // var user = store.state.user;
  React.useEffect(() => {
    console.log("App render=====================================");
    console.log(store.state);
    console.log(store.state.contacts);
    console.log(store.state.users);
  });
  React.useEffect(() => {
    console.log("one time")
    store.loadCONTACT();
    store.load_user();
  }, []);
  const onLoginSubmit = (data) => {
    store.onLoginSubmit(data);
  };
  const handleUserChange = (user) => {
    store.handleUserChange(user);
  };
  const handleLogout = () => {
    props.actions.handleLogout();
  };
  const keypress = (e) => {
    if (e.which !== 13) return;
    search_go();
  };
  const handleSearchChange = (e) => {
    store.dispatch(actions.SEARCH_CHANGE,e.target.value);
  };

  const handlePrev = (e) => {
    let start2 = start - store.state.limit;
    if (start2 < 0) {
      start2 = 0;
    }
    store.loadCONTACT({
        start: start2,
        limit: store.state.limit,
        search: store.state.search,
        baoxiang: store.state.baoxiang,
      });
  };
  const search_go = (e) => {
    store.loadCONTACT({
        start: 0,
        limit: store.state.limit,
        search: store.state.search,
        baoxiang: store.state.baoxiang,
      });
  };
  const jump = () => {
    let start2 = parseInt(start_input, 10) - 1;
    if (start2 > store.state.total - store.state.limit) start2 = store.state.total - store.state.limit; //total >limit
    if (start2 < 0) {
      start2 = 0;
    }
    store.loadCONTACT({
        start: start2,
        limit: store.state.limit,
        search: store.state.search,
        baoxiang: store.state.baoxiang,
      });
    store.load_user();
  };
  const handlePageChange = (e) => {
    store.dispatch({type:ACTION_TYPE.PAGE_CHANGE,value:e.target.value});
  };

  const onDetailClick = (contactid) => {
    store.details(contactid);
  };
  const handleNext = (e) => {
    let start2 = store.state.start + store.state.limit;
    if (start2 > store.state.total - store.state.limit) start2 = store.state.total - store.state.limit; //store.state.total >limit
    if (start2 < 0) {
      start2 = 0;
    }
    store.loadCONTACT({
        start: start2,
        limit: store.state.limit,
        search: store.state.search,
        baoxiang: store.state.baoxiang,
    });
  };
  const onSelectBaoxiang = (e) => {
    // dispatch(slice.actions.BAOXIANG(e));
    store.loadCONTACT({
        start: store.state.start,
        limit: store.state.limit,
        search: store.state.search,
        baoxiang: e,
    });
  };
  const handleEdit = (idx,contactid) => {
    // setState({ showDlgEdit: true, currentIndex: idx });
    store.edit(idx,contactid);
  };
  const allfile = (contactid) => {
    store.allfile(contactid);
  };
  const updateMethod = (contactid, idx) => {
    store.updateMethod(contactid, idx);
  };
  const openDlgItems = () => {
    store.dispatch({type:ACTION_TYPE.SHOW_DLG_ITEMS,value:true});
  };
  const opendlgfolder = (contactid) => {
    store.forlder(contactid);
  };
  const opendlgcheck = (idx) => {
    // dispatch(slice.actions.SHOW_DLG_CHECK({ visible: true, index: idx }));
    store.dispatch({type:ACTION_TYPE.SHOW_DLG_CHECK,value:true,index:idx});
  };
  const openDlgPacks = () => {
    // dispatch(slice.actions.SHOW_DLG_PACK(true));
  };
  const openDlgCopyPack = () => {
    // dispatch(slice.actions.SHOW_DLG_COPYPACK(true));
  };
  const openDlgImport = () => {
    // var data = { limit: 10, search: 'xls' };
    // dispatch(slice.importXls(data));
  };
  console.log("here=================")
  console.log(store.state);
  const contactRows = store.state.contacts.map((contact, idx) => (
    <TableRow key={idx} className={props.classes.row}>
      <CustomTableCell>{contact.yonghu}</CustomTableCell>
      <CustomTableCell>{contact.hetongbh}</CustomTableCell>
      <CustomTableCell>
        <Button
          variant="outlined"
          style={{ display: 'inline' }}
          onClick={() => handleEdit(idx,contact.id)}
        >
          {contact.yiqibh}
        </Button>
        <DropdownButton title="" id="id_dropdown3">
          <MenuItem onClick={() => onDetailClick(contact.id)}>详细</MenuItem>
          <MenuItem onClick={() => updateMethod(contact.id, idx)}>
            更新方法
          </MenuItem>
          <MenuItem onClick={() => allfile(contact.id)}>全部文件</MenuItem>
          <MenuItem onClick={() => opendlgcheck(idx)}>核对备料计划</MenuItem>
          <MenuItem onClick={() => opendlgfolder(contact.id)}>
            资料文件夹
          </MenuItem>
        </DropdownButton>
      </CustomTableCell>
      <CustomTableCell>{contact.yiqixinghao}</CustomTableCell>
      <CustomTableCell>{contact.channels}</CustomTableCell>
      <CustomTableCell>{contact.yujifahuo_date}</CustomTableCell>
      <CustomTableCell>{contact.method}</CustomTableCell>
    </TableRow>
  ));
  var hasprev = true;
  var hasnext = true;
  let prev;
  let next;

  if (store.state.start === 0) {
    hasprev = false;
  }
  //console.log(store.state.start+limit>=store.state.total);
  if (store.state.start + store.state.limit >= store.state.total) {
    hasnext = false;
  }
  if (hasprev) {
    prev = (
      <Button variant="outlined" onClick={handlePrev}>
        前一页
      </Button>
    );
  } else {
    prev = null;
  }
  if (hasnext) {
    next = (
      <Button variant="outlined" onClick={handleNext}>
        后一页
      </Button>
    );
  } else {
    next = null;
  }
  
  return (
    <div className={props.classes.root}>
      <DlgWorkMonth
        showModal={store.state.showDlgWorkMonth}
        store={store}
        handleClose={() => {
          store.dispatch({type:ACTION_TYPE.SHOW_DLG_WORKMONTH,visible:false});
        }}
        baoxiang={store.state.baoxiang}
      />
      <DlgItems
        showModal={store.state.showDlgItem}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_ITEMS(false));
        }}
      />
      <DlgPacks
        showModal={store.state.showDlgPack}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_PACK(false));
        }}
      />
      <DlgCopyPack
        showModal={store.state.showDlgCopyPack}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_COPYPACK(false));
        }}
      />

      <DlgStatMonth
        open={store.state.showDlgStatMonth}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLGSTAT_MONTH(false));
        }}
      />
      <DlgImport
        showModal={store.state.showDlgImport}
        store={store}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_IMPORT(false));
        }}
      />
      <DlgCheck
        showModal={store.state.showDlgCheck}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_CHECK(false));
        }}
      />
      <DlgWait
        showModal={store.state.showdlgWait}
        store={props.store}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_WAIT(false));
        }}
      />

      <DlgLogin
        showModal={store.state.show_login}
        handleClose={() => {
          store.dispatch({type:ACTION_TYPE.SHOW_LOGIN,visible:false});
        }}
        onLoginSubmit={onLoginSubmit}
      />
      {/*        <DlgDetail
          contactid={props.contactid}
          showModal={store.state.showDlgDetail)}
          slice={slice}
          handleClose={() => {
            dispatch(slice.actions.SHOW_DLG_DETAIL(false));
          }}
        />*/}
      <DlgStatYear
        open={store.state.showDlgStatYear}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLGSTAT_YEAR(false));
        }}
      />
      <ContactEdit2New
        store={store}
        showModal={store.state.showDlgEdit}
        handleClose={() => {
          // dispatch(slice.actions.SHOW_DLG_EDIT({ visible: false }));
        }}
        title="编辑"
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={props.classes.grow}>
            装箱单
          </Typography>
          <Button variant="outlined" onClick={openDlgCopyPack}>复制包</Button>
          <DropdownButton title="统计">
            <MenuItem
              onClick={() => {
                // dispatch(slice.actions.SHOW_DLGSTAT_MONTH(true));
              }}
            >
              月
            </MenuItem>
            <MenuItem
              onClick={() => {
                // dispatch(slice.actions.SHOW_DLGSTAT_YEAR(true));
              }}
            >
              年
            </MenuItem>
          </DropdownButton>
          <DropdownButton title={'包箱:' + store.state.baoxiang} id="id_dropdown2">
            <MenuItem onClick={() => onSelectBaoxiang('')}>*</MenuItem>
            <MenuItem onClick={() => onSelectBaoxiang('马红权')}>
              马红权
            </MenuItem>
            <MenuItem onClick={() => onSelectBaoxiang('陈旺')}>陈旺</MenuItem>
            <MenuItem onClick={() => onSelectBaoxiang('吴振宁')}>
              吴振宁
            </MenuItem>
          </DropdownButton>

          <InputBase
            onKeyPress={keypress}
            value={store.state.search}
            placeholder="合同/仪器编号/客户"
            classes={{
              root: props.classes.inputRoot,
              input: props.classes.inputInput,
            }}
            onChange={handleSearchChange}
          />
          <Button onClick={search_go}>
            <SearchIcon />
          </Button>
          <Button
            style={{ margin: '0px 10px 0px 10px' }}
            variant="contained"
            onClick={() => handleEdit(null)}
          >
            新仪器
          </Button>
          <Button variant="contained" onClick={openDlgImport}>
            导入标样
          </Button>
          <Button
            variant="contained"
            style={{ margin: '0px 10px 0px 10px' }}
            onClick={() => {
              store.dispatch({type:ACTION_TYPE.SHOW_DLG_WORKMONTH,visible:true});
            }}
          >
            工作量
          </Button>
          <DropdownButton title={store.state.user} id="id_dropdown1">
            {store.state.user !== 'AnonymousUser' ? (
              <MenuItem onClick={handleLogout}>注销</MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  store.dispatch({type:ACTION_TYPE.SHOW_LOGIN,visible:true});
                }}
              >
                登录
              </MenuItem>
            )}
          </DropdownButton>
        </Toolbar>
      </AppBar>
      <div
        align="center"
        style={{
          display: store.state.connect_error ? '' : 'none',
          textAlign: 'center',
          color: 'red',
        }}
      >
        !!!!!!!!!!连接错误,服务器未运行!!!!!!!
      </div>
      <div className={props.classes.tableWrapper}>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>
                <span>客户单位</span>
              </CustomTableCell>
              <CustomTableCell>合同编号</CustomTableCell>
              <CustomTableCell>
                <span>仪器编号</span>
              </CustomTableCell>
              <CustomTableCell>仪器型号</CustomTableCell>
              <CustomTableCell>通道配置</CustomTableCell>
              <CustomTableCell>入库时间</CustomTableCell>
              <CustomTableCell>方法</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{contactRows}</TableBody>
        </Table>
      </div>
      {prev}
      <label id="page">
        {store.state.start + 1}../{store.state.total}
      </label>
      {next}
      <input
        maxLength="6"
        size="6"
        onChange={handlePageChange}
        value={store.state.start_input}
      />
      <Button id="page_go" variant="contained" onClick={jump}>
        跳转
      </Button>
      <div style={{ minHeight: '200px' }} />
    </div>
  );
}
export default withStyles(styles)(App);
