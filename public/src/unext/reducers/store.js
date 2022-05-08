import React from "react"
import Client from '../Client';
import update from 'immutability-helper';
import { createContainer } from "unstated-next"
import * as ACTION_TYPE from "./actions"
_=require("lodash");
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
function UseCounter() {
  const [state, dispatch] = React.useReducer((state,action)=> {
      console.log(action)
      let new_state;
      switch (action.type) {
        case ACTION_TYPE.LOAD_USER_RES:
          new_state={...state,users:action.res};
          break;
        case ACTION_TYPE.LOAD_CONTACT_RES:
          new_state=update(state,{
            connect_error:{$set:false},
            contacts:{$set:action.res.data},
            total:{$set:action.res.total},
            user:{$set:action.res.user},
          });
          break;
        default:
          new_state=state;
      }
      console.log(new_state)
      return new_state;
  }, initialState);
  const onLoginSubmit = (data) => {
    Client.login(data.username, data.password, (result) => {
      if (result.success) {
        let res = {
          logined: true,
          user: data.username,
          contacts: [],
        };
        // dispatch(actions.LOG_IN_RES(res));
        dispatch({type:ACTION_TYPE.LOG_IN_RES,res:res});
        loadCONTACT({
          limit: initialState.limit,
          start: initialState.start,
        });
      }
    });
  };
  const load_user=()=>{
    Client.cache_users((res) => {
        // dispatch(actions.LOAD_USER_RES(res));
        dispatch({type:ACTION_TYPE.LOAD_USER_RES,res:res})
    });
  }
  let loadCONTACT=(data)=>{
    Client.contacts(
        data, (res) => {
          // if(data.baoxiang) res.baoxiang=data.baoxiang;
          // res.start=data.start;
          // dispatch(actions.LOAD_CONTACT_RES(res));
          dispatch({type:ACTION_TYPE.LOAD_CONTACT_RES,res:res});
        },
        (error) => {
          console.log(error);
          if (error instanceof SyntaxError) {
            // dispatch(actions.SHOW_LOGIN(true));
            dispatch({type:ACTION_TYPE.SHOW_LOGIN,visible:true});
          } else {
            // dispatch({ type: LOAD_CONTACT_FAIL, error });
          }
        }
    );
  }
  return {state,dispatch,loadCONTACT,onLoginSubmit,load_user}
}
let CounterContainer = createContainer(UseCounter)
export default CounterContainer
