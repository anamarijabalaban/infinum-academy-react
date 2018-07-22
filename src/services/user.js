import { post } from './api';

export function register(state, data) {
  post('users', data)
  .then((response) => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', state.username.split('@')[0]);
    localStorage.setItem('remember', state.remember);
    state.redirect = true;
  })
  .catch((error) => console.log(error));
}

export function login(state, data) {
  post('users/sessions', data)
  .then((data) => {
    state.redirect= true;
  });
}
