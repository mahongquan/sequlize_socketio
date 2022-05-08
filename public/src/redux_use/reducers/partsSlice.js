import { createSlice } from '@reduxjs/toolkit';
import Client from '../Client';
import moment from "moment";
var initialState = {
  usepack:{},
  index_usepack:null,
  hiddenPacks: false,
  contact: {},
  show_usepack_edit: false,
  pack_id: null,
  packitem: {},
  bg: {},
  old: {},
  index_packitem: null,
  users: [],
  logined: false,
  connect_error: false,
  search2: '',
  search2tip: '',
  target: null,
  showcontext: false,
  contacts: [],
  usepacks: [],
  packitems: [],
  packs: [],
  limit: 10,
  user: 'AnonymousUser',
  search: '',
  start: 0,
  total: 0,
  start_input: 1,
  currentIndex: null,
  baoxiang: '',
  showDlgImport: false,
  showDlgEdit: false,
  showDlgDetail: false,
  showDlgCONTACTs: false,
  showDlgStatYear: false,
  showDlgStatMonth: false,
  showDlgItem: false,
  showDlgWorkMonth: false,
  showDlgCopyPack: false,
  showDlgForder: false,
  showdlgWait: false,
  showDlgPack: false,
  showDlgCheck: false,
  show_login: false,
  show_packitem_edit: false,
  //edit
  allfile_err: null,
  detail: null,
};
export const partsSlice = createSlice({
  name: 'parts',
  initialState: initialState,
  reducers: {
    DETAIL_RES:(state, action) => {
      state.detail=action.payload
    },
    UPDATEMETHOD_RES:(state, action) => {
      state.contacts[action.payload.idx]=action.payload.data
      state.showdlgWait=false;
    },
    SAVE_CONTACT_RES:(state, action) => {
      if (action.payload.currentIndex != null) {
        state.contacts[action.payload.currentIndex]=action.payload.contact
      } else {
        state.contacts.unshift(action.payload.contact)
        state.contact.currentIndex=0;
      }
      state.bg={};
      state.old=action.payload.contact;
      state.hiddenPacks=false;
    },
    SHOW_DLG_DETAIL:(state, action) => {
      state.showDlgDetail=action.payload;
    },
    SHOW_DLG_CHECK:(state, action) => {
      state.showDlgCheck=action.payload.visible;
      if(action.payload.idx!=undefined && action.payload.idx !=null){
        state.currentIndex=action.payload.idx;
        state.contact=state.contacts[state.currentIndex];
      }
    },
    SHOW_DLG_WAIT:(state, action) => {
      state.showdlgWait=action.payload.visible;
      state.allfile_err=action.payload.allfile_err;
    },
    PackItemEdit_SAVE: (state, action) => {
    },
    DELETE_PACKITEM: (state, action) => {
      state.packitems = state.packitems.filter(
        (item, idx) => action.payload.idx !== idx
      );
    },
    DELETE_USEPACK: (state, action) => {
      console.log(action);
      state.usepacks = state.usepacks.filter(
        (item, idx) => action.payload.idx !== idx
      );
    },
    ADD_PACKITEM_RES: (state, action) => {
      var res = action.payload;
      console.log(res);
      state.packitems = state.packitems.concat(res.data);
    },
    ADD_USEPACK_RES: (state, action) => {
      var res = action.payload;
      console.log(res);
      state.usepacks = state.usepacks.concat(res.data);
    },   
    ALLFILE_ERR:(state, action) => {
      state.allfile_err = action.payload;
    },   
    SEARCH_CHANGE: (state, action) => {
      state.search = action.payload;
    },
    PAGE_CHANGE: (state, action) => {
      state.start_input = action.payload;
    },
    PackItemEdit_SAVE_RES: (state, action) => {
      var res = action.payload;
      state.packitem = res.data;
      state.bg = {};
      state.old = res.data;
    },
    PackItemEdit_QUE_CHANGE: (state, action) => {
      var quehuo = state.packitem.quehuo;
      quehuo = !quehuo;
      if (state.old.quehuo === quehuo) {
        state.bg[action.payload.name] = '#ffffff';
      } else {
        state.bg[action.payload.name] = '#8888ff';
      }
      state.packitem.quehuo = quehuo;
    },
    PackItemEdit_CHANGE: (state, action) => {
      if (state.old[action.payload.name] === action.payload.value) {
        state.bg[action.payload.name] = '#ffffff';
      } else {
        state.bg[action.payload.name] = '#8888ff';
      }
      state.packitem[action.payload.name] = action.payload.value;
    },
    CONTACT_EDIT_CHANGE: (state, action) => {
      if (state.old[action.payload.name] === action.payload.value) {
        state.bg[action.payload.name] = '#ffffff';
      } else {
        state.bg[action.payload.name] = '#8888ff';
      }
      state.contact[action.payload.name] = action.payload.value;
    },
    INCREMENTBYAMOUNT: (state, action) => {
      state.value += action.payload;
    },
    SHOW_LOGIN: (state, action) => {
      // console.log(action);
      state.show_login = action.payload;
    },
    SHOW_DLG_EDIT_PACKITEM: (state, action) => {
      state.show_packitem_edit = action.payload.visible;
      console.log(action);
      if (action.payload.visible && action.payload.idx !=undefined && action.payload.idx != null) {
        console.log('set packitem');
        state.index_packitem = action.payload.idx;
        state.packitem = state.packitems[action.payload.idx];
        state.bg = {};
        state.old = state.packitem;
      } else {
        state.index_packitem = null;
        state.packitem = {};
        state.bg = {};
        state.old = state.packitem;
      }
    },
    SEARCH_PACK_RES: (state, action) => {
      console.log("SEARCH_PACK_RES");
      console.log(action);
      state.packs = action.payload.data;
    },
    SHOW_DLG_EDIT_USEPACK: (state, action) => {
      console.log(action);
      state.show_usepack_edit= action.payload.visible;
      console.log(action);
      if (action.payload.visible && action.payload.idx !=undefined && action.payload.idx != null) {
        state.index_usepack = action.payload.idx;
        state.usepack = state.usepacks[action.payload.idx];
      } else {
        state.index_usepack = null;
        state.usepack = {};
      }
    },
    SHOW_DLG_IMPORT: (state, action) => {
      state.showDlgImport = action.payload;
    },
    SHOW_DLG_EDIT: (state, action) => {
      state.showDlgEdit = action.payload.visible;
      console.log(action);
      if(action.payload.contact_id){
        state.hiddenPacks=false;
      }
      else{
        state.hiddenPacks=true;
      }
      if (action.payload.visible && action.payload.idx !=undefined && action.payload.idx != null) {
        state.currentIndex = action.payload.idx;
        state.contact = state.contacts[action.payload.idx];
        state.bg = {};
        state.old = state.contact;
      } else {
        state.index_packitem = null;
        state.contact = {yujifahuo_date: moment().format('YYYY-MM-DD'),
        tiaoshi_date: moment().format('YYYY-MM-DD')};
        state.bg = {};
        state.old = state.contact;
      }
    },
    SHOW_DLGSTAT_MONTH: (state, action) => {
      state.showDlgStatMonth = action.payload;
    },
    SHOW_DLG_WORKMONTH: (state, action) => {
      state.showDlgWorkMonth = action.payload;
    },
    SHOW_DLGSTAT_YEAR: (state, action) => {
      state.showDlgStatYear = action.payload;
    },
    LOAD_USER_RES: (state, action) => {
      console.log(action);
      state.users = action.payload;
    },
    LOAD_PACKITEM_RES: (state, action) => {
      state.pack_id = action.payload.pack_id;
      state.packitems = action.payload.res.data;
    },
    LOAD_CONTACT_RES: (state, action) => {
      console.log(action);
      state.connect_error = false;
      state.contacts = action.payload.data;
      state.total = action.payload.total;
      state.user = action.payload.user;
      state.start = action.payload.start;
      if(action.payload.baoxiang) state.baoxiang = action.payload.baoxiang;
    },
    LOAD_USEPACK_RES: (state, action) => {
      state.usepacks = action.payload.data;
    },
    LOG_OUT_RES: (state, action) => {
      console.log(action);
      state = initialState;
    },
    LOG_IN_RES: (state, action) => {
      state.user = action.payload.user;
      state.logined = action.payload.user; //todo
    },
  },
});
function load_contact(dispatch, data) {
  Client.contacts(
    data, (res) => {
      res.baoxiang=data.baoxiang;
      res.start=data.start;
      dispatch(actions.LOAD_CONTACT_RES(res));
    },
    (error) => {
      // console.log(typeof(error));
      console.log(error);
      if (error instanceof SyntaxError) {
        dispatch(actions.SHOW_LOGIN(true));
      } else {
        // dispatch({ type: LOAD_CONTACT_FAIL, error });
      }
    }
  );
}
export const actions = partsSlice.actions;
// export const {LOG_IN_RES, LOG_OUT_RES,LOAD_CONTACT_RES,login, increment, decrement, incrementByAmount } = partsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(actions.INCREMENTBYAMOUNT(amount));
  }, 1000);
};
export const logout = (data) => (dispatch) => {
  Client.logout(() => {
    dispatch(actions.LOG_OUT_RES());
  });
};

export const deletePackItem = (idx, item_id) => (dispatch) => {
  var url = '/rest/PackItem/';
  Client.delete1(url, { id: item_id }, (res) => {
    dispatch(actions.DELETE_PACKITEM({ res: res, idx: idx }));
  });
};
export const deleteUsePack = (idx, item_id) => (dispatch) => {
  var url = '/rest/UsePack';
  Client.delete1(url, { id: item_id }, (res) => {
    dispatch(actions.DELETE_USEPACK({ res: res, idx: idx }));
  });
};
export const editPackItem = (idx) => (dispatch) => {
  // if(contact_id) dispatch(loadUsePack(contact_id));
  dispatch(
    actions.SHOW_DLG_EDIT_PACKITEM({
      visible: true,
      idx: idx,
    })
  );
};
export const edit = (idx,contact_id) => (dispatch) => {
  if(contact_id) dispatch(loadUsePack(contact_id));
  dispatch(
    actions.SHOW_DLG_EDIT({
      visible: true,
      idx: idx,
      contact_id:contact_id,
    })
  );
};
export const editUsePack = (idx,pack_id) => (dispatch) => {
  dispatch(loadPackItems(pack_id));
  dispatch(
    actions.SHOW_DLG_EDIT_USEPACK({
      visible: true,
      idx: idx,
      pack_id:pack_id,
    })
  );
};
export const addUsePack = (data) => (dispatch) => {
  console.log(data);
  var url = '/rest/UsePack';
  Client.postOrPut(url, data, (res) => {
    dispatch(actions.ADD_USEPACK_RES(res));
  });
};
export const addPackItem = (data) => (dispatch) => {
  var url = '/rest/PackItem/';
  Client.post(url, data, (res) => {
    dispatch(actions.ADD_PACKITEM_RES(res));
  });
};
export const loadUsePack = (contact_id) => (dispatch) => {
  Client.UsePacks(contact_id, (res) => {
    dispatch(actions.LOAD_USEPACK_RES(res));
  });
};
export const loadPackItems = (pack_id) => (dispatch) => {
  Client.PackItems(pack_id, (res) => {
    console.log(res);
    dispatch(actions.LOAD_PACKITEM_RES({ res: res, pack_id: pack_id }));
  });
  // function PackItems(query, cb) {
  //   var data = { pack: query };
  //   return get('/rest/PackItem/', data, cb);
  // }
};
export const importXls = (data, callback) => (dispatch) => {
  dispatch(actions.SHOW_DLG_IMPORT(true));
  Client.get(
    '/rest/Pack/',
    data,
    (res) => {
      console.log(res);
      dispatch(actions.SEARCH_PACK_RES(res));
    },
    (err) => {
      console.log(err);
    }
  );
};
export const onLoginSubmit = (data) => (dispatch) => {
  Client.login(data.username, data.password, (result) => {
    if (result.success) {
      let res = {
        logined: true,
        user: data.username,
        contacts: [],
      };
      dispatch(actions.LOG_IN_RES(res));
      load_contact(dispatch, {
        limit: initialState.limit,
        start: initialState.start,
      });
    }
  });
};
export const load_user=()=>dispatch=>{
  Client.cache_users((res) => {
      dispatch(actions.LOAD_USER_RES(res));
  });
}
export const loadCONTACT = (data) => (dispatch) => {
  load_contact(dispatch, data);
};
export const savePackItemEdit = (data) => (dispatch) => {
  var url = '/rest/BothPackItem';
  Client.postOrPut(url, data, (res) => {
    dispatch(actions.PackItemEdit_SAVE_RES(res));
  });
};

export const allfile = (contact_id) =>(dispatch)=> {
    dispatch(actions.SHOW_DLG_WAIT({visible:true,allfile_err:""}));
    Client.get('/rest/allfile', { id: contact_id}, (result)=>{
      console.info(result);
      if (!result.success) {
        dispatch(actions.ALLFILE_ERR(result.message));
      } else {
        dispatch(actions.SHOW_DLG_WAIT({visible:false}));
      }
    },(err)=>{
      console.log(err);
      // dispatch(actions.SHOW_DLG_WAIT(false));
      // alert(err);
      dispatch(actions.ALLFILE_ERR(""+err));
    });
};
export const updateMethod = (contact_id, idx) => (dispatch) => {
  console.log("updateMethod")
    dispatch(actions.SHOW_DLG_WAIT({visible: true,allfile_err:""}));// { type: SHOW_DLG_WAIT, visible:true});
    Client.get('/rest/updateMethod', { id: contact_id }, (result)=>{
      console.info(result);
      if (!result.success) {
        dispatch(actions.ALLFILE_ERR(result.message));
      } else {
        result.idx=idx;
        dispatch(actions.UPDATEMETHOD_RES(result));
      }
    },(error)=>{
      dispatch(actions.ALLFILE_ERR(error));
    });
};
export const forlder = (contact_id) =>(dispatch)=>{
    dispatch(actions.SHOW_DLG_WAIT({visible:true,allfile_err:""}));
    Client.get('/rest/folder/', { id: contact_id }, (result)=>{
      console.info(result);
      if (!result.success) {
         dispatch(actions.ALLFILE_ERR(result.message));
      } else {
        dispatch(actions.SHOW_DLG_WAIT({visible: false}));
      }
    },(error)=>{
      dispatch(actions.ALLFILE_ERR(error));
    });
};
export const saveContact = (dataSave, index, callback) =>(dispatch)=> {
    var url = '/rest/Contact';
    Client.postOrPut(url, dataSave, res => {
      if (res.success) {
        let result = { contact: res.data, currentIndex: index };
        dispatch(actions.SAVE_CONTACT_RES(result));
      } else {
        alert(res.message);
      }
    });
};
export const details = (contactid) =>(dispatch)=> {
    dispatch(actions.SHOW_DLG_DETAIL(true));
    var data1 = { id: contactid };
    Client.get('/rest/showcontact', data1, res => {
      if (!res.items2) res.items2 = [];
      dispatch(actions.DETAIL_RES(res));
    });
};
export default partsSlice.reducer;
