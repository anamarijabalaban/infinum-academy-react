import { postJSON } from './api';

export async function register(state, data) {
  await postJSON('users', data);
}


export async function login(state, data, props) {
  try{
    const response = await postJSON('users/sessions', data).catch((err) => { console.log(err); });;
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', state.username.split('@')[0]);
    localStorage.setItem('remember', state.remember);
    props.history.push('/shows');
  } catch(err){
    alert(err);
  }
}
