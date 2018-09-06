export function get(model) {
  return fetch(`https://api.infinum.academy/api/${model}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

export function post(model, data ={}) {
  console.log(localStorage.getItem('token'));
  return fetch(`https://api.infinum.academy/api/${model}`    , {
      method: 'POST',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: data
    })
    .then((response) => response.json());
}

export function postJSON(model, data ={}) {
  console.log(localStorage.getItem('token'));
  return fetch(`https://api.infinum.academy/api/${model}`    , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: data
    })
    .then((response) => response.json());
}

export function getAuth(imageName) {
  return fetch(`https://api.infinum.academy/api${imageName}`,{
      method: 'GET',
      headers: {
          'Authorization': `${localStorage.getItem('token')}`
      }
    });
}

export function del(model, id) {
  return fetch(`https://api.infinum.academy/api/${model}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
}
