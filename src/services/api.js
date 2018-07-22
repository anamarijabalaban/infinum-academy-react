export function get(model) {
  return fetch(`https://api.infinum.academy/api/${model}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

export function post(model, data) {
  console.log(localStorage.getItem('token'));
  return fetch(`https://api.infinum.academy/api/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: data
    })
    .then((response) => response.json())
}
