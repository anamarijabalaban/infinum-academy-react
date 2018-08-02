import { post } from './api';
import { runInAction } from 'mobx';

export async function register(state, data) {
  await post('users', data);
  runInAction(() => {
    state.redirect = true;
  });
}


export async function login(state, data, props) {
  try{
    const response = await post('users/sessions', data).catch((err) => { console.log(err); });;
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', state.username.split('@')[0]);
    localStorage.setItem('remember', state.remember);
    props.history.push('/shows');
  } catch(err){
    alert(err);
  }
  console.log(localStorage);
  runInAction(() => {
    state.redirect= true;
  });
}
