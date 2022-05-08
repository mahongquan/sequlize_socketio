import React from 'react';
export default function LoginFormComponent(props){
  const [state,setState]=React.useState({
    name: '马红权',
    pwd: '333333',
  });
  
  const handleNameChange = e => {
    setState({
      name: e.target.value,
      pwd:state.pwd,
    });
  };
  const handlePwdChange = e => {
    setState({
      pwd: e.target.value,
      name:state.name,
    });
  };
  const handleSubmit = e => {
    var data = {};
    data['username'] = state.name;
    data['password'] = state.pwd;
    props.onLoginSubmit(data);
    props.onClose();
  };
  const handleCancel = e => {
    props.onClose();
  };
    return (
      <table className="table-condensed">
        <tbody>
          <tr>
            <td>
              <label>用户名:</label>
            </td>
            <td>
              <input
                type="text"
                id="username"
                value={state.name}
                onChange={handleNameChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>密码:</label>
            </td>
            <td>
              <input
                type="text"
                id="password"
                value={state.pwd}
                onChange={handlePwdChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleSubmit}>确定</button>
            </td>
            <td>
              <button onClick={handleCancel}>取消</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
};
