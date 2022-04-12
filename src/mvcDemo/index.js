import React, { useState } from 'react';
import { useEffect, useCallback, useRef } from 'react';

// https://blog.testdouble.com/posts/2019-11-04-react-mvc/

function sleep(ms) {
  return new Promise(res => {
    setTimeout(() => {
      res(null);
    }, ms);
  })
}

export default function index() {
  return (
    <>
      <EditCustomer id={1} />
    </>
  );
}

function ErrorDisplay({errors}) {
  return <div>errors happened: {errors}</div>
}
function formatChangeForFrontend(model) {
  return model;
}
async function _fetchUpdate() {
  await sleep(1000);
  return {
    json: function() {
      return {
        id: 1,
        name: 'newName',
        email: 'newEmail',
      }
    }
  }
}

function useCustomers() {
  return {
    customers: [
      {
        id: 1,
        name: 'name',
        email: 'email',
      },{
        id: 2,
        name: 'name2',
        email: 'email2',
      }
    ],
    dispatch: function(model) {
      let {type, payload} = model;
      console.log(type, payload);
      if (type === 'UPDATE_CUSTOMER') {
        return [
          payload,{
            id: 2,
            name: 'name2',
            email: 'email2',
          }
        ];
      }
    }
  }
}


function EditCustomer({ id }) {
  let { customers, dispatch } = useCustomers();
  // access context and probably trigger side effects

  let customer = customers.find(c => c.id === id);


  let [errors, setErrors] = React.useState()
  let [saving, setSaving] = React.useState(false)
  let [name, setName] = React.useState(customer.name);
  let [email, setEmail] = React.useState(customer.email);

  if (!customer) {
    return (
      <div>not found</div>
    );
  }


  let saveCustomer = () => {
    setSaving(true)
    _fetchUpdate({
      url: `/api/customers/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })
      .then(response => response.json())
      .then(apiCustomer => {
        // Formatting for differences between backend and frontend
        //   e.g. Rails/Django snake_case into JavaScript camelCase
        dispatch({
          type: "UPDATE_CUSTOMER",
          payload: formatChangeForFrontend(apiCustomer)
        });
      })
      .catch(error => {
        setErrors(error)
      })
      .finally(() => {
        setSaving(false)
      })
  };

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
      <button onClick={saveCustomer} disabled={saving}>Save</button>
    </div>
  )
}