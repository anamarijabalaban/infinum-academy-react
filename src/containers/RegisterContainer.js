import React, {Component} from 'react';
import {css} from 'emotion';
import {Redirect}  from 'react-router-dom';
import getImage from '../imagesImports';
import {register} from '../services/user'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


const container = css`
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px;
  grid-gap: 10px 10px;
`;

const iconBox = css`
  grid-row: 1 / 2;
  grid-column: 2 / 4;
`;

const iconImg = css`
  width: 20%;
`;

const blankBox = css`
  grid-row: 2 / 4;
  grid-column: 2 / 4;
`;

const usernameLabBox = css`
  grid-row: 4 / 5;
  grid-column: 2 / 4;
  font-size: 40px;
`;

const usernameBox = css`
  grid-row: 5 / 6;
  grid-column: 2 / 3;
  font-size: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #FF7590;
  color: #ff758c;
  width: 80%;
`;

const passwordLabBox = css`
  grid-row: 6 / 7;
  grid-column: 2 / 4;
  font-size: 40px;
`;

const passwordBox = css`
  grid-row: 7 / 8;
  grid-column: 2 / 3;
  font-size: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #FF7590;
  color: #ff758c;
  width: 120%;
`;

const loginBtnBox= css`
  grid-row: 9 / 10;
  grid-column: 2 / 3;
  width: 50%;
  height: 80%;
  color: white;
  background-color:  	#FF7590;
  border: none;
  border-radius: 8px;
`;

@observer
export class RegisterContainer extends Component {
  @observable
  componentState = {
    username: '',
    password: '',
    redirect: false
  }

  @action.bound
  _handleUsernameChange(event) {
    this.componentState.username = event.target.value;
  }

  @action.bound
  _handlePasswordChange(event) {
    this.componentState.password = event.target.value;
  }

  @action.bound
  _register() {
    register(
      this.componentState,
      JSON.stringify({
        email: this.componentState.username,
        password: this.componentState.password
      })
    )
    .then((data) => {
      this.setState({ redirect: true });
    });
  }

  render() {

     if (this.componentState.redirect) {
       return <Redirect to='/login'/>;
     }
    return (
      <div className={container}>
        <div className={iconBox}>
          <img className={iconImg} alt='App icon' src={getImage('logo')} />
        </div>
        <div className={blankBox}></div>
        <label className={usernameLabBox} htmlFor="username">Username:</label>
        <input className={usernameBox} type="text" id="username" value={this.componentState.username} onChange={this._handleUsernameChange}/>
        <label className={passwordLabBox} htmlFor="password">Password:</label>
        <input className={passwordBox} type="password" id="password" value={this.componentState.password} onChange={this._handlePasswordChange}/>

        <button className={loginBtnBox} onClick={this._register}>REGISTER</button>

      </div>
    );
  }
}
