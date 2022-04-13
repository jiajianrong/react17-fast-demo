import React, { useState } from 'react';
import { useEffect, useCallback, useRef } from 'react';

// https://blog.testdouble.com/posts/2019-11-04-react-mvc/
export default function EditCustomer({ id=1 }) {
  return (
    <EditCustomerController id={id}>
      <CustomerForm/>
    </EditCustomerController>
  );
}



function sleep(ms) {
  return new Promise(res => {
    setTimeout(() => {
      res(null);
    }, ms);
  })
}
function NotFound() {
  return (<div>Not Found</div>)
}
function ErrorDisplay({errors}) {
  return (<div>errors happened: {errors}</div>)
}
async function _fetchUpdate({body}) {
  await sleep(1000);
  return body;
  //return { id: 1, name: 'newName', email: 'newEmail'};
}
async function _fetchLoad() {
  await sleep(2000);
  return [
    {id: 1, name: 'name', email: 'email'},
    {id: 2, name: 'name2', email: 'email2'}
  ];
}




// 自定义hook
// 用来获取数据
function useCustomers() {
  const [state, setState] = useState([]);

  useEffect(() => {
    _fetchLoad().then(setState);
  }, []);

  function dispatch(action) {
    if (action.type === 'UPDATE_LIST') {
      _fetchUpdate({
        body: action.payload
      }).then(result=>{
        setState([
          action.payload,
          {id: 2, name: 'name2', email: 'email2'}
        ]);
      })
    } else {
      return state;
    }
  }
  
  return [state, dispatch];
}





// 逻辑
function EditCustomerController({ id, children }) {
  let [customers, dispatch] = useCustomers();

  let customer = customers.find(c => c.id === id);
  if (!customer) {
    return <NotFound />;
  }

  let onSave = (newCustomerData) => {
    dispatch({
      type: "UPDATE_LIST",
      payload: newCustomerData,
    });
  };

  return React.cloneElement(children, {
    initId: customer.id,
    initName: customer.name,
    initEmail: customer.email,
    onSave
  });
}





// 纯UI组件，只负责渲染dom
function CustomerForm({onSave, initId, initName, initEmail}) {
  let [errors, setErrors] = React.useState();
  let [saving, setSaving] = React.useState(false);
  let [id, setId] = React.useState(initId);
  let [name, setName] = React.useState(initName);
  let [email, setEmail] = React.useState(initEmail);

  let onSaveWrapped = () => {
    setSaving(true)
    onSave({id, name, email})
      // .catch((error) => {
      //   setErrors(error)
      // })
      // .finally(() => {
      //   setSaving(false)
      // })
    setSaving(false)
  }

  return (
    <div>
      {errors && <ErrorDisplay errors={errors} />}
      <input
        type="text"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={onSaveWrapped} disabled={saving}>Save</button>
    </div>
  );
}


