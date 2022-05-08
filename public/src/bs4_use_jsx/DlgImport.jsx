import React from 'react';
import { Alert, Table,Modal,Button} from 'react-bootstrap';
import Client from '../Client';
import update from 'immutability-helper';
import PackEdit from './PackEdit';
export default function DlgImport(props){
  const [state,setState] =React.useState({
    error: '',
    packs: [],
    info: '',
    showalert:false,
    show_edit:false,
  });
  const fileUpload=React.useRef(null);
  const upload = () => {
    const file = fileUpload.current.files[0];
    console.log(file);
    var data = new FormData();
    data.append('file', file);
    //console.log(data1)
    Client.postForm('/rest/standard/', data, (res)=>{
      if (res.result.length > 0) {
        const newFoods = update(state.packs, { $unshift: res.result });
        setState((state)=>({...state,packs: newFoods, 
          showalert: true,
          info: '导入了' + res.result.length + '个合同的标钢。',
        }));
      }
      else{
        setState((state)=>({...state, showalert: false}));
      }
    });
  };
  React.useEffect(()=>{
    var data = { limit: 10, search: 'xls' };
    Client.get('/rest/Pack/', data, (result)=> {
      console.info(result);
      setState((state)=>({...state, packs: result.data }));
      console.log(result.data);
    });
  },[])
 const handleEdit = pack_id => {
    //setState({currentIndex:idx,showModal:true});
    // refs.edit1.open(pack_id);
    setState((state)=>({...state,show_edit:true,pack_id:pack_id}))
  };
  const handleDismiss = () => {
    console.log("onClose");
    setState((state)=>({...state, showalert: false }));
  };
  const inputChange = () => {
    setState((state)=>({...state, showalert: false }));
  };
    const packs_xls = state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td>{pack.id}
        </td>
        <td><Button
              variant="light"
              onClick={() => handleEdit(pack.id)}
            >
              {pack.name}
            </Button>
        </td>
      </tr>
    ));
    let alert;
    if (state.showalert) {
      alert = (
        <Alert variant="info" onClose={handleDismiss} dismissible>
          <p>{state.info}</p>
        </Alert>
      );
    }
    return (
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>导入标样</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            alert
          }
          <form encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              type="file"
              name="file"
              ref={fileUpload}
              onChange={inputChange}
            />
            <button
              style={{ margin: '10px 10px 10px 10px' }}
              className="btn btn-primary"
              onClick={upload}
              type="button"
            >
              上传
            </button>
          </form>
          <div style={{ minHeight: '200px' }}>
            <Table className="table-bordered">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>名称</td>
                </tr>
              </thead>
              <tbody>{packs_xls}</tbody>
            </Table>
          </div>
          <div>{state.error}</div>
        </Modal.Body>
        <PackEdit open={state.show_edit} onClose={
            ()=>{
              setState((state)=>({...state,show_edit:false}))
            }
          } pack_id={state.pack_id} title="编辑" />
      </Modal>
    );
  };
